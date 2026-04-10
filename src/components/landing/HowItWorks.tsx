'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, CreditCard, Share2 } from 'lucide-react';

const stepIcons = [UserPlus, CreditCard, Share2];
const stepColors = ['#8b5cf6', '#06b6d4', '#10b981'];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute inset-0 bg-surface/20" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[16.66%] right-[16.66%] h-px overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-accent/30 to-success/30" />
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
            {t.howItWorks.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const color = stepColors[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-8">
                    <div
                      className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                      style={{ background: color, transform: 'scale(1.5)' }}
                    />
                    <div
                      className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                        border: `2px solid ${color}40`,
                        boxShadow: `0 0 40px ${color}18`,
                      }}
                    >
                      <span style={{ color }}>
                        <Icon size={32} />
                      </span>
                      <span className="text-xs font-bold mt-1 opacity-50" style={{ color }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xs">{step.description}</p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '3rem' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="h-0.5 mt-5 rounded-full"
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-surface-border text-sm text-muted">
            <span className="text-base">⚡</span>
            Setup completo em menos de 2 minutos — sem precisar de conhecimento técnico
          </div>
        </motion.div>
      </div>
    </section>
  );
}
