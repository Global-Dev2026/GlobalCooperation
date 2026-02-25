// Brand Colors
export const COLORS = {
  maroon: {
    DEFAULT: "#800000",
    light: "#990000",
    dark: "#660000",
  },
  yellow: {
    DEFAULT: "#FFD700",
    light: "#FFE14D",
    dark: "#CCAC00",
  },
  white: "#FFFFFF",
  dark: "#1A1A1A",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

// Site Configuration
export const SITE_CONFIG = {
  name: "Global Cooperation (Private) Limited",
  tagline: "Transforming Ideas into Digital Solutions",
  description:
    "Expert software development, cloud solutions, and AI services for modern businesses.",
  url: "https://globalsoftsolution.com",
  email: "info@globalsoftsl.com",
  phone: "+94 11 216 0252",
  address: "Sepali Place, 22/20 Yahampath Mawatha, Maharagama 10280",
  mapUrl: "https://share.google/1aP2fDU4AXd1WB2AJ",
  social: {
    linkedin: "https://www.linkedin.com/company/global-cooperation-pvt-ltd/?viewAsMember=true",
  },
} as const;

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
] as const;

// Service Offerings
export const SERVICES = [
  {
    id: "pos-system",
    title: "POS System",
    description:
      "Comprehensive point-of-sale solutions designed to streamline your retail operations and enhance customer experience.",
    icon: "ShoppingCart",
  },
  {
    id: "computer-hardware",
    title: "Computer Hardware Items",
    description:
      "Quality computer hardware and peripherals for all your business technology infrastructure needs.",
    icon: "Laptop",
  },
  {
    id: "cctv-ac",
    title: "CCTV + AC Solutions",
    description:
      "Professional installation and maintenance of security camera systems and air conditioning units.",
    icon: "Video",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Tailored software solutions built to meet your unique business requirements and workflows.",
    icon: "Code",
  },
  {
    id: "website-solutions",
    title: "Website Solutions",
    description:
      "Professional website design and development services to establish your online presence.",
    icon: "Globe",
  },
  {
    id: "supermarket-advisory",
    title: "Supermarket Advisory Service",
    description:
      "Expert consulting and advisory services for supermarket operations, management, and optimization.",
    icon: "Store",
  },
] as const;

