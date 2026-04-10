'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
} from 'lucide-react';

export default function DashboardPage() {
  const supabase = createClient();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ views: 0, clicks: 0, ctr: '0%' });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's page
      const { data: pageData } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (pageData) {
        setPage(pageData);

        // Get analytics
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Bem-vindo ao Linkura
        </h1>
        <p className="text-muted">
          {page ? 'Gerencie sua página e acompanhe seus resultados' : 'Crie sua primeira página'}
        </p>
      </motion.div>

      {page ? (
        <>
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Visualizações', value: stats.views, icon: Eye, color: 'text-primary' },
              { label: 'Cliques', value: stats.clicks, icon: MousePointerClick, color: 'text-accent' },
              { label: 'Taxa de Clique', value: stats.ctr, icon: Percent, color: 'text-success' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={20} className={stat.color} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
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
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="bg-surface-light rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center">
                  <span className="text-xl">
                    {page.title?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <h3 className="font-semibold">{page.title}</h3>
                {page.bio && <p className="text-sm text-muted mt-1">{page.bio}</p>}
                <p className="text-xs text-primary mt-2">
                  linkura.app/{page.username}
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Ações</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/editor"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-border hover:border-primary/30 transition-all group"
                >
                  <Pencil size={18} className="text-primary" />
                  <span className="font-medium text-sm">Editar Página</span>
                  <ExternalLink size={14} className="ml-auto text-muted group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href={`/${page.username}`}
                  target="_blank"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-border hover:border-accent/30 transition-all group"
                >
                  <Eye size={18} className="text-accent" />
                  <span className="font-medium text-sm">Ver Página Pública</span>
                  <ExternalLink size={14} className="ml-auto text-muted group-hover:text-accent transition-colors" />
                </Link>

                <button className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all w-full group">
                  <Sparkles size={18} className="text-primary" />
                  <span className="font-medium text-sm">Gerar com IA</span>
                  <span className="ml-auto text-xs text-muted">Em breve</span>
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
          className="glass-card p-12 text-center max-w-lg mx-auto"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
            <Plus size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-3">
            Você ainda não tem uma página
          </h2>
          <p className="text-sm text-muted mb-8">
            Crie sua página agora e comece a compartilhar seus links com o mundo.
          </p>
          <Link
            href="/dashboard/editor"
            className="glow-button inline-flex items-center gap-2"
          >
            <Plus size={18} />
            Criar Minha Página
          </Link>
        </motion.div>
      )}
    </div>
  );
}
