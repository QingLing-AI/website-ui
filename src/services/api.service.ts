import 'server-only';
import { useStrapi } from '@/libs/strapi';

export async function getContactData() {
  const client = useStrapi();
  return await client.single('contact').find()
}