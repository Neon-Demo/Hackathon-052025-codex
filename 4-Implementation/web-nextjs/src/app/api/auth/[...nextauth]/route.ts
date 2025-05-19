import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || 'YOUR_AZURE_CLIENT_ID',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || 'YOUR_AZURE_CLIENT_SECRET',
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
