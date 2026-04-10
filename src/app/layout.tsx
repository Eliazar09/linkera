import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Linkura - Link in Bio com IA para LATAM',
  description:
    'Crie seu link in bio profissional com inteligência artificial. Descreva seu negócio e tenha uma página pronta em segundos. Para toda América Latina.',
  keywords: ['link in bio', 'linkura', 'IA', 'LATAM', 'bio link', 'page builder'],
  openGraph: {
    title: 'Linkura - Link in Bio com IA',
    description: 'Crie seu link in bio profissional com inteligência artificial.',
    url: 'https://linkura.app',
    siteName: 'Linkura',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
