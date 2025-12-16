"use server"

import type { StrapiClient } from '@strapi/client';
import { strapi } from '@strapi/client';
import { useMemo } from 'react';

function createClient(): StrapiClient {
  const {STRAPI_BASE_URL, STRAPI_AUTH_TOKEN} = process.env;

  if (!STRAPI_BASE_URL) {
    throw new Error('STRAPI_BASE_URL not found. Please set STRAPI_BASE_URL in .env');
  }

  if (!STRAPI_AUTH_TOKEN) {
    throw new Error('STRAPI_AUTH_TOKEN not found. Please set STRAPI_AUTH_TOKEN in .env');
  }

  return strapi({ baseURL: STRAPI_BASE_URL, auth: STRAPI_AUTH_TOKEN });
}

export function useStrapi() {
  return useMemo(() => createClient(), []);
}

