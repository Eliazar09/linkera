import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get profile to find Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_id')
      .eq('id', user.id)
      .single();

    if (!profile?.subscription_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 400 });
    }

    // Get subscription to find customer
    const subscription = await stripe.subscriptions.retrieve(profile.subscription_id);

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customer as string,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: 'Error creating portal session' }, { status: 500 });
  }
}