// Subsidiaries / Companies under Global Cooperation Private Limited
export const COMPANIES = [
  {
    slug: "global-soft-solutions",
    name: "Global Soft Solutions (Private) Limited",
    short:
      "Custom software development, cloud architecture, and AI/ML solutions.",
    description:
      "Global Soft Solutions delivers comprehensive software development services, from concept to deployment. We specialize in building scalable cloud-native applications, implementing AI/ML solutions, and providing end-to-end digital transformation services for businesses of all sizes.",
    fullDescription:
      "At Global Soft Solutions, we combine technical excellence with business acumen to deliver software solutions that drive real results. Our team of expert engineers and architects work closely with clients to understand their unique challenges and craft custom solutions using cutting-edge technologies. From initial concept to post-deployment support, we ensure your digital transformation journey is smooth and successful.",
    focus: [
      "Custom Software Development",
      "Cloud Architecture",
      "POS System & Services",
    ],
    features: [
      {
        title: "Full-Stack Development",
        description:
          "End-to-end software development using modern frameworks and technologies to build scalable, performant applications.",
        icon: "Code2",
      },
      {
        title: "Cloud-Native Solutions",
        description:
          "Design and deploy applications optimized for cloud environments with auto-scaling, high availability, and cost efficiency.",
        icon: "Cloud",
      },
      {
        title: "POS System & Services",
        description:
          "Our flagship product, Global POS, is a comprehensive point-of-sale solution designed to manage supermarkets, retail outlets, and more.",
        icon: "ShoppingCart",
      },
      {
        title: "Enterprise Architecture",
        description:
          "Build robust, secure enterprise systems that integrate seamlessly with your existing technology stack.",
        icon: "Building2",
      },
      {
        title: "API Development",
        description:
          "Create RESTful and GraphQL APIs that power modern applications with performance and security in mind.",
        icon: "Workflow",
      },
      {
        title: "24/7 Support",
        description:
          "Round-the-clock technical support and maintenance to ensure your applications run smoothly at all times.",
        icon: "Headphones",
      },
    ],
    stats: [
      { label: "Projects Delivered", value: 250, suffix: "+" },
      { label: "Active Clients", value: 85, suffix: "+" },
      { label: "Success Rate", value: 98, suffix: "%" },
      { label: "Team Members", value: 120, suffix: "+" },
    ],
    color: "#841818",
    gradient: "from-burgundy-950 via-burgundy to-burgundy-700",
    cta: {
      title: "Ready to Transform Your Business?",
      description:
        "Let's discuss how our custom software solutions can help you achieve your goals.",
      buttonText: "Start Your Project",
    },
    image: "/images/companies/software.webp",
  },
  {
    slug: "global-tech",
    name: "Global Tech (Private) Limited",
    short:
      "End-to-end technology solutions — POS systems, hardware, CCTV, software development, and supermarket advisory.",
    description:
      "Global Tech (Private) Limited is a leading Sri Lanka-based technology company delivering comprehensive IT solutions to businesses of all sizes. From POS systems and computer hardware to CCTV installations, custom software development, and website solutions, we are a one-stop technology partner. Under the strategic leadership of Director Pasan Wickramathanthri, we empower businesses to innovate, optimize operations, and grow through practical, high-impact digital solutions.",
    fullDescription:
      "Global Tech (Private) Limited stands at the forefront of Sri Lanka's technology landscape, offering a wide spectrum of IT products and services. We specialize in deploying point-of-sale (POS) systems for retail and supermarket environments, supplying quality computer hardware and peripherals, installing and maintaining CCTV security systems and air conditioning units, developing custom software tailored to unique business needs, building professional websites, and providing expert advisory services to the supermarket and retail sectors. Our mission is to bridge the gap between technology and business operations, ensuring every client benefits from reliable, scalable, and cost-effective solutions. Led by an experienced team and backed by the Global Cooperation Group, we bring global-standard technology to the local market.",
    focus: [
      "POS & Retail Technology",
      "Hardware & Infrastructure",
      "Software & Web Development",
    ],
    features: [
      {
        title: "POS System Solutions",
        description:
          "Comprehensive point-of-sale systems tailored for retail stores, supermarkets, and restaurants — streamlining billing, inventory, and customer management.",
        icon: "ShoppingCart",
      },
      {
        title: "Computer Hardware Supply",
        description:
          "Quality computers, laptops, peripherals, and networking equipment to build reliable IT infrastructure for your business.",
        icon: "Laptop",
      },
      {
        title: "CCTV & Security Systems",
        description:
          "Professional installation and maintenance of CCTV surveillance systems to protect your premises and assets.",
        icon: "Video",
      },
      {
        title: "AC Solutions & Maintenance",
        description:
          "Supply, installation, and servicing of air conditioning systems for commercial and retail environments.",
        icon: "Wind",
      },
      {
        title: "Custom Software Development",
        description:
          "Bespoke software solutions built to fit your exact business workflows — from inventory systems to enterprise management platforms.",
        icon: "Code",
      },
      {
        title: "Website Solutions",
        description:
          "Professional website design and development to establish your digital presence with modern, responsive, and SEO-optimized sites.",
        icon: "Globe",
      },
      {
        title: "Supermarket Advisory",
        description:
          "Expert consulting for supermarket and retail operations — helping businesses optimize layout, technology, and management practices.",
        icon: "Store",
      },
      {
        title: "IT Support & Maintenance",
        description:
          "Ongoing technical support, preventive maintenance, and rapid-response IT services to keep your operations running smoothly.",
        icon: "Headphones",
      },
    ],
    stats: [
      { label: "Businesses Served", value: 150, suffix: "+" },
      { label: "POS Systems Deployed", value: 200, suffix: "+" },
      { label: "Years of Experience", value: 15, suffix: "+" },
      { label: "Client Satisfaction", value: 98, suffix: "%" },
    ],
    color: "#841818",
    gradient: "from-burgundy-950 via-burgundy to-burgundy-700",
    cta: {
      title: "Ready to Upgrade Your Business Technology?",
      description:
        "From POS systems to full IT infrastructure, we deliver the right technology solutions for your business.",
      buttonText: "Contact Us Today",
    },
    image: "/images/companies/tech.jpg",
  },
  {
    slug: "global-advisory-services",
    name: "Global Advisory Services (Private) Limited",
    short:
      "Strategic consulting for digital transformation and cloud adoption.",
    description:
      "Global Advisory Services provides expert strategic consulting to guide organizations through their digital transformation journey. We offer cloud adoption strategies, data analytics roadmaps, AI implementation planning, and technology governance frameworks tailored to your business objectives.",
    fullDescription:
      "Navigate the complexities of digital transformation with confidence. Global Advisory Services brings together strategy consultants, cloud architects, and industry experts to help you make informed technology decisions. We provide actionable roadmaps, risk assessments, and change management support to ensure your transformation initiatives deliver measurable business value. Our advisory services bridge the gap between technology and business outcomes.",
    focus: ["Digital Strategy", "Cloud Migration", "Data & AI Advisory"],
    features: [
      {
        title: "Digital Strategy",
        description:
          "Develop comprehensive digital transformation strategies aligned with your business goals and market demands.",
        icon: "Target",
      },
      {
        title: "Cloud Migration",
        description:
          "Plan and execute seamless cloud migrations with minimal disruption and maximum cost optimization.",
        icon: "CloudUpload",
      },
      {
        title: "Data Analytics",
        description:
          "Build data strategies and analytics frameworks that turn your data into actionable business insights.",
        icon: "BarChart3",
      },
      {
        title: "AI Implementation",
        description:
          "Strategic planning for AI adoption, from use case identification to implementation roadmaps.",
        icon: "Sparkles",
      },
      {
        title: "Technology Governance",
        description:
          "Establish governance frameworks that balance innovation with security, compliance, and risk management.",
        icon: "Shield",
      },
      {
        title: "Change Management",
        description:
          "Guide your organization through technology changes with structured change management programs.",
        icon: "Users",
      },
    ],
    stats: [
      { label: "Consulting Projects", value: 180, suffix: "+" },
      { label: "Enterprise Clients", value: 65, suffix: "+" },
      { label: "ROI Improvement", value: 45, suffix: "%" },
      { label: "Consultants", value: 50, suffix: "+" },
    ],
    color: "#841818",
    gradient: "from-burgundy-950 via-burgundy to-burgundy-700",
    cta: {
      title: "Transform Your Business Strategy",
      description:
        "Partner with our experts to navigate your digital transformation journey.",
      buttonText: "Schedule Consultation",
    },
    image: "/images/companies/advisory.webp",
  },
  {
    slug: "global-sleek",
    name: "Global Sleek (Private) Limited",
    short: "Product design, UX research, and brand experience solutions.",
    description:
      "Global Sleek is a full-service design studio focused on creating exceptional user experiences. From UX research and product design to brand identity and customer journey mapping, we craft delightful digital products that users love and businesses value.",
    fullDescription:
      "Design is more than aesthetics—it's about solving real user problems with elegance and purpose. Global Sleek combines user research, strategic design thinking, and visual excellence to create products that resonate with your audience. Our multidisciplinary team of designers, researchers, and strategists work collaboratively to craft experiences that not only look beautiful but also drive engagement, conversion, and customer loyalty.",
    focus: ["Product Design", "UX Research", "Brand Experience"],
    features: [
      {
        title: "UX Research",
        description:
          "Deep user insights through interviews, usability testing, and behavioral analysis to inform design decisions.",
        icon: "Search",
      },
      {
        title: "Product Design",
        description:
          "Create intuitive, beautiful interfaces that delight users and drive business metrics.",
        icon: "Palette",
      },
      {
        title: "Brand Identity",
        description:
          "Develop cohesive brand systems including logos, color palettes, typography, and visual guidelines.",
        icon: "Sparkle",
      },
      {
        title: "Prototyping",
        description:
          "Rapid prototyping and interactive mockups to validate concepts before development.",
        icon: "Layers",
      },
      {
        title: "Design Systems",
        description:
          "Build scalable design systems that ensure consistency across all your digital touchpoints.",
        icon: "Grid3x3",
      },
      {
        title: "Motion Design",
        description:
          "Bring interfaces to life with purposeful animations and micro-interactions.",
        icon: "Wand2",
      },
    ],
    stats: [
      { label: "Design Projects", value: 320, suffix: "+" },
      { label: "Happy Clients", value: 150, suffix: "+" },
      { label: "User Satisfaction", value: 96, suffix: "%" },
      { label: "Designers", value: 45, suffix: "+" },
    ],
    color: "#841818",
    gradient: "from-burgundy-950 via-burgundy to-burgundy-700",
    cta: {
      title: "Create Exceptional User Experiences",
      description:
        "Let's design products that your users will love and your business will value.",
      buttonText: "Start Design Project",
    },
    image: "/images/companies/sleek.webp",
  },
] as const;

