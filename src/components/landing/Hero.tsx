'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8"
        >
          <Sparkles size={14} />
          {t.hero.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {t.hero.title}{' '}
          <span className="gradient-text">{t.hero.titleHighlight}</span>
          <br />
          {t.hero.titleEnd}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/auth/register" className="glow-button text-lg flex items-center gap-2 group">
            {t.hero.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl border border-surface-border text-foreground hover:border-primary/50 hover:bg-surface-light transition-all text-lg"
          >
            {t.hero.ctaSecondary}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '2.4K+', label: t.hero.stats.pages },
            { value: '180K+', label: t.hero.stats.clicks },
            { value: '12', label: t.hero.stats.countries },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="glass-card p-4 sm:p-8 max-w-sm mx-auto animate-float">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Maria Silva</h3>
              <p className="text-sm text-muted mb-6">Designer & Criadora de Conteúdo</p>
              <div className="w-full space-y-3">
                {['Portfolio', 'Instagram', 'Loja Online'].map((link) => (
                  <div
                    key={link}
                    className="w-full py-3 rounded-xl bg-surface-light border border-surface-border text-sm font-medium hover:border-primary/30 transition-colors"
                  >
                    {link}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
