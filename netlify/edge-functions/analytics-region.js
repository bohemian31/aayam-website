// Decide before GTM loads. Never cache this response across visitors.
const CONSENT_COUNTRIES = new Set([
  // European Economic Area: EU 27 plus Iceland, Liechtenstein, Norway.
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
  'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
  'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
  // United Kingdom and Switzerland.
  'GB', 'CH'
]);

export function analyticsMode(countryCode) {
  const country = typeof countryCode === 'string' ? countryCode.toUpperCase() : '';
  if (!/^[A-Z]{2}$/.test(country) || CONSENT_COUNTRIES.has(country)) return 'choice';
  return 'automatic';
}

export default function handler(_request, context) {
  const mode = analyticsMode(context.geo?.country?.code);
  return new Response(JSON.stringify({ mode }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

export const config = { path: '/analytics-region' };
