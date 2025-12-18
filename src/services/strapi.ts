import { StrapiClient } from '@/libs/strapi';

import { getLocaleFromCookie } from '@/utils/locale';

export async function getContactData() {
  const locale = await getLocaleFromCookie();

  const client = new StrapiClient();
  const {data} = await client.findSingle('contact', {locale})
  return data
}
export async function getLogo() {
  const client = new StrapiClient();
  const { data } = await client.findSingle('logo', {populate:{light:true, dark:true}})

  return {light: client.baseURL + data.light.url, dark: client.baseURL + data.dark.url}
}