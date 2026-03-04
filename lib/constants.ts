// Brand Colors
export const COLORS = {
  maroon: {
    DEFAULT: "#800000",
    light: "#990000",
    dark: "#660000",
  },
  yellow: {
    DEFAULT: "#E0BB20",
    light: "#FDE047",
    dark: "#CA8A04",
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
  address: "Sepali Place, 22/20 Yahampath Mawatha, Maharagama 10280, Sri Lanka",
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
    title: "Supermarket Advisory & Management",
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
      "Software Development",
      "Website & Mobile Solutions",
      "POS System & Services",
    ],
    features: [
      {
        title: "Software Development",
        description:
          "End-to-end software development using modern frameworks and technologies to build scalable, performant applications tailored to your business.",
        icon: "Code2",
        highlights: ["Web Applications", "Backend Systems", "Desktop Software"],
      },
      {
        title: "Website Development",
        description:
          "Design and develop responsive, high-performance websites that establish a strong digital presence and drive user engagement.",
        icon: "Globe",
        highlights: ["Corporate Websites", "E-commerce", "Landing Pages"],
      },
      {
        title: "POS System & Services",
        description:
          "Our flagship product, Global POS, is a comprehensive point-of-sale solution designed to manage supermarkets, retail outlets, and more.",
        icon: "ShoppingCart",
        highlights: ["Global POS Product", "Supermarket Management", "Maintenance & Support"],
      },
      {
        title: "Enterprise Architecture",
        description:
          "Build robust, secure enterprise systems that integrate seamlessly with your existing technology stack.",
        icon: "Building2",
        highlights: ["System Integration", "Security", "Microservices"],
      },
      {
        title: "Mobile Development",
        description:
          "Build feature-rich, intuitive mobile applications for iOS and Android platforms that provide seamless user experiences.",
        icon: "Smartphone",
        highlights: ["iOS & Android", "React Native", "Native Apps"],
      },
      {
        title: "24/7 Support",
        description:
          "Round-the-clock technical support and maintenance to ensure your applications run smoothly at all times.",
        icon: "Headphones",
        highlights: ["On-call Engineers", "Monitoring", "Rapid Response"],
      },
    ],
    whyChooseUs: [
      {
        title: "Established in 2009",
        description: "Over 15 years of delivering reliable software solutions to businesses of all sizes.",
      },
      {
        title: "Software Expertise",
        description: "From database design to frontend — our team covers the complete development lifecycle.",
      },
      {
        title: "Modern Web Solutions",
        description: "We design scalable, user-centric web architectures built for performance and resilience.",
      },
      {
        title: "Global POS — Our Flagship Product",
        description: "Global POS manages supermarkets and retail businesses end-to-end, backed by our dedicated maintenance and support team.",
      },
      {
        title: "Transparent Communication",
        description: "Regular updates, clear reporting, and honest timelines — no surprises.",
      },
      {
        title: "Backed by Global Cooperation Group",
        description: "Part of a diversified holding company, ensuring stability and long-term commitment.",
      },
    ],
    stats: [
      { label: "Projects Delivered", value: 1600, suffix: "+" },
      { label: "Active Clients", value: 1200, suffix: "+" },
      { label: "Success Rate", value: 98, suffix: "%" },
      { label: "Years Experience", value: 18, suffix: "+" },
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
      "Expert technology solutions — CCTV security systems, AC solutions, and comprehensive IT support.",
    description:
      "Global Tech (Private) Limited is a leading Sri Lanka-based technology company delivering professional IT infrastructure and security solutions. We specialize in CCTV installations, air conditioning services, and ongoing IT maintenance. Under the strategic leadership of Director Pasan Wickramathanthri, we empower businesses to secure and optimize their physical and digital environments.",
    fullDescription:
      "Global Tech (Private) Limited stands at the forefront of Sri Lanka's technical services landscape, offering specialized solutions for business infrastructure. We specialize in installing and maintaining professional CCTV security systems to protect assets, supplying and servicing energy-efficient air conditioning units, and providing rapid-response IT support and maintenance. Our mission is to ensure your business environments are safe, comfortable, and technologically sound. Led by an experienced team and backed by the Global Cooperation Group, we bring reliability and technical excellence to every client project.",
    focus: [
      "CCTV Cameras",
      "Door Locking Systems",
      "AC Solutions & Maintenance",
      "IT Support & Infrastructure",
    ],
    features: [
      {
        title: "CCTV Cameras",
        description: "Professional installation and maintenance of HD CCTV surveillance systems to protect your business and assets with remote monitoring.",
        icon: "Video",
        highlights: ["HD Camera Installation", "Remote Monitoring", "24/7 Digital Recording"],
      },
      {
        title: "Door Locking Systems",
        description: "Advanced access control and door locking solutions including electronic, biometric, and smart entry systems for enhanced security.",
        icon: "Lock",
        highlights: ["Magnetic Locks", "Biometric Access", "Mobile Integration"],
      },
      {
        title: "AC Solutions & Maintenance",
        description: "Supply, installation, and servicing of air conditioning systems for commercial and retail environments.",
        icon: "Wind",
        highlights: ["Commercial AC Units", "Preventive Maintenance", "Energy Efficient Solutions"],
      },
      {
        title: "IT Support & Maintenance",
        description: "Ongoing technical support, preventive maintenance, and rapid-response IT services to keep your operations running smoothly.",
        icon: "Headphones",
        highlights: ["On-site Support", "Remote Assistance", "Preventive Maintenance"],
      },
    ],
    whyChooseUs: [
      {
        title: "One-Stop Technology Partner",
        description: "Hardware, software, CCTV, and advisory — everything under one roof.",
      },
      {
        title: "Local Expertise, Global Standards",
        description: "Sri Lanka-based team with international-quality solutions and service delivery.",
      },
      {
        title: "Tailored Solutions",
        description: "We don't believe in a one-size-fits-all approach — every solution is custom-built.",
      },
      {
        title: "Proven Track Record",
        description: "Trusted by 150+ businesses across retail, supermarkets, and commercial sectors.",
      },
      {
        title: "After-Sales Support",
        description: "Our relationship doesn't end at delivery — we provide ongoing support and maintenance.",
      },
      {
        title: "Backed by Global Cooperation Group",
        description: "Part of a diversified holding company, ensuring stability and long-term commitment.",
      },
    ],
    stats: [
      { label: "Businesses Served", value: 150, suffix: "+" },
      { label: "Installations Completed", value: 300, suffix: "+" },
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
        title: "Business Setup & Expansion Services",
        description:
          "End-to-end support for business registration, licensing, and strategic expansion planning to launch and grow your business with confidence.",
        icon: "Briefcase",
      },
      {
        title: "Retail Strategy & Growth Consulting",
        description:
          "Tailored retail strategies to boost sales performance, enhance customer experience, and drive sustainable business growth.",
        icon: "TrendingUp",
      },
      {
        title: "Financial Advisory Services",
        description:
          "Expert financial planning, budgeting, and investment advisory to strengthen your financial position and maximize profitability.",
        icon: "DollarSign",
      },
      {
        title: "Inventory & Supply Chain Management",
        description:
          "Optimize your inventory control and supply chain operations to reduce costs, minimize waste, and improve delivery efficiency.",
        icon: "Package",
      },
      {
        title: "Operations & Process Improvement",
        description:
          "Identify inefficiencies and implement streamlined processes to enhance operational performance across your entire organization.",
        icon: "Settings2",
      },
      {
        title: "Marketing & Sales Solutions",
        description:
          "Develop data-driven marketing strategies and sales frameworks that attract customers, build brand loyalty, and increase revenue.",
        icon: "Megaphone",
      },
      {
        title: "Technology & Digital Solutions",
        description:
          "Strategic guidance on technology adoption and digital transformation to keep your business competitive in a fast-evolving landscape.",
        icon: "Laptop",
      },
      {
        title: "Human Resource & Staff Training",
        description:
          "Comprehensive HR consulting and customized staff training programs to build a skilled, motivated, and high-performing workforce.",
        icon: "Users",
      },
      {
        title: "Risk Management & Compliance",
        description:
          "Proactive risk identification, assessment, and compliance advisory to safeguard your business from operational and regulatory threats.",
        icon: "Shield",
      },
      {
        title: "Ongoing Advisory & Support Packages",
        description:
          "Flexible retainer-based advisory and support packages providing continuous expert guidance tailored to your evolving business needs.",
        icon: "HeadphonesIcon",
      },
    ],
    whyChooseUs: [
      { title: "Strategic Depth", description: "We go beyond surface-level advice — delivering strategies grounded in deep industry analysis." },
      { title: "Data-Driven Decisions", description: "Every recommendation is backed by rigorous data analysis and benchmarking." },
      { title: "Proven ROI", description: "Our clients see an average 45% improvement in operational ROI within 12 months of engagement." },
      { title: "Risk-Focused Approach", description: "We identify and mitigate technology risks before they become business problems." },
      { title: "Industry-Wide Knowledge", description: "With clients across retail, finance, healthcare, and government — our expertise is broad and deep." },
      { title: "Backed by Global Cooperation Group", description: "Part of a diversified holding company, ensuring stability and long-term commitment." },
    ],
    stats: [
      { label: "Consulting Projects", value: 180, suffix: "+" },
      { label: "Enterprise Clients", value: 65, suffix: "+" },
      { label: "ROI Improvement", value: 95, suffix: "%" },
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
        title: "Brand Identity Design",
        description: "Build a cohesive brand identity that communicates your values and resonates with your target audience.",
        icon: "Palette",
        highlights: ["Logo Design", "Color Systems", "Brand Guidelines"],
      },
      {
        title: "UI/UX Design",
        description: "Design beautiful, intuitive interfaces that delight users and drive conversions across all platforms.",
        icon: "Monitor",
        highlights: ["User Research", "Wireframing", "Prototyping"],
      },
      {
        title: "Mobile Design",
        description: "Create mobile-first experiences that keep users engaged on iOS and Android platforms.",
        icon: "Smartphone",
        highlights: ["iOS & Android", "App Flows", "Interaction Design"],
      },
      {
        title: "Design Systems",
        description: "Build scalable, consistent design systems with reusable components and clear documentation.",
        icon: "Layers",
        highlights: ["Component Libraries", "Figma Systems", "Documentation"],
      },
      {
        title: "Motion & Animation",
        description: "Bring your interfaces to life with purposeful animations that enhance user experience.",
        icon: "Zap",
        highlights: ["Micro-interactions", "Transition Design", "Lottie Animations"],
      },
      {
        title: "UX Research",
        description: "Uncover user insights through research, testing, and data analysis to inform design decisions.",
        icon: "SearchSlash",
        highlights: ["User Testing", "Heatmap Analysis", "A/B Testing"],
      },
    ],
    whyChooseUs: [
      { title: "User-Centered Design", description: "Every design decision is grounded in real user research and behavioral data." },
      { title: "Research-Driven Approach", description: "We validate every concept through testing before a single pixel is finalized." },
      { title: "Multidisciplinary Team", description: "Brand designers, UX researchers, motion artists, and developers — all under one roof." },
      { title: "Rapid Prototyping", description: "From concept to interactive prototype in days, not weeks — accelerating your feedback cycle." },
      { title: "Consistent Design Systems", description: "We build scalable design systems that ensure consistency as your product grows." },
      { title: "Backed by Global Cooperation Group", description: "Part of a diversified holding company, ensuring stability and long-term commitment." },
    ],
    stats: [
      { label: "Design Projects", value: 320, suffix: "+" },
      { label: "Happy Clients", value: 150, suffix: "+" },
      { label: "Design Awards", value: 40, suffix: "+" },
      { label: "Years of Creativity", value: 8, suffix: "+" },
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
    position: "Chairman",
    education: "DBA (USA),MBA (UK), MBA (USA), BBA (USA)",
    bio: "Dr. Dharshana Weerakoon, DBA (USA), is a seasoned entrepreneur with 30+ years of experience across technology, retail, and professional services. As Group Chairman of GLOBAL COOPERATION (PRIVATE) LIMITED and Sri Lanka Representative of Sustainable Wellness Group Ltd., London, he leads strategy and governance to drive sustainable growth.",
    image: "/images/directers/dharshana.png",
    linkedin: "https://www.linkedin.com/in/dharshana-weerakoon/",
  },
  {
    id: "sumudu",
    name: "Sumudu Masakorala",
    position: "Managing Director",
    education: "",
    bio: "Established in 2009, Global Soft Solutions (Private) Limited, led by Director Sumudu, delivers innovative software and IT solutions that empower businesses to achieve efficiency, scalability, and sustainable growth. Committed to excellence and cutting-edge technology, we transform ideas into impactful digital solutions.",
    image: "/images/directers/sumudu.png",
    linkedin: "https://www.linkedin.com/in/sumudu-masakorala/",
  },
  {
    id: "suranga",
    name: "Suranga Perera",
    position: "Director",
    education: "",
    bio: "A growth-driven leader overseeing the marketing division, specializing in the import and distribution of high-quality hardware accessories. With a focus on strategic market positioning and supply chain excellence, he plays a key role in expanding the company's product portfolio and market reach.",
    image: "/images/directers/suranga.png",
    linkedin: "",
  },
  {
    id: "rashmika",
    name: "Rashmika Perera",
    position: "Director",
    education: "",
    bio: "Global Soft Solutions (Private) Limited, led by Director Rashmika, delivers innovative software and IT solutions that drive business efficiency and growth. Committed to quality and forward-thinking strategies, the company transforms ideas into impactful digital solutions.",
    image: "/images/directers/rashmika.png",
    linkedin: "https://www.linkedin.com/in/rashmika-perera-640639149/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    id: "channa",
    name: "Channa Hapuarachchi",
    position: "Director",
    education: "",
    bio: "Global Sleek (Private) Limited, led by Director Channa, specializes in delivering innovative and efficient solutions that drive business excellence. Committed to quality and forward-thinking strategies, the company transforms challenges into opportunities for sustainable growth.",
    image: "/images/directers/channa.png",
    linkedin: "",
  },
  {
    id: "pasan",
    name: "Pasan Wickramathanthri",
    position: "Director",
    education: "",
    bio: "Global Tech (Private) Limited, under the leadership of Director Pasan, delivers cutting-edge technology solutions that empower businesses to innovate, optimize, and grow. Focused on excellence and innovation, the company transforms ideas into practical, high-impact digital solutions.",
    image: "/images/directers/pasan.png",
    linkedin: "https://www.linkedin.com/in/pasan-dileepa-457ab7131/",
  },
  {
    id: "lakshitha",
    name: "Rumesh Lakshitha ",
    position: "Director",
    education: "B.Sc. Accounting (Special) USJP",
    bio: "Global Advisory Services (Private) Limited, led by Director Rumesh, provides expert advisory solutions to help businesses navigate complex challenges and achieve sustainable growth. Since its inception, the company has been committed to delivering strategic insights, innovative approaches, and measurable results.",
    image: "/images/directers/lakshitha.png",
    linkedin: "https://www.linkedin.com/in/rumesh-lakshitha/",
  },
  {
    id: "muditha",
    name: "Muditha Hapuarachchi",
    position: "Consultant",
    education: "B.Com(Sp) USJ, CPA, ACMA, CBA, MCPM, SAT",
    bio: "A seasoned Business Analyst and Leader with 25+ years across finance, marketing, and operations. Known for strategic foresight, innovative solutions, and driving growth by uniting diverse functions and challenging conventions to create sustainable competitive advantage",
    image: "/images/directers/muditha.png",
    linkedin: "https://www.linkedin.com/in/muditha-hapuarachchi/",
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
