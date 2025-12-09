import { Header } from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
// import { AuthProvider } from '@/lib/auth-context';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TourGuide - Embeddable Onboarding Tours',
  description: 'Create beautiful, interactive onboarding tours for your website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          <Header />
          <main className="pt-16">{children}</main>
        {/* </AuthProvider> */}
          <Footer />

      </body>
    </html>
  );
}
