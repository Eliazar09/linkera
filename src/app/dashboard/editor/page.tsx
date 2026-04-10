'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Page, Link as LinkType } from '@/lib/types';
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  Check,
  Globe,
  Type,
  FileText,
  Palette,
  Link2,
} from 'lucide-react';

const defaultThemes = [
  { slug: 'midnight', name: 'Midnight', bg: '#0a0a0f', text: '#ffffff', accent: '#8b5cf6' },
  { slug: 'ocean', name: 'Ocean', bg: '#0c1222', text: '#e2e8f0', accent: '#06b6d4' },
  { slug: 'forest', name: 'Forest', bg: '#0a1a0f', text: '#d1fae5', accent: '#10b981' },
  { slug: 'sunset', name: 'Sunset', bg: '#1a0a0f', text: '#fecdd3', accent: '#f43f5e' },
  { slug: 'minimal', name: 'Minimal', bg: '#ffffff', text: '#1a1a2e', accent: '#8b5cf6' },
  { slug: 'neon', name: 'Neon', bg: '#0a0a0f', text: '#f0f0f0', accent: '#22d3ee' },
];

export default function EditorPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState<Page | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('midnight');
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: pageData } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (pageData) {
        setPage(pageData);
        setUsername(pageData.username || '');
        setTitle(pageData.title || '');
        setBio(pageData.bio || '');
        setTheme(pageData.theme || 'midnight');
        setIsPublished(pageData.is_published);

        // Fetch links
        const { data: linksData } = await supabase
          .from('links')
          .select('*')
          .eq('page_id', pageData.id)
          .order('position');

        if (linksData) setLinks(linksData);
      } else {
        setIsNew(true);
        // Set default username from email
        setUsername(user.email?.split('@')[0]?.replace(/[^a-z0-9]/g, '') || '');
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const addLink = () => {
    const newLink: LinkType = {
      id: `temp-${Date.now()}`,
      page_id: page?.id || '',
      title: '',
      url: '',
      icon: null,
      position: links.length,
      clicks: 0,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks.map((l, i) => ({ ...l, position: i })));
  };

  const updateLink = (index: number, field: keyof LinkType, value: string) => {
    const newLinks = [...links];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newLinks[index] as any)[field] = value;
    setLinks(newLinks);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      let pageId = page?.id;

      if (isNew) {
        // Create new page
        const { data: newPage, error } = await supabase
          .from('pages')
          .insert({
            user_id: user.id,
            username,
            title,
            bio,
            theme,
            is_published: isPublished,
          })
          .select()
          .single();

        if (error) throw error;
        pageId = newPage.id;
        setPage(newPage);
        setIsNew(false);
      } else {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update({
            username,
            title,
            bio,
            theme,
            is_published: isPublished,
          })
          .eq('id', pageId);

        if (error) throw error;
      }

      // Handle links
      if (pageId) {
        // Delete existing links
        await supabase.from('links').delete().eq('page_id', pageId);

        // Insert new links
        if (links.length > 0) {
          const linksToInsert = links
            .filter((l) => l.title && l.url)
            .map((l, i) => ({
              page_id: pageId,
              title: l.title,
              url: l.url,
              icon: l.icon,
              position: i,
              is_active: true,
            }));

          if (linksToInsert.length > 0) {
            await supabase.from('links').insert(linksToInsert);
          }
        }
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const currentTheme = defaultThemes.find((t) => t.slug === theme) || defaultThemes[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Editor</h1>
          <p className="text-sm text-muted mt-1">
            {isNew ? 'Crie sua página' : 'Edite sua página'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {page && (
            <a
              href={`/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border text-sm hover:border-primary/30 transition-all"
            >
              <ExternalLink size={14} />
              Ver Página
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="glow-button !py-2.5 !px-5 flex items-center gap-2 text-sm"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <Check size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Editor Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-primary" />
              <h2 className="font-semibold">Username</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">linkura.app/</span>
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
                }
                placeholder="seuusuario"
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Title & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Type size={16} className="text-accent" />
              <h2 className="font-semibold">Título & Bio</h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Seu nome ou marca"
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Uma breve descrição sobre você..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link2 size={16} className="text-primary" />
                <h2 className="font-semibold">Links</h2>
              </div>
              <button
                onClick={addLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                <Plus size={14} />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {links.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted">
                  Nenhum link adicionado. Clique em &quot;Adicionar&quot; para começar.
                </div>
              ) : (
                links.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-surface-light border border-surface-border"
                  >
                    <GripVertical size={16} className="text-muted mt-2.5 cursor-grab" />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(i, 'title', e.target.value)}
                        placeholder="Título do link"
                        className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(i, 'url', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border text-sm focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <button
                      onClick={() => removeLink(i)}
                      className="p-2 text-muted hover:text-error transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Palette size={16} className="text-accent" />
              <h2 className="font-semibold">Tema</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {defaultThemes.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setTheme(t.slug)}
                  className={`relative p-3 rounded-xl border-2 transition-all ${
                    theme === t.slug
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-surface-border hover:border-surface-border/80'
                  }`}
                  style={{ backgroundColor: t.bg }}
                >
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: t.accent }}
                  />
                  <p className="text-xs text-center" style={{ color: t.text }}>
                    {t.name}
                  </p>
                  {theme === t.slug && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Publish Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isPublished ? (
                  <Eye size={18} className="text-success" />
                ) : (
                  <EyeOff size={18} className="text-muted" />
                )}
                <div>
                  <p className="font-semibold text-sm">
                    {isPublished ? 'Publicada' : 'Não publicada'}
                  </p>
                  <p className="text-xs text-muted">
                    {isPublished
                      ? 'Sua página está visível para todos'
                      : 'Sua página está oculta'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPublished(!isPublished)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isPublished ? 'bg-success' : 'bg-surface-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    isPublished ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <h3 className="text-sm font-semibold text-muted mb-4">Preview</h3>
            <div
              className="rounded-2xl p-6 min-h-[500px] border border-surface-border transition-colors duration-300"
              style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
            >
              <div className="flex flex-col items-center text-center pt-8">
                <div
                  className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}88)`,
                    color: '#fff',
                  }}
                >
                  {title?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <h3 className="text-lg font-semibold" style={{ color: currentTheme.text }}>
                  {title || 'Seu Nome'}
                </h3>
                {bio && (
                  <p className="text-sm mt-1 opacity-70" style={{ color: currentTheme.text }}>
                    {bio}
                  </p>
                )}

                <div className="w-full mt-6 space-y-3">
                  {links
                    .filter((l) => l.title)
                    .map((link, i) => (
                      <div
                        key={i}
                        className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{
                          backgroundColor: `${currentTheme.accent}15`,
                          border: `1px solid ${currentTheme.accent}30`,
                          color: currentTheme.text,
                        }}
                      >
                        {link.title}
                      </div>
                    ))}
                </div>

                {links.filter((l) => l.title).length === 0 && (
                  <div className="mt-6 space-y-3 w-full">
                    {['Link 1', 'Link 2', 'Link 3'].map((placeholder, i) => (
                      <div
                        key={i}
                        className="w-full py-3 px-4 rounded-xl text-sm opacity-30"
                        style={{
                          backgroundColor: `${currentTheme.accent}10`,
                          border: `1px solid ${currentTheme.accent}20`,
                        }}
                      >
                        {placeholder}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
