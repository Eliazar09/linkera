'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Rodrigues',
    role: 'Influenciadora Digital',
    country: '🇧🇷',
    avatar: 'A',
    color: '#8b5cf6',
    rating: 5,
    text: 'Com o Linkura consegui triplicar os cliques nos meus links em apenas uma semana. A IA gerou minha página inteira em segundos!',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Empreendedor',
    country: '🇲🇽',
    avatar: 'C',
    color: '#06b6d4',
    rating: 5,
    text: 'La mejor herramienta para LATAM. Configuré mi página en 2 minutos y ya tengo cientos de visitas. ¡Increíble!',
  },
  {
    name: 'Julia Santos',
    role: 'Designer Freelancer',
    country: '🇧🇷',
    avatar: 'J',
    color: '#f43f5e',
    rating: 5,
    text: 'A análise de dados é incrível. Consigo ver exatamente de onde vêm meus visitantes e quais links performam melhor.',
  },
  {
    name: 'Diego Varela',
    role: 'Músico',
    country: '🇦🇷',
    avatar: 'D',
    color: '#10b981',
    rating: 5,
    text: 'Substituí o Linktree pelo Linkura e não me arrependo. Visual muito mais bonito e muito mais barato para o mercado latino.',
  },
  {
    name: 'Fernanda Lima',
    role: 'Coach de Negócios',
    country: '🇧🇷',
    avatar: 'F',
    color: '#f59e0b',
    rating: 5,
    text: 'Recomendo para todos os meus clientes. Setup ultra rápido, visual profissional e o suporte responde rapidinho.',
  },
  {
    name: 'Roberto Sánchez',
    role: 'Fotógrafo',
    country: '🇨🇴',
    avatar: 'R',
    color: '#8b5cf6',
    rating: 5,
    text: 'Mis clientes me preguntan cómo tengo una página tan profesional. El precio de R$9.99 es una ganga comparado con alternativas.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/4 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose/10 border border-rose/20 text-rose text-sm mb-6">
            ❤️ Amado por criadores
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Quem já usa,{' '}
            <span className="gradient-text">ama o resultado</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Mais de 2.400 criadores de conteúdo e empreendedores da LATAM já confiam no Linkura.
          </p>

          {/* Stars row */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-muted">4.9/5 de +200 avaliações</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-6 relative overflow-hidden group"
            >
              {/* Subtle color glow on hover */}
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: t.color }}
              />

              {/* Quote icon */}
              <Quote size={20} className="text-primary/30 mb-4" />

              {/* Text */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-5">{t.text}</p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1.5">
                    {t.name}
                    <span>{t.country}</span>
                  </div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
