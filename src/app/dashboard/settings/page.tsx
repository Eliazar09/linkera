'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  CreditCard,
  Shield,
  Loader2,
  Check,
  ExternalLink,
} from 'lucide-react';

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    subscription_status: '',
    subscription_id: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile({
          name: profileData.name || user.user_metadata?.name || '',
          email: profileData.email || user.email || '',
          subscription_status: profileData.subscription_status || 'inactive',
          subscription_id: profileData.subscription_id || '',
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [supabase]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('profiles')
      .update({ name: profile.name })
      .eq('id', user.id);

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleManageBilling = async () => {
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Portal error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted text-sm">Gerencie sua conta e assinatura</p>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <User size={18} className="text-primary" />
          <h2 className="font-semibold">Perfil</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1.5">Nome</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-surface-border text-sm text-muted cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="glow-button !py-2.5 !px-5 flex items-center gap-2 text-sm"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <Check size={16} />
            ) : null}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar Alterações'}
          </button>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <CreditCard size={18} className="text-accent" />
          <h2 className="font-semibold">Assinatura</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-light border border-surface-border mb-4">
          <div>
            <p className="font-medium text-sm">Linkura Pro</p>
            <p className="text-xs text-muted mt-1">R$9,99/mês</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              profile.subscription_status === 'active'
                ? 'bg-success/20 text-success'
                : 'bg-error/20 text-error'
            }`}
          >
            {profile.subscription_status === 'active' ? 'Ativa' : 'Inativa'}
          </span>
        </div>

        <button
          onClick={handleManageBilling}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border text-sm hover:border-primary/30 transition-all"
        >
          <ExternalLink size={14} />
          Gerenciar Cobrança
        </button>

        <div className="flex items-center gap-2 mt-4 text-xs text-muted">
          <Shield size={12} />
          Pagamento processado de forma segura via Stripe
        </div>
      </motion.div>
    </div>
  );
}
