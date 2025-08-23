This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

## Email configuration

To enable the contact form to send emails, add an `.env.local` file with:

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM=no-reply@nexsite.in
CONTACT_TO_EMAIL=contact@nexsite.in
```

On production, set these as environment variables in your hosting provider.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploying to Vercel (Step-by-step)

1. Push this repository to GitHub (public or private).
2. In Vercel, click "New Project" → "Import Git Repository" and select your repo.
3. Vercel auto-detects Next.js. Keep defaults:
   - Framework Preset: Next.js
   - Install Command: npm install
   - Build Command: next build
   - Output Directory: .next
4. Add the following Environment Variables in Project → Settings → Environment Variables:

   - `SMTP_HOST`: Your SMTP server hostname (e.g. smtp.sendgrid.net)
   - `SMTP_PORT`: SMTP port (e.g. 587 for STARTTLS or 465 for SSL)
   - `SMTP_USER`: SMTP username
   - `SMTP_PASS`: SMTP password
   - `SMTP_FROM`: Sender address (e.g. no-reply@nexsite.in)
   - `CONTACT_TO_EMAIL`: Recipient inbox for contact form submissions

5. Click Deploy. Preview URLs are generated per commit, and a Production URL after the first prod deploy.

Notes:
- This project uses npm (package-lock.json). Avoid adding other lockfiles (e.g. bun.lock, pnpm-lock.yaml) to prevent multi-lockfile conflicts.
- The contact form posts to `/api/contact`, which runs on the Node.js runtime (`export const runtime = "nodejs"`). If SMTP variables are not set in non-production environments, the route falls back to an Ethereal test account and returns a preview URL (development only).
- If SMTP is not configured in production, the API responds with an error and the UI falls back to `mailto:` so visitors can still reach you.
