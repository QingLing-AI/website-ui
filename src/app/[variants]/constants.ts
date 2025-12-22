import type { ServiceItem, TeamMember, TestimonialItem } from '@/types/site';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'team.m1.name',
    role: 'team.m1.role',
    description: 'team.m1.desc',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    socials: { linkedin: true, twitter: true, email: true },
  },
  {
    name: 'team.m2.name',
    role: 'team.m2.role',
    description: 'team.m2.desc',
    image:
      'https://images.unsplash.com/photo-1548689775-de410782ac3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    socials: { linkedin: true, github: true, email: true },
  },
  {
    name: 'team.m3.name',
    role: 'team.m3.role',
    description: 'team.m3.desc',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    socials: { linkedin: true, researchgate: true, email: true },
  },
];

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
