export interface NavItem {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  socials: {
    linkedin?: boolean;
    twitter?: boolean;
    github?: boolean;
    email?: boolean;
    researchgate?: boolean;
  };
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}