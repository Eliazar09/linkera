'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Linkura
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('features')}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t.nav.faq}
            </button>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-surface-border text-sm text-muted hover:text-foreground hover:border-primary/50 transition-all"
            >
              <span className={lang === 'pt' ? 'text-primary font-semibold' : ''}>
                PT
              </span>
              <span className="text-surface-border">|</span>
              <span className={lang === 'es' ? 'text-primary font-semibold' : ''}>
                ES
              </span>
            </button>

            <Link
              href="/auth/login"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/auth/register"
              className="glow-button text-sm !py-2.5 !px-5"
            >
              {t.nav.start}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-border"
          >
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollTo('features')}
                className="block w-full text-left text-sm text-muted hover:text-foreground py-2"
              >
                {t.nav.features}
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="block w-full text-left text-sm text-muted hover:text-foreground py-2"
              >
                {t.nav.howItWorks}
              </button>
              <button
                onClick={() => scrollTo('pricing')}
                className="block w-full text-left text-sm text-muted hover:text-foreground py-2"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="block w-full text-left text-sm text-muted hover:text-foreground py-2"
              >
                {t.nav.faq}
              </button>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
                <button
                  onClick={toggleLang}
                  className="px-3 py-1.5 rounded-lg border border-surface-border text-sm text-muted"
                >
                  {lang === 'pt' ? 'PT 🇧🇷' : 'ES 🇪🇸'}
                </button>
                <Link href="/auth/login" className="text-sm text-muted">
                  {t.nav.login}
                </Link>
                <Link
                  href="/auth/register"
                  className="glow-button text-sm !py-2 !px-4 ml-auto"
                >
                  {t.nav.start}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
