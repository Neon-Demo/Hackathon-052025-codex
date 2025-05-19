# Web Next.js Application

This is a skeleton Next.js application generated based on the project documentation. It implements:

- Google and Microsoft SSO using `next-auth`
- A demo login option for quick access
- TypeScript for type safety
- Tailwind CSS for responsive design

## Getting Started

1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and provide OAuth credentials.
3. Run the development server:
   ```bash
   npm run dev
   ```

## Notes

- OAuth credentials must be configured for Google and Microsoft providers.
- The demo login simply redirects to the dashboard without authentication.
