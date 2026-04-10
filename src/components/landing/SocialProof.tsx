'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'TikTok', emoji: '🎵' },
  { name: 'Instagram', emoji: '📸' },
  { name: 'YouTube', emoji: '▶️' },
  { name: 'Shopify', emoji: '🛒' },
  { name: 'WhatsApp', emoji: '💬' },
  { name: 'Spotify', emoji: '🎧' },
  { name: 'LinkedIn', emoji: '💼' },
  { name: 'Twitter/X', emoji: '✖️' },
];

export default function SocialProof() {
  return (
    <section className="relative py-14 border-y border-surface-border/40 overflow-hidden">
      <div className="absolute inset-0 bg-surface/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted uppercase tracking-widest mb-8 font-medium"
        >
          Conecta com todas as suas plataformas favoritas
        </motion.p>

        {/* Scrolling logos row */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max"
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface/60 border border-surface-border/60 text-sm text-muted/70 font-medium whitespace-nowrap flex-shrink-0"
              >
                <span className="text-base">{logo.emoji}</span>
                {logo.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
