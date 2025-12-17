import 'server-only';
import { StrapiClient } from '@/libs/strapi';

import { getLocaleFromCookie } from '@/utils/locale';

export async function getContactData() {
  const locale = await getLocaleFromCookie();

  const client = new StrapiClient();
  return await client.findSingle('contact', locale)
}