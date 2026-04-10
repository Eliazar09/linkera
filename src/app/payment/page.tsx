'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Shield, CreditCard, Loader2, Sparkles, Crown } from 'lucide-react';

const plans = [
  {
    id: 'teste',
    name: 'Plano Teste',
    description: 'Experimente por apenas R$1',
    price: 'R$1',
    period: '/mês',
    badge: '🧪 TESTE',
    badgeColor: 'bg-accent/20 text-accent border-accent/20',
    popular: false,
    icon: Sparkles,
    features: [
      'Links ilimitados',
      'IA para gerar página',
      'Analytics completo',
      'Temas premium',
      "Sem marca d'água",
    ],
  },
  {
    id: 'pro',
    name: 'Plano Pro',
    description: 'Acesso completo',
    price: 'R$9,99',
    period: '/mês',
    badge: '⚡ MAIS POPULAR',
    badgeColor: 'bg-primary/20 text-primary border-primary/20',
    popular: true,
    icon: Crown,
    features: [
      'Links ilimitados',
      'IA para gerar página',
      'Analytics completo',
      'Todos os temas premium',
      "Sem marca d'água",
      'Suporte prioritário',
    ],
  },
];

// Inner component that uses useSearchParams — must be inside <Suspense>
function PaymentContent() {
  const searchParams = useSearchParams();
  const defaultPlan = searchParams.get('plan') || 'pro';
  const hasError = searchParams.get('error');

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(hasError ? 'Ocorreu um erro na verificação do pagamento. Tente novamente.' : '');

  const handleCheckout = async (planId: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erro ao criar checkout');
        setLoading(false);
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ative sua conta</h1>
        <p className="text-sm text-muted">Escolha um plano para começar a usar o Linkura</p>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-error text-center mb-6 bg-error/10 border border-error/20 rounded-xl px-4 py-3"
        >
          {error}
        </motion.p>
      )}

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {plans.map((plan, idx) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected
                  ? plan.popular
                    ? 'bg-surface border-2 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-surface border-2 border-accent/50 shadow-lg shadow-accent/10'
                  : 'bg-surface/40 border border-surface-border hover:border-surface-border/80'
              }`}
            >
              {plan.popular && isSelected && (
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
              )}

              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border ${plan.badgeColor}`}>
                {plan.badge}
              </span>

              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-xs text-muted mb-4">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-3xl sm:text-4xl font-bold ${isSelected ? (plan.popular ? 'gradient-text' : 'text-accent') : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className="text-muted text-sm">{plan.period}</span>
              </div>

              <div className="space-y-2.5 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-success/20' : 'bg-accent/20'}`}>
                      <Check size={10} className={plan.popular ? 'text-success' : 'text-accent'} />
                    </div>
                    <span className="text-xs text-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCheckout(plan.id); }}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 ${
                  plan.popular
                    ? 'glow-button !py-3'
                    : 'bg-surface-light border border-surface-border hover:border-accent/40 text-foreground'
                }`}
              >
                {loading && selectedPlan === plan.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <CreditCard size={16} />
                )}
                Ativar {plan.price}{plan.period}
              </button>

              {isSelected && (
                <motion.div
                  layoutId="selected-plan"
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary' : 'bg-accent'}`}
                >
                  <Check size={14} className="text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted">
        <Shield size={14} />
        Pagamento seguro via Stripe • 7 dias de garantia • Cancele quando quiser
      </div>
    </>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl"
      >
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <span className="text-2xl font-bold">Linkura</span>
        </Link>

        {/* Suspense required for useSearchParams in App Router */}
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        }>
          <PaymentContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
