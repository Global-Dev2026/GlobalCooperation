# 🗄️ Supabase Database Setup Guide

Since the previous connection was invalid, follow these steps to create a **fresh, working database**.

## Step 1: Create a New Project
1.  Go to [database.new](https://database.new) (redirects to Supabase).
2.  Sign in with GitHub.
3.  Click **"New Project"**.
4.  **Name**: `GlobalSoft` (or anything you like).
5.  **Password**: *Click "Generate a password"* -> **COPY THIS IMMEDIATELY** to a notepad. You cannot see it again.
6.  **Region**: Choose a region close to you (e.g., Singapore, Mumbai, or US East).
7.  Click **"Create new project"**.

## Step 2: Get Connection Strings
Wait a few minutes for the project to "Provision" (turn green).

1.  Go to **Project Settings** (Gear Icon ⚙️ at the bottom left).
2.  Select **Database** from the side menu.
3.  Scroll down to **Connection parameters**.
4.  **Host**: Copy this (e.g., `db.ixxj...supabase.co`).
5.  **User**: `postgres` (default).
6.  **Port**: `6543` (Transaction Pooler) or `5432` (Session). *We will use 5432 for simplicity first.*

## Step 3: Update `.env` File
Open your local `.env` file and replace the `DATABASE_URL` with your **new** details.

**Format:**
```env
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres"
```

> **Example (If your password is `Secret123` and host is `db.xyz.supabase.co`):**
> `DATABASE_URL="postgresql://postgres:Secret123@db.xyz.supabase.co:5432/postgres?pgbouncer=true"`

## Step 4: Verify & Initialize
Once you have saved the `.env` file with the correct details:

1.  **Test Connection:**
    ```bash
    node scripts/test-db.js
    ```
    *(Should say "SUCCESS")*

2.  **Push Schema (Create Tables):**
    ```bash
    npx prisma db push
    ```

3.  **Create Admin User:**
    ```bash
    node scripts/reset-admin.js
    ```

## Step 5: Start App
```bash
npm run dev
```
Now login at `/admin/login`.
