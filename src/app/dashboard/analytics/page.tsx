'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Loader2,
} from 'lucide-react';

export default function AnalyticsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    ctr: '0%',
    topLinks: [] as { title: string; clicks: number }[],
    recentEvents: [] as { event_type: string; device: string | null; created_at: string }[],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: page } = await supabase
        .from('pages')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!page) {
        setLoading(false);
        return;
      }

      // Get views count
      const { count: viewCount } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .eq('page_id', page.id)
        .eq('event_type', 'view');

      // Get clicks count
      const { count: clickCount } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .eq('page_id', page.id)
        .eq('event_type', 'click');

      // Get links with clicks
      const { data: linksData } = await supabase
        .from('links')
        .select('title, clicks')
        .eq('page_id', page.id)
        .order('clicks', { ascending: false })
        .limit(5);

      // Get recent events
      const { data: recentData } = await supabase
        .from('analytics')
        .select('event_type, device, created_at')
        .eq('page_id', page.id)
        .order('created_at', { ascending: false })
        .limit(10);

      const views = viewCount || 0;
      const clicks = clickCount || 0;
      const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) + '%' : '0%';

      setStats({
        totalViews: views,
        totalClicks: clicks,
        ctr,
        topLinks: linksData || [],
        recentEvents: recentData || [],
      });

      setLoading(false);
    };

    fetchAnalytics();
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted text-sm">Acompanhe o desempenho da sua página</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total de Visualizações', value: stats.totalViews, icon: Eye, color: 'from-primary/20 to-primary/5', iconColor: 'text-primary' },
          { label: 'Total de Cliques', value: stats.totalClicks, icon: MousePointerClick, color: 'from-accent/20 to-accent/5', iconColor: 'text-accent' },
          { label: 'Taxa de Conversão', value: stats.ctr, icon: TrendingUp, color: 'from-success/20 to-success/5', iconColor: 'text-success' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Links Mais Clicados</h2>
          {stats.topLinks.length > 0 ? (
            <div className="space-y-3">
              {stats.topLinks.map((link, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-light"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted w-5">#{i + 1}</span>
                    <span className="text-sm font-medium">{link.title}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{link.clicks}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted text-center py-8">
              Nenhum dado de cliques ainda
            </p>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
          {stats.recentEvents.length > 0 ? (
            <div className="space-y-2">
              {stats.recentEvents.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-light"
                >
                  <div className="flex items-center gap-3">
                    {event.event_type === 'view' ? (
                      <Eye size={14} className="text-primary" />
                    ) : (
                      <MousePointerClick size={14} className="text-accent" />
                    )}
                    <span className="text-sm">
                      {event.event_type === 'view' ? 'Visualização' : 'Clique'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {event.device === 'mobile' ? (
                      <Smartphone size={12} className="text-muted" />
                    ) : (
                      <Monitor size={12} className="text-muted" />
                    )}
                    <span className="text-xs text-muted">
                      {new Date(event.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted text-center py-8">
              Nenhuma atividade registrada ainda
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
