import debug from 'debug';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import urlJoin from 'url-join';

import { LOCALE_COOKIE } from '@/const/locale';
import { appEnv } from '@/envs/app';
import { Locales } from '@/locales/resources';

import { parseBrowserLanguage } from './utils/locale';
import { RouteVariants } from './utils/server/routeVariants';


// Create debug logger instances
const logDefault = debug('middleware:default');

export const config = {
  matcher: [
    // include any files in the api or trpc folders that might have an extension
    '/(api|trpc|webapi)(.*)',
    // include the /
    '/',
  ],
};

const backendApiEndpoints = ['/api', '/trpc', '/webapi'];

const defaultMiddleware = (request: NextRequest) => {

  const url = new URL(request.url);
  logDefault('Processing request: %s %s', request.method, request.url);

  // skip all api requests
  if (backendApiEndpoints.some((path) => url.pathname.startsWith(path))) {
    logDefault('Skipping API request: %s', url.pathname);
    return NextResponse.next();
  }

  const theme = 'light';

  // locale has three levels
  // 1. search params
  // 2. cookie
  // 3. browser

  // highest priority is explicitly in search params, like ?hl=zh-CN
  const explicitlyLocale = (url.searchParams.get('hl') || undefined) as Locales | undefined;

  // if it's a new user, there's no cookie, So we need to use the fallback language parsed by accept-language
  const browserLanguage = parseBrowserLanguage(request.headers);

  const locale =
    explicitlyLocale ||
    ((request.cookies.get(LOCALE_COOKIE)?.value || browserLanguage) as Locales);

  const ua = request.headers.get('user-agent');

  const device = new UAParser(ua || '').getDevice();

  logDefault('User preferences: %O', {
    browserLanguage,
    deviceType: device.type,
    hasCookies: {
      locale: !!request.cookies.get(LOCALE_COOKIE)?.value,
    },
    locale,
  });

  // 2. Create normalized preference values
  const route = RouteVariants.serializeVariants({
    isMobile: device.type === 'mobile',
    locale,
    theme,
  });

  logDefault('Serialized route variant: %s', route);

  // if app is in docker, rewrite to self container
  // https://github.com/lobehub/lobe-chat/issues/5876
  if (appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL) {
    logDefault('Local container rewrite enabled: %O', {
      host: '127.0.0.1',
      original: url.toString(),
      port: process.env.PORT || '3000',
      protocol: 'http',
    });

    url.protocol = 'http';
    url.host = '127.0.0.1';
    url.port = process.env.PORT || '3000';
  }

  // new handle segment rewrite: /${route}${originalPathname}
  // / -> /zh-CN__0__dark
  // /discover -> /zh-CN__0__dark/discover
  // All SPA routes that use react-router-dom should be rewritten to just /${route}
  const spaRoutes = [
  ];
  const isSpaRoute = spaRoutes.some((route) => url.pathname.startsWith(route));

  let nextPathname: string;
  if (isSpaRoute) {
    nextPathname = `/${route}`;
  } else {
    nextPathname = `/${route}` + (url.pathname === '/' ? '' : url.pathname);
  }
  const nextURL = appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL
    ? urlJoin(url.origin, nextPathname)
    : nextPathname;

  logDefault('URL rewrite: %O', {
    isLocalRewrite: appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL,
    nextPathname: nextPathname,
    nextURL: nextURL,
    originalPathname: url.pathname,
    url: url.href,
  });

  url.pathname = nextPathname;

  logDefault('nextURL after rewrite: %s', url.toString());
  // build rewrite response first
  const rewrite = NextResponse.rewrite(url, { status: 200 });

  // If locale explicitly provided via query (?hl=), persist it in cookie when user has no prior preference
  if (explicitlyLocale) {
    rewrite.cookies.set(LOCALE_COOKIE, explicitlyLocale, {
        // 90 days is a balanced persistence for locale preference
        maxAge: 60 * 60 * 24 * 90,

        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    logDefault('Persisted explicit locale to cookie (no prior cookie): %s', explicitlyLocale);
  }

  return rewrite;
};

export default defaultMiddleware;