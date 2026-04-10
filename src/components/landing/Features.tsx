'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Palette, BarChart3, Zap, Globe, Shield, Smartphone, Link2 } from 'lucide-react';

type LucideIcon = React.ComponentType<{ size?: number; className?: string }>;
const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  palette: Palette,
  chart: BarChart3,
  bolt: Zap,
  globe: Globe,
  shield: Shield,
  smartphone: Smartphone,
  link: Link2,
};

const extraFeatures = [
  {
    icon: 'globe',
    title: 'SEO Otimizado',
    description: 'Sua página aparece no Google com meta tags e Open Graph configurados automaticamente.',
    color: '#06b6d4',
  },
  {
    icon: 'smartphone',
    title: 'Mobile-First',
    description: 'Design 100% responsivo que funciona perfeitamente em qualquer dispositivo.',
    color: '#10b981',
  },
  {
    icon: 'shield',
    title: 'SSL Gratuito',
    description: 'Segurança garantida com HTTPS em todas as páginas sem custo adicional.',
    color: '#f59e0b',
  },
  {
    icon: 'link',
    title: 'Links Ilimitados',
    description: 'Adicione quantos links quiser sem restrições. Instagram, WhatsApp, loja, portfólio e mais.',
    color: '#f43f5e',
  },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-primary/4 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-6">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Main feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {t.features.items.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;
            const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f43f5e'];
            const color = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover p-7 group relative overflow-hidden"
              >
                {/* Hover color leak */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at top left, ${color}, transparent 70%)` }}
                />

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <span style={{ color }}>
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2.5">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Extra features row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {extraFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-surface/40 border border-surface-border/60 hover:border-surface-border transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${feature.color}15` }}
                >
                  <span style={{ color: feature.color }}>
                    <Icon size={17} />
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
