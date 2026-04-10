import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@supabase/ssr';
import Stripe from 'stripe';

async function verifyAndActivate(sessionId: string): Promise<{ ok: boolean }> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== 'complete') {
      return { ok: false };
    }

    const userId = session.client_reference_id || session.metadata?.user_id;
    if (!userId) return { ok: false };

    const subscriptionRaw = session.subscription;
    const subscriptionId =
      typeof subscriptionRaw === 'string'
        ? subscriptionRaw
        : (subscriptionRaw as Stripe.Subscription | null)?.id ?? `payment_${session.id}`;

    // Use service-role key to bypass RLS
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: 'active', subscription_id: subscriptionId })
      .eq('id', userId);

    if (error) {
      console.error('[PaymentSuccess] Supabase update error:', error);
      return { ok: false };
    }

    console.log('[PaymentSuccess] Subscription activated for user:', userId);
    return { ok: true };
  } catch (err) {
    console.error('[PaymentSuccess] Error:', err);
    return { ok: false };
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect('/payment');
  }

  const { ok } = await verifyAndActivate(session_id);

  if (ok) {
    redirect('/dashboard?welcome=true');
  }

  redirect('/payment?error=verification_failed');
}
