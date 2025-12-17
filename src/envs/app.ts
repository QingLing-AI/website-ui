/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isInVercel = process.env.VERCEL === '1';

const vercelUrl = `https://${process.env.VERCEL_URL}`;

const APP_URL = process.env.APP_URL
  ? process.env.APP_URL
  : isInVercel
    ? vercelUrl
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3010'
      : 'http://localhost:3210';

// INTERNAL_APP_URL is used for server-to-server calls to bypass CDN/proxy
// Falls back to APP_URL if not set
const INTERNAL_APP_URL = process.env.INTERNAL_APP_URL || APP_URL;

export const getAppConfig = () => {

  return createEnv({
    client: {
      NEXT_PUBLIC_ENABLE_SENTRY: z.boolean(),
    },
    server: {
      APP_URL: z.string(),
      INTERNAL_APP_URL: z.string().optional(),
      MIDDLEWARE_REWRITE_THROUGH_LOCAL: z.boolean().optional(),

      SSRF_ALLOW_PRIVATE_IP_ADDRESS: z.boolean().optional(),
      SSRF_ALLOW_IP_ADDRESS_LIST: z.string().optional(),
    },
    runtimeEnv: {
      // Sentry
      NEXT_PUBLIC_ENABLE_SENTRY: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

      APP_URL,
      INTERNAL_APP_URL,
      MIDDLEWARE_REWRITE_THROUGH_LOCAL: process.env.MIDDLEWARE_REWRITE_THROUGH_LOCAL === '1',

      SSRF_ALLOW_PRIVATE_IP_ADDRESS: process.env.SSRF_ALLOW_PRIVATE_IP_ADDRESS === '1',
      SSRF_ALLOW_IP_ADDRESS_LIST: process.env.SSRF_ALLOW_IP_ADDRESS_LIST,
    },
  });
};

export const appEnv = getAppConfig();
