import { getContactData } from '@/services/api.service';

import { default as ContactView } from './Contact.view'
export default async function Contact() {

  let data: unknown = {};
  try {
    data = (await getContactData()).data;
  } catch (error) {
    console.error("Error fetching contact data:", error)
  }
  return <ContactView contactData={data} />;
}