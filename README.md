# Global Soft Solution - Official Platform

**Global Soft Solution** is a next-generation corporate platform engineered to showcase the scale, innovation, and diverse portfolio of a modern software conglomerate. Built with **Next.js 15**, **Three.js**, and **TypeScript**, the website combines cinematic 3D visuals with a robust, data-driven architecture.

## 🚀 Overview

This project represents a shift from traditional corporate websites to immersive digital experiences. It features a fully interactive 3D hero section, a dynamic asymmetric grid for subsidiary showcases, and a comprehensive career management system with an integrated admin dashboard.

---

## ✨ Key Features

### 1. Cinematic 3D Experience regarding
- **Interactive Core**: Custom WebGL icosahedron implementation using `react-three-fiber` and `drei`.
- **Particle Networks**: Dynamic particle systems that track mouse movement and scroll position efficiently.
- **Performance**: Optimized GLSL shaders and geometry instancing for 60fps performance on standard devices.

### 2. Dynamic Subsidiary Portfolio
- **Asymmetric Grid Layout**: A unique, visually striking layout engine (`app/companies`) that alternates between large and small content blocks.
- **Micro-interactions**: Smooth hover states and transitions powered by `framer-motion` to create a premium feel.
- **Scalable Data Structure**: Designed to easily add or update subsidiary companies via configuration or database.

### 3. Integrated Recruitment & Admin System
- **Job Board**: Public-facing careers page (`app/careers`) with search and filtering.
- **Secure Admin Portal**: Protected dashboard (`app/admin`) using **NextAuth.js** for secure email/password authentication.
- **Job Management**: Full CRUD capabilities for job postings, efficiently stored in PostgreSQL.
- **Application Workflow**: Streamlined application process with file uploads and validation.

### 4. Enterprise-Grade Communication
- **Contact System**: fully integrated contact form (`components/sections/Contact.tsx`) protected by **Cloudflare Turnstile**.
- **Data Persistence**: Messages are securely stored in a **PostgreSQL** database via **Prisma ORM**.
- **Instant Notifications**: Automated email capability using **Resend** for immediate acknowledgment and admin alerts.

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|--------------|
| **Core** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Lucide Icons |
| **3D & Graphics** | Three.js, React Three Fiber, Drei |
| **Backend & DB** | Next.js API Routes, Prisma 7, PostgreSQL (Supabase) |
| **Authentication** | NextAuth.js v5 (Auth.js), Bcryptjs |
| **Services** | Resend (Email), Cloudflare Turnstile (Security) |
| **Validation** | Zod |

---

## 📂 Project Structure

```bash
d:\Projects\GlobalSoftSolutionOfficialWebsite
├── app/
│   ├── admin/             # Internal admin dashboard for job management
│   ├── api/               # Server-side API routes (messages, jobs)
│   ├── careers/           # Public job board and application pages
│   ├── companies/         # Dynamic subsidiary portfolio pages
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── canvas/            # 3D scenes and React Three Fiber components
│   ├── sections/          # Major page sections (Hero, About, Contact)
│   └── ui/                # Reusable atomic design elements
├── lib/
│   ├── prisma.ts          # Database client configuration
│   └── email.ts           # Email sending logic (Resend)
├── prisma/
│   └── schema.prisma      # Database schema definition
└── scripts/               # Utility scripts for admin management
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database (e.g., Supabase)
- Resend Account (for emails)
- Cloudflare Turnstile Keys
- **[Detailed Database Setup Guide](./SUPABASE_SETUP.md)** (Recommended if you are new to Supabase)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/GlobalSoftSolution/platform.git
   cd platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
    # Database (Supabase Connection Pooling & Direct)
    DATABASE_URL="postgresql://user:password@host:6543/postgres"
    
    # Supabase (Storage & API)
    # Find these in Supabase Dashboard > Settings > API
    NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
    # Find this in API > Legacy anon, service_role API keys
    SUPABASE_SERVICE_ROLE_KEY="your_service_role_secret_key"

    # Authentication & Security
    AUTH_SECRET="your_generated_secret_key" # Generate with: openssl rand -base64 32
    NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_site_key"
    TURNSTILE_SECRET_KEY="your_secret_key"

    # Email (Resend)
    RESEND_API_KEY="re_..."
    EMAIL_FROM="onboarding@resend.dev"
    EMAIL_TO="admin@company.com"
    ```

### 📦 Supabase Storage Setup (Critical for Resumes)
The platform uses Supabase Storage to handle job seeker CVs/Resumes securely.

1. **Create Bucket**: Log into Supabase Dashboard -> **Storage**.
2. **New Bucket**: Create a bucket named exactly `resumes`.
3. **Public Access**: Toggle **Public Bucket** to **ON**. This allows the resume links to be accessible in notification emails.
4. **CORS (Optional)**: If you face upload issues, ensure your CORS policy allows your domain.


4. **Initialize Database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

5. **Create/Reset Admin User**
   We have provided a helper script to easily create or reset the admin account.
   
   ```bash
   # Reset Admin Credentials
   node scripts/reset-admin.js
   ```
   
   > **Default Credentials:**  
   > **Email:** `admin@globalsoft.com`  
   > **Password:** `securepassword123`

6. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### 🔑 Admin Access
To manage job postings and view applications:
1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Log in with the admin credentials created in Step 5.
3. Use the dashboard to Create, Edit, or Delete job listings.

---

## 🎨 Design System

The visual identity of Global Soft Solution is built on a foundation of authority and innovation.

- **Colors**:
  - `Burgundy` (#800000): Represents stability and leadership.
  - `Gold` (#FFD700): Accents symbolizing value and quality.
  - `Slate/White`: Modern, clean corporate typography.

- **Typography**:
  - **Headings**: *Montserrat* - Bold, assertive, and legible.
  - **Body**: *Inter* - Clean, highly readable interface text.

---

## 🤝 Contribution

This project is maintained by the Global Soft Solution Engineering Team.
For internal access or contribution guidelines, please refer to the internal wiki.

---

© 2026 Global Soft Solution. All Rights Reserved.
