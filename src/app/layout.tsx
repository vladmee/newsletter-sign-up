import './globals.css';
import { Roboto } from 'next/font/google';

import './globals.scss';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Newsletter sign up',
  description:
    'Get the latest news delivered to your notification screen exactly when they happen!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
