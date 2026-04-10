'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Page } from '@/lib/types';
import {
  Eye,
  MousePointerClick,
  Percent,
  Plus,
  Pencil,
  ExternalLink,
  Sparkles,
  Loader2,
  X,
  PartyPopper,
  Copy,
  Check,
} from 'lucide-react';

export default function DashboardPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ views: 0, clicks: 0, ctr: '0%' });
  const [showWelcome, setShowWelcome] = useState(isWelcome);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: pageData } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (pageData) {
        setPage(pageData);

        const { count: viewCount } = await supabase
          .from('analytics')
          .select('*', { count: 'exact', head: true })
          .eq('page_id', pageData.id)
          .eq('event_type', 'view');

        const { count: clickCount } = await supabase
          .from('analytics')
          .select('*', { count: 'exact', head: true })
          .eq('page_id', pageData.id)
          .eq('event_type', 'click');

        const views = viewCount || 0;
        const clicks = clickCount || 0;
        const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) + '%' : '0%';
        setStats({ views, clicks, ctr });
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const copyLink = async () => {
    if (!page) return;
    await navigator.clipboard.writeText(`https://linkura.app/${page.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome banner */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/15 to-primary/10 border border-primary/30 p-5"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient" />

            <div className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <PartyPopper size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-1">🎉 Pagamento confirmado! Bem-vindo ao Linkura!</h3>
                <p className="text-sm text-muted">
                  Sua conta está ativa. Crie sua página agora e comece a compartilhar seus links com o mundo.
                </p>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-light transition-all flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {page ? `Bem-vindo de volta` : 'Bem-vindo ao Linkura'}
        </h1>
        <p className="text-muted">
          {page
            ? 'Gerencie sua página e acompanhe seus resultados'
            : 'Crie sua primeira página e comece a crescer'}
        </p>
      </motion.div>

      {page ? (
        <>
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Visualizações', value: stats.views, icon: Eye, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
              { label: 'Cliques', value: stats.clicks, icon: MousePointerClick, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
              { label: 'Taxa de Clique', value: stats.ctr, icon: Percent, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 relative overflow-hidden group hover:border-primary/20 transition-colors"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${stat.bg} blur-[40px] opacity-50`} />
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mb-4`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Page Preview + Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Sua Página</h2>
                {page.is_published ? (
                  <span className="flex items-center gap-1.5 text-xs text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Publicada
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-muted bg-surface-light border border-surface-border px-2.5 py-1 rounded-full">
                    Não publicada
                  </span>
                )}
              </div>

              <div className="bg-surface-light rounded-xl p-6 text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white">
                  {page.title?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <h3 className="font-semibold">{page.title}</h3>
                {page.bio && <p className="text-xs text-muted mt-1 max-w-xs mx-auto">{page.bio}</p>}
              </div>

              {/* Copy link */}
              <button
                onClick={copyLink}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface border border-surface-border hover:border-primary/30 transition-all text-sm group"
              >
                <span className="text-muted text-xs truncate">linkura.app/{page.username}</span>
                {copied ? (
                  <Check size={14} className="text-success flex-shrink-0" />
                ) : (
                  <Copy size={14} className="text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                )}
              </button>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-base font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/editor"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Pencil size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Editar Página</p>
                    <p className="text-xs text-muted">Links, bio, tema e mais</p>
                  </div>
                  <ExternalLink size={14} className="text-muted group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href={`/${page.username}`}
                  target="_blank"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-border hover:border-accent/30 hover:bg-accent/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Eye size={16} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ver Página Pública</p>
                    <p className="text-xs text-muted">Como seus visitantes veem</p>
                  </div>
                  <ExternalLink size={14} className="text-muted group-hover:text-accent transition-colors" />
                </Link>

                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-border hover:border-success/30 hover:bg-success/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                    <Percent size={16} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ver Analytics</p>
                    <p className="text-xs text-muted">Visualizações e cliques</p>
                  </div>
                  <ExternalLink size={14} className="text-muted group-hover:text-success transition-colors" />
                </Link>

                <button
                  disabled
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15 w-full opacity-60 cursor-not-allowed"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Gerar com IA</p>
                    <p className="text-xs text-muted">Regenerar página com IA</p>
                  </div>
                  <span className="text-xs text-primary/60 bg-primary/10 px-2 py-0.5 rounded-full">Em breve</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-lg mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Plus size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Você ainda não tem uma página</h2>
            <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
              Crie sua página de links agora e comece a compartilhar tudo em um só lugar.
            </p>
            <Link href="/dashboard/editor" className="glow-button inline-flex items-center gap-2">
              <Plus size={18} />
              Criar Minha Página
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
