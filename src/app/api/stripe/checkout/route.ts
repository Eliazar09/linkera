import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const ALLOWED_PRICES: Record<string, string> = {
  teste: process.env.STRIPE_PRICE_ID_TESTE!,
  pro: process.env.STRIPE_PRICE_ID_PRO!,
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get plan from request body
    const body = await req.json().catch(() => ({}));
    console.log('Checkout request body:', body);

    const plan = body.plan || 'pro';
    let priceId = body.priceId || ALLOWED_PRICES[plan];

    console.log('Resolved priceId:', priceId);

    if (!priceId) {
      console.error('Invalid plan or missing priceId. Body:', body);
      return NextResponse.json({ error: 'Invalid plan or priceId' }, { status: 400 });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        plan: body.plan || 'custom',
      },
    });

    console.log('Checkout session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error full detail:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
