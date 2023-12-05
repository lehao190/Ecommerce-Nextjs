import Header from '@/components/customs/header/Header';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Ecommerce',
  description: 'My awesome Ecommerce App'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
