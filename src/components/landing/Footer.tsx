'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const columns = [
    {
      title: t.footer.product,
      links: [
        { label: t.footer.links.features, href: '#features' },
        { label: t.footer.links.pricing, href: '#pricing' },
        { label: 'Como funciona', href: '#how-it-works' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.footer.links.about, href: '#' },
        { label: t.footer.links.contact, href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Afiliados', href: '#' },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.footer.links.privacy, href: '#' },
        { label: t.footer.links.terms, href: '#' },
        { label: 'LGPD', href: '#' },
        { label: 'Cookies', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-surface-border/60 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold">Linkura</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>

            {/* Social + language badges */}
            <div className="flex flex-wrap gap-2">
              {['🇧🇷 Português', '🇪🇸 Español'].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-lg bg-surface border border-surface-border text-xs text-muted"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted/70 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href === '#' && (
                        <ExternalLink size={11} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-surface-border/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted">{t.footer.copyright}</p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted flex items-center gap-1.5">
                Feito com
                <span className="text-rose">❤️</span>
                para a LATAM
              </span>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-success"
                title="Todos os sistemas operacionais"
              />
              <span className="text-xs text-muted">Todos os sistemas ok</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
