'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Page, Link as LinkType } from '@/lib/types';

interface PublicPageClientProps {
  page: Page;
  links: LinkType[];
  theme: { bg: string; text: string; accent: string };
}

export default function PublicPageClient({ page, links, theme }: PublicPageClientProps) {
  // Track page view
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_id: page.id,
            event_type: 'view',
            device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          }),
        });
      } catch {
        // Silently fail
      }
    };
    trackView();
  }, [page.id]);

  const handleLinkClick = async (linkId: string, url: string) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: page.id,
          link_id: linkId,
          event_type: 'click',
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      });
    } catch {
      // Silently fail
    }
    window.open(url, '_blank');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Background glow */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ backgroundColor: theme.accent }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-auto text-center py-12"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}88)`,
          }}
        >
          {page.avatar_url ? (
            <img
              src={page.avatar_url}
              alt={page.title}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            page.title?.charAt(0)?.toUpperCase() || '?'
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
          style={{ color: theme.text }}
        >
          {page.title}
        </motion.h1>

        {/* Bio */}
        {page.bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm opacity-70 mb-8 max-w-xs mx-auto"
            style={{ color: theme.text }}
          >
            {page.bio}
          </motion.p>
        )}

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => handleLinkClick(link.id, link.url)}
              className="w-full py-4 px-6 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: `${theme.accent}12`,
                border: `1px solid ${theme.accent}30`,
                color: theme.text,
              }}
              whileHover={{
                backgroundColor: `${theme.accent}25`,
                borderColor: `${theme.accent}50`,
              }}
            >
              {link.title}
            </motion.button>
          ))}
        </div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <a
            href="https://linkura.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs opacity-40 hover:opacity-70 transition-opacity"
            style={{ color: theme.text }}
          >
            <span className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-[8px] text-white font-bold">
              L
            </span>
            Feito com Linkura
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
