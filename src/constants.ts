import { NavItem, TeamMember, ServiceItem, TestimonialItem, ContactInfo } from './types';

// Translation Resources
export const RESOURCES = {
  zh: {
    translation: {
      nav: {
        home: "首页",
        about: "关于我们",
        services: "核心业务",
        team: "团队介绍",
        contact: "联系我们",
        consult: "免费咨询"
      },
      hero: {
        title1: "企业级大模型推理",
        title2: "性能优化专家",
        subtitle: "轻羚科技致力于帮助企业搭建高性能AI基础设施，提供从AI智能体开发到大模型推理优化的全方位解决方案。",
        btnService: "了解我们的服务",
        btnContact: "联系我们"
      },
      about: {
        title: "关于轻羚科技",
        description: "轻羚科技（深圳）有限公司由香港岭南大学数字经济与治理专业博士生团队创立，是一家专注于企业级大模型推理性能优化和AI智能体开发的公司。",
        subtitle: "我们的优势",
        subDesc: "我们的核心技术团队均曾服务于国际一流云计算和人工智能企业，拥有丰富的产业经验和技术积累。",
        features: {
          team: { title: "专业技术团队", desc: "由博士团队领衔，集合了多位AI领域专家，拥有深厚的技术积累。" },
          perf: { title: "性能优化专长", desc: "在大模型推理性能优化方面拥有独特技术，能显著提升企业AI系统效率。" },
          coop: { title: "行业深度合作", desc: "与多家领先企业建立战略合作，提供定制化AI解决方案。" }
        }
      },
      services: {
        title: "核心业务",
        subtitle: "我们提供全方位的企业级AI解决方案，帮助企业快速构建高效AI系统。",
        s1: { title: "大模型推理性能优化", desc: "我们针对大语言模型和多模态大模型进行推理性能优化，帮助企业在有限算力条件下实现最大效益。", f1: "降低模型推理延迟", f2: "提升吞吐量", f3: "降低运行成本" },
        s2: { title: "AI智能体开发", desc: "定制开发企业级AI智能体，根据企业特定场景和需求提供个性化解决方案。", f1: "智能客服解决方案", f2: "内容生成智能体", f3: "数据分析智能体" },
        s3: { title: "AI基础设施咨询", desc: "为企业提供AI基础设施建设咨询服务，包括硬件选型、环境搭建和优化方案。", f1: "算力资源规划", f2: "系统架构设计", f3: "部署与运维支持" }
      },
      team: {
        title: "核心团队",
        subtitle: "我们的团队由来自顶尖高校和企业的专业人才组成，拥有丰富的行业经验。",
        m1: { name: "袁博士", role: "首席执行官 / 创始人", desc: "香港岭南大学数字经济博士，曾就职于国际知名云计算企业，拥有多年AI研发经验。" },
        m2: { name: "王博士", role: "首席技术官", desc: "前国际AI企业技术负责人，专注于大模型性能优化领域，拥有多项技术专利。" },
        m3: { name: "张博士", role: "研发总监", desc: "人工智能专业博士，曾参与多个国家级AI项目研发，在智能体开发领域有丰富经验。" }
      },
      testimonials: {
        title: "客户反馈",
        subtitle: "听听我们的客户对我们服务的评价",
        t1: { content: "轻羚科技为我们提供的大模型优化方案帮助我们降低了60%的推理成本，同时提高了系统的响应速度。他们的专业知识和技术支持令人印象深刻。", author: "陈总监", role: "某科技公司AI部门" },
        t2: { content: "与轻羚科技合作开发的智能客服智能体完美契合我们的业务需求，智能体的响应速度和准确性远超我们预期，大大提升了客户满意度。", author: "林经理", role: "某电商平台" },
        t3: { content: "轻羚科技团队在AI基础设施搭建方面给了我们宝贵的建议，帮助我们避免了许多常见错误，节省了大量时间和成本。他们的专业水平非常值得信赖。", author: "赵工程师", role: "某金融科技公司" }
      },
      cta: {
        title: "准备好提升您的AI能力了吗？",
        subtitle: "无论您是想优化现有AI系统，还是从零开始构建AI能力，我们都能提供专业的技术支持和解决方案。",
        btn: "立即联系我们"
      },
      contact: {
        title: "联系我们",
        subtitle: "无论您有任何问题或需求，都可以通过以下方式与我们取得联系",
        form: { name: "您的姓名", email: "电子邮箱", phone: "联系电话", msg: "留言内容", btn: "提交信息" },
        info: { title: "联系方式", addrTitle: "公司地址", addr: "深圳市南山区科技园区高新南一道TCL大厦", phoneTitle: "联系电话", emailTitle: "电子邮箱", hoursTitle: "工作时间", hours: "周一至周五: 9:00 - 18:00", follow: "关注我们" }
      },
      footer: {
        desc: "轻羚科技致力于企业级大模型推理性能优化和AI智能体开发，提供全方位AI解决方案。",
        links: "快速链接",
        services: "服务内容",
        contact: "联系方式",
        copyright: "© 2025 轻羚科技（深圳）有限公司. 保留所有权利."
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        team: "Team",
        contact: "Contact",
        consult: "Free Consultation"
      },
      hero: {
        title1: "Enterprise LLM Inference",
        title2: "Optimization Experts",
        subtitle: "QINGLING AI is dedicated to helping enterprises build high-performance AI infrastructure, offering comprehensive solutions from AI agent development to large model inference optimization.",
        btnService: "Our Services",
        btnContact: "Contact Us"
      },
      about: {
        title: "About QINGLING AI",
        description: "Founded by a team of PhDs in Digital Economy and Governance from Lingnan University, Hong Kong, QINGLING AI focuses on enterprise-grade large model inference optimization and AI agent development.",
        subtitle: "Our Advantages",
        subDesc: "Our core technical team has served in world-class cloud computing and AI enterprises, possessing rich industrial experience and technical accumulation.",
        features: {
          team: { title: "Expert Technical Team", desc: "Led by a PhD team, gathering multiple AI experts with deep technical accumulation." },
          perf: { title: "Performance Optimization", desc: "Unique technology in large model inference optimization, significantly improving enterprise AI system efficiency." },
          coop: { title: "Deep Industry Cooperation", desc: "Established strategic partnerships with leading enterprises to provide customized AI solutions." }
        }
      },
      services: {
        title: "Core Business",
        subtitle: "We provide comprehensive enterprise-grade AI solutions to help companies quickly build efficient AI systems.",
        s1: { title: "Inference Optimization", desc: "We optimize inference performance for LLMs and multimodal models, helping enterprises maximize benefits with limited computing power.", f1: "Reduce Inference Latency", f2: "Increase Throughput", f3: "Reduce Operational Costs" },
        s2: { title: "AI Agent Development", desc: "Custom development of enterprise AI agents, providing personalized solutions based on specific scenarios.", f1: "Smart Customer Service", f2: "Content Generation Agents", f3: "Data Analysis Agents" },
        s3: { title: "Infrastructure Consulting", desc: "Providing AI infrastructure consulting services, including hardware selection, environment setup, and optimization plans.", f1: "Compute Resource Planning", f2: "System Architecture Design", f3: "Deployment & Support" }
      },
      team: {
        title: "Core Team",
        subtitle: "Our team consists of professionals from top universities and enterprises with rich industry experience.",
        m1: { name: "Dr. Yuan", role: "CEO / Founder", desc: "PhD in Digital Economy, Lingnan University. Former employee of international cloud computing giants with years of AI R&D experience." },
        m2: { name: "Dr. Wang", role: "CTO", desc: "Former technical lead at an international AI company, specializing in large model performance optimization with multiple patents." },
        m3: { name: "Dr. Zhang", role: "R&D Director", desc: "PhD in AI, participated in multiple national-level AI projects, extensive experience in agent development." }
      },
      testimonials: {
        title: "Client Feedback",
        subtitle: "Hear what our clients say about our services",
        t1: { content: "QINGLING AI's optimization solution helped us reduce inference costs by 60% while improving system response speed. Their professional knowledge is impressive.", author: "Director Chen", role: "AI Dept, Tech Company" },
        t2: { content: "The customer service agent developed with QINGLING AI perfectly fits our business needs. Speed and accuracy exceeded expectations.", author: "Manager Lin", role: "E-commerce Platform" },
        t3: { content: "The team gave us valuable advice on AI infrastructure, helping us avoid common mistakes and saving time and money. Highly trustworthy.", author: "Engineer Zhao", role: "Fintech Company" }
      },
      cta: {
        title: "Ready to elevate your AI capabilities?",
        subtitle: "Whether you want to optimize existing systems or build AI capabilities from scratch, we offer professional technical support.",
        btn: "Contact Us Now"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Feel free to reach out to us for any questions or needs",
        form: { name: "Your Name", email: "Email Address", phone: "Phone Number", msg: "Message", btn: "Submit" },
        info: { title: "Contact Info", addrTitle: "Address", addr: "TCL Building, Gaoxin South 1st Road, Nanshan District, Shenzhen", phoneTitle: "Phone", emailTitle: "Email", hoursTitle: "Working Hours", hours: "Mon-Fri: 9:00 - 18:00", follow: "Follow Us" }
      },
      footer: {
        desc: "QINGLING AI is committed to enterprise large model inference optimization and AI agent development.",
        links: "Quick Links",
        services: "Services",
        contact: "Contact",
        copyright: "© 2025 QINGLING AI (Shenzhen) Co., Ltd. All rights reserved."
      }
    }
  }
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'nav.home', href: '#home' },
  { label: 'nav.about', href: '#about' },
  { label: 'nav.services', href: '#services' },
  { label: 'nav.team', href: '#team' },
  { label: 'nav.contact', href: '#contact' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "team.m1.name",
    role: "team.m1.role",
    description: "team.m1.desc",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    socials: { linkedin: true, twitter: true, email: true }
  },
  {
    name: "team.m2.name",
    role: "team.m2.role",
    description: "team.m2.desc",
    image: "https://images.unsplash.com/photo-1548689775-de410782ac3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    socials: { linkedin: true, github: true, email: true }
  },
  {
    name: "team.m3.name",
    role: "team.m3.role",
    description: "team.m3.desc",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    socials: { linkedin: true, researchgate: true, email: true }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    icon: "fa-tachometer-alt",
    title: "services.s1.title",
    description: "services.s1.desc",
    features: ["services.s1.f1", "services.s1.f2", "services.s1.f3"]
  },
  {
    icon: "fa-robot",
    title: "services.s2.title",
    description: "services.s2.desc",
    features: ["services.s2.f1", "services.s2.f2", "services.s2.f3"]
  },
  {
    icon: "fa-server",
    title: "services.s3.title",
    description: "services.s3.desc",
    features: ["services.s3.f1", "services.s3.f2", "services.s3.f3"]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    content: "testimonials.t1.content",
    author: "testimonials.t1.author",
    role: "testimonials.t1.role",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
  },
  {
    content: "testimonials.t2.content",
    author: "testimonials.t2.author",
    role: "testimonials.t2.role",
    avatar: "https://images.unsplash.com/photo-1590949128997-86d5ef3650ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
  },
  {
    content: "testimonials.t3.content",
    author: "testimonials.t3.author",
    role: "testimonials.t3.role",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
  }
];