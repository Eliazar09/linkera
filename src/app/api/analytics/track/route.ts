import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page_id, link_id, event_type, device } = body;

    if (!page_id || !event_type) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
      }
    );

    // Insert analytics event
    await supabase.from('analytics').insert({
      page_id,
      link_id: link_id || null,
      event_type,
      device: device || null,
      country: null, // Would need GeoIP service
    });

    // If it's a click, update link click count
    if (event_type === 'click' && link_id) {
      const { data: link } = await supabase
        .from('links')
        .select('clicks')
        .eq('id', link_id)
        .single();

      if (link) {
        await supabase
          .from('links')
          .update({ clicks: (link.clicks || 0) + 1 })
          .eq('id', link_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
