import Stripe from 'stripe';

// Lazy initialization — avoids Stripe throwing during Next.js build
// when STRIPE_SECRET_KEY is not yet available in the build environment.
let _stripe: Stripe | null = null;

function getStripeInstance(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(key, {
      apiVersion: '2026-03-25.dahlia',
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getStripeInstance(), prop);
  },
  apply(_target, thisArg, args) {
    return Reflect.apply(getStripeInstance() as unknown as (...a: unknown[]) => unknown, thisArg, args);
  },
});
