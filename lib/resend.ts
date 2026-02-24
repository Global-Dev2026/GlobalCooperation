import { Resend } from 'resend';

// Only instantiate Resend when the API key is available.
// During Next.js build-time page data collection, env vars may not be set,
// so calling `new Resend(undefined)` would throw an error and break the build.
export const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
