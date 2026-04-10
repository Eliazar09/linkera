export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@supabase/ssr';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      console.warn('[Webhook] STRIPE_WEBHOOK_SECRET not set – skipping signature verification');
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Webhook] Signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.user_id;

        if (userId && session.status === 'complete') {
          const subscriptionId =
            (typeof session.subscription === 'string'
              ? session.subscription
              : (session.subscription as Stripe.Subscription | null)?.id) ||
            `payment_${session.id}`;

          const { error } = await supabase
            .from('profiles')
            .update({
              subscription_status: 'active',
              subscription_id: subscriptionId,
            })
            .eq('id', userId);

          if (error) {
            console.error('[Webhook] Error updating profile after checkout:', error);
          } else {
            console.log('[Webhook] Subscription activated for user:', userId);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        const statusMap: Record<string, string> = {
          active: 'active',
          trialing: 'active',
          past_due: 'past_due',
          canceled: 'canceled',
          unpaid: 'past_due',
          incomplete: 'inactive',
          incomplete_expired: 'canceled',
          paused: 'inactive',
        };

        const newStatus = statusMap[subscription.status] || 'inactive';

        await supabase
          .from('profiles')
          .update({ subscription_status: newStatus, subscription_id: subscription.id })
          .eq('subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from('profiles')
          .update({ subscription_status: 'canceled' })
          .eq('subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string | Stripe.Subscription | null };
        const sub = invoice.subscription;
        const subscriptionId =
          typeof sub === 'string' ? sub : (sub as Stripe.Subscription | null)?.id;

        if (subscriptionId) {
          await supabase
            .from('profiles')
            .update({ subscription_status: 'past_due' })
            .eq('subscription_id', subscriptionId);
        }
        break;
      }
    }
  } catch (error) {
    console.error('[Webhook] Handler error:', error);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
