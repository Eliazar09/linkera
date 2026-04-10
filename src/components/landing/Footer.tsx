'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-surface-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold">Linkura</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.footer.product}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.features}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.pricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  {t.footer.links.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">
              Made with 💜 for LATAM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