// Board of Directors
export const BOARD_OF_DIRECTORS = [
  {
    id: "dharshana",
    name: "Dr. Dharshana Weerakoon",
    position: "Chairman & CEO",
    education: "DBA (USA),MBA (UK), MBA (USA), BBA (USA)",
    bio: "Dr. Dharshana Weerakoon, DBA (USA), is a seasoned entrepreneur with 30+ years of experience across technology, retail, and professional services. As Group Chairman of GLOBAL COOPERATION (PRIVATE) LIMITED and Sri Lanka Representative of Sustainable Wellness Group Ltd., London, he leads strategy and governance to drive sustainable growth.",
    image: "/images/directers/dharshana.png",
    linkedin: "https://www.linkedin.com/in/dharshana-weerakoon/",
  },
  {
    id: "sumudu",
    name: "Mr. Sumudu Masakorala",
    position: "Director",
    education: "",
    bio: "Established in 2009, Global Soft Solutions (Pvt) Ltd, led by Director Sumudu, delivers innovative software and IT solutions that empower businesses to achieve efficiency, scalability, and sustainable growth. Committed to excellence and cutting-edge technology, we transform ideas into impactful digital solutions.",
    image: "/images/directers/sumudu.png",
    linkedin: "https://www.linkedin.com/in/sumudu-masakorala/",
  },
  {
    id: "lakshitha",
    name: "Mr. Rumesh Lakshitha ",
    position: "Directer",
    education: "B.Sc. Accounting (Special) USJP",
    bio: "Global Advisory Services (Pvt) Ltd, led by Director Rumesh, provides expert advisory solutions to help businesses navigate complex challenges and achieve sustainable growth. Since its inception, the company has been committed to delivering strategic insights, innovative approaches, and measurable results.",
    image: "/images/directers/lakshitha.png",
    linkedin: "https://www.linkedin.com/in/rumesh-lakshitha/",
  },
  {
    id: "channa",
    name: "Mr. Channa Hapuarachchi",
    position: "Directer",
    education: "",
    bio: "Global Sleek (Pvt) Ltd, led by Director Channa, specializes in delivering innovative and efficient solutions that drive business excellence. Committed to quality and forward-thinking strategies, the company transforms challenges into opportunities for sustainable growth.",
    image: "/images/directers/channa.png",
    linkedin: "#",
  },
  {
    id: "pasan",
    name: "Mr. Pasan Wickramathanthri",
    position: "Director",
    education: "",
    bio: "Global Tech (Pvt) Ltd, under the leadership of Director Pasan, delivers cutting-edge technology solutions that empower businesses to innovate, optimize, and grow. Focused on excellence and innovation, the company transforms ideas into practical, high-impact digital solutions.",
    image: "/images/directers/pasan.png",
    linkedin: "https://www.linkedin.com/in/pasan-dileepa-457ab7131/",
  },
  {
    id: "rashmika",
    name: "Mr. Rashmika Perera",
    position: "Director",
    education: "",
    bio: "Global Soft Solutions (Pvt) Ltd, led by Director Rashmika, delivers innovative software and IT solutions that drive business efficiency and growth. Committed to quality and forward-thinking strategies, the company transforms ideas into impactful digital solutions.",
    image: "/images/directers/rashmika.png",
    linkedin: "https://www.linkedin.com/in/rashmika-perera-640639149/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    id: "muditha",
    name: "Mr. Muditha ",
    position: "Directer",
    education: "B.Com(Sp) USJ, CPA, ACMA, CBA, MCPM, SAT",
    bio: "A seasoned Business Analyst and Leader with 25+ years across finance, marketing, and operations. Known for strategic foresight, innovative solutions, and driving growth by uniting diverse functions and challenging conventions to create sustainable competitive advantage",
    image: "/images/directers/muditha.png",
    linkedin: "https://www.linkedin.com/in/muditha-hapuarachchi/",
  },
  {
    id: "suranga",
    name: "Mr. Suranga Perera",
    position: "Director",
    education: "",
    bio: "A growth-driven leader overseeing the marketing division, specializing in the import and distribution of high-quality hardware accessories. With a focus on strategic market positioning and supply chain excellence, he plays a key role in expanding the company's product portfolio and market reach.",
    image: "/images/directers/suranga.png",
    linkedin: "#",
  },
] as const;

// Animation Durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
