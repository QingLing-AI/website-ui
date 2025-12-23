import type { ServiceItem, TestimonialItem } from '@/types/site';

export const SERVICES: ServiceItem[] = [
  {
    icon: 'fa-tachometer-alt',
    title: 'services.s1.title',
    description: 'services.s1.desc',
    features: ['services.s1.f1', 'services.s1.f2', 'services.s1.f3'],
  },
  {
    icon: 'fa-robot',
    title: 'services.s2.title',
    description: 'services.s2.desc',
    features: ['services.s2.f1', 'services.s2.f2', 'services.s2.f3'],
  },
  {
    icon: 'fa-server',
    title: 'services.s3.title',
    description: 'services.s3.desc',
    features: ['services.s3.f1', 'services.s3.f2', 'services.s3.f3'],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    content: 'testimonials.t1.content',
    author: 'testimonials.t1.author',
    role: 'testimonials.t1.role',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
  },
  {
    content: 'testimonials.t2.content',
    author: 'testimonials.t2.author',
    role: 'testimonials.t2.role',
    avatar:
      'https://images.unsplash.com/photo-1590949128997-86d5ef3650ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
  },
  {
    content: 'testimonials.t3.content',
    author: 'testimonials.t3.author',
    role: 'testimonials.t3.role',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
  },
];
