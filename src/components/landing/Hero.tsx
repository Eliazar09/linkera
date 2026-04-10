'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles, Star, Camera, Play, Music2 as Music } from 'lucide-react';

const mockLinks = [
  { label: 'Portfolio', icon: '🌐', color: '#8b5cf6' },
  { label: 'Instagram', icon: '📸', color: '#f43f5e' },
  { label: 'Loja Online', icon: '🛒', color: '#06b6d4' },
  { label: 'YouTube', icon: '▶️', color: '#ef4444' },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[130px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[110px] animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose/6 blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm mb-8"
            >
              <Sparkles size={13} className="animate-pulse" />
              {t.hero.badge}
              <span className="flex items-center gap-0.5 text-xs text-primary/70">
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              {t.hero.title}{' '}
              <span className="gradient-text-animated">{t.hero.titleHighlight}</span>
              <br />
              <span className="text-foreground/90">{t.hero.titleEnd}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12"
            >
              <Link
                href="/auth/register"
                className="glow-button text-base flex items-center gap-2.5 group"
              >
                {t.hero.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-xl border border-surface-border text-foreground/80 hover:text-foreground hover:border-primary/40 hover:bg-surface-light transition-all text-base"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-10"
            >
              {[
                { value: '2.4K+', label: t.hero.stats.pages },
                { value: '180K+', label: t.hero.stats.clicks },
                { value: '12', label: t.hero.stats.countries },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-primary/15 blur-[80px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent/10 blur-[60px] rounded-full" />

            {/* Phone frame */}
            <div className="relative w-[260px] sm:w-[300px] animate-float-slow">
              {/* Phone outer */}
              <div className="relative bg-[#0f0f1a] border-2 border-surface-border rounded-[36px] p-2 shadow-2xl shadow-black/60">
                {/* Status bar notch */}
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-5 bg-[#0a0a0f] rounded-full" />
                </div>

                {/* Screen content */}
                <div className="bg-gradient-to-b from-[#12121a] to-[#0a0a0f] rounded-[28px] p-5 min-h-[420px] flex flex-col items-center">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-3 flex items-center justify-center text-2xl animate-pulse-glow"
                  >
                    👩‍💻
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-sm font-bold text-white mb-0.5"
                  >
                    Maria Silva
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-[10px] text-muted mb-5 text-center"
                  >
                    Designer & Criadora de Conteúdo
                  </motion.p>

                  {/* Links */}
                  <div className="w-full space-y-2.5">
                    {mockLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.12 }}
                        className="w-full py-2.5 px-3 rounded-xl flex items-center gap-2.5 text-xs font-medium text-white/90 transition-all hover:scale-[1.02]"
                        style={{
                          background: `${link.color}14`,
                          border: `1px solid ${link.color}30`,
                        }}
                      >
                        <span>{link.icon}</span>
                        {link.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Branding */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-auto pt-4 text-[9px] text-muted/50 flex items-center gap-1"
                  >
                    <span className="w-3 h-3 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[6px] text-white font-bold">L</span>
                    linkura.app/maria
                  </motion.div>
                </div>
              </div>

              {/* Floating notification bubbles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.6, type: 'spring' }}
                className="absolute -right-12 top-16 bg-surface border border-surface-border rounded-2xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-success text-base">👁️</span>
                  <div>
                    <div className="font-semibold text-white text-[11px]">+142 views</div>
                    <div className="text-muted text-[9px]">hoje</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.8, type: 'spring' }}
                className="absolute -left-12 bottom-24 bg-surface border border-surface-border rounded-2xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-primary text-base">🔗</span>
                  <div>
                    <div className="font-semibold text-white text-[11px]">+38 cliques</div>
                    <div className="text-muted text-[9px]">essa semana</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social icons floating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-4 right-4 flex gap-2"
            >
              {[Camera, Play, Music].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="w-8 h-8 rounded-xl bg-surface border border-surface-border flex items-center justify-center"
                >
                  <Icon size={14} className="text-muted" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
