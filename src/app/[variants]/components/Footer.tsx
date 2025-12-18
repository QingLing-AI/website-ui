import React from 'react';
import * as strapi from "@/services/strapi"
import FooterView from "./Footer.view"

const Footer: React.FC = async () => {
  const { dark } = await strapi.getLogo()
  return <FooterView logo_dark={dark} />
}
 
export default Footer;