import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BYOM - Be Your Own Marketer | Nepal Digital Workshop',
  description: 'Empowering Nepali Marketers with practical hands-on training in content creation, video editing, and digital marketing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fcf9f8] text-[#1b1c1c] antialiased">
        {children}
      </body>
    </html>
  );
}
