'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Shield, Sparkles, Crown } from 'lucide-react';

const plans = [
  {
    id: 'teste',
    badge: 'TESTE',
    badgeColor: 'bg-accent/20 text-accent',
    name: 'Plano Teste',
    description: 'Experimente por apenas R$1',
    price: 'R$1',
    period: '/mês',
    popular: false,
    features: [
      'Links ilimitados',
      'IA para gerar página',
      'Analytics completo',
      'Temas premium',
      'Sem marca d\'água',
    ],
    icon: Sparkles,
  },
  {
    id: 'pro',
    badge: 'MAIS POPULAR',
    badgeColor: 'bg-primary/20 text-primary',
    name: 'Plano Pro',
    description: 'Acesso completo a todas as funcionalidades',
    price: 'R$9,99',
    period: '/mês',
    popular: true,
    features: [
      'Links ilimitados',
      'IA para gerar página',
      'Analytics completo',
      'Todos os temas premium',
      'Sem marca d\'água',
      'Domínio personalizado linkura.app/user',
      'Suporte prioritário',
      'SSL gratuito',
    ],
    icon: Crown,
  },
];

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            {t.pricing.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Escolha seu plano
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative rounded-2xl p-8 sm:p-10 overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'bg-surface border-2 border-primary/40 shadow-xl shadow-primary/10'
                  : 'bg-surface/60 border border-surface-border'
              }`}
            >
              {/* Gradient glow for popular */}
              {plan.popular && (
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
              )}

              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${plan.badgeColor}`}>
                  {plan.popular ? '⚡' : '🧪'} {plan.badge}
                </span>
                {plan.popular && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <plan.icon size={16} className="text-primary" />
                  </div>
                )}
                {!plan.popular && (
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <plan.icon size={16} className="text-accent" />
                  </div>
                )}
              </div>

              {/* Plan name */}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted mb-6">{plan.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-4xl sm:text-5xl font-bold ${plan.popular ? 'gradient-text' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className="text-muted">{plan.period}</span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-success/20' : 'bg-accent/20'
                    }`}>
                      <Check size={12} className={plan.popular ? 'text-success' : 'text-accent'} />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/auth/register?plan=${plan.id}`}
                className={`w-full text-center block py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'glow-button'
                    : 'bg-surface-light border border-surface-border hover:border-primary/30 hover:bg-surface-light/80 text-foreground'
                }`}
              >
                {plan.popular ? 'Começar Agora' : 'Experimentar'}
              </Link>

              {/* Guarantee */}
              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-muted">
                <Shield size={12} />
                {t.pricing.guarantee}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
