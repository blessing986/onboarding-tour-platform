import { AuthProvider } from '@/context/auth-context';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TourGuide - Embeddable Onboarding Tours',
  description:
    'Create beautiful, interactive onboarding tours for your website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position='top-right' />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
