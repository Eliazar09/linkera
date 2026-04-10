import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import PublicPageClient from './PublicPageClient';
import type { Metadata } from 'next';

const themes: Record<string, { bg: string; text: string; accent: string }> = {
  midnight: { bg: '#0a0a0f', text: '#ffffff', accent: '#8b5cf6' },
  ocean: { bg: '#0c1222', text: '#e2e8f0', accent: '#06b6d4' },
  forest: { bg: '#0a1a0f', text: '#d1fae5', accent: '#10b981' },
  sunset: { bg: '#1a0a0f', text: '#fecdd3', accent: '#f43f5e' },
  minimal: { bg: '#ffffff', text: '#1a1a2e', accent: '#8b5cf6' },
  neon: { bg: '#0a0a0f', text: '#f0f0f0', accent: '#22d3ee' },
};

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );
}

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await getSupabase();

  const { data: page } = await supabase
    .from('pages')
    .select('title, bio')
    .eq('username', username)
    .eq('is_published', true)
    .single();

  if (!page) {
    return { title: 'Página não encontrada' };
  }

  return {
    title: `${page.title} | Linkura`,
    description: page.bio || `Página de ${page.title} no Linkura`,
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await getSupabase();

  // Get page
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('username', username)
    .eq('is_published', true)
    .single();

  if (!page) {
    notFound();
  }

  // Get links
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('page_id', page.id)
    .eq('is_active', true)
    .order('position');

  const theme = themes[page.theme] || themes.midnight;

  return (
    <PublicPageClient
      page={page}
      links={links || []}
      theme={theme}
    />
  );
}
