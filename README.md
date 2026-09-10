# CURVA MY

Static storefront prototype for CURVA MY: Indonesian-inspired baju kurung made for Malaysian curves.

## Preview

Open `index.html` directly, or run any static file server from this directory.

Routes:

- `/` — main brand/storefront homepage
- `/baju-kurung-plus-size/` — focused paid-ads landing page

## Before launch

1. WhatsApp CTA is currently connected to `085860070439` (`6285860070439` internationally).
2. Replace concept renders in `assets/` with final product photography as physical samples become available.
3. Confirm product pricing and the draft XXL–4XL garment measurements after sampling.
4. Sizes 5XL+ and custom measurements, payet, or models are routed to WhatsApp consultation.
5. Confirm shipping coverage/rates/ETA, payment method, production lead time, and exchange/return policy before paid traffic.
6. Replace clearly labelled social-proof placeholders only with permissioned, real customer evidence.

## Ads measurement readiness

WhatsApp links preserve common UTM parameters in the prefilled message and push a `whatsapp_click` event to `window.dataLayer`. If Meta Pixel is installed later, the same click also emits the `WhatsAppClick` custom event through `fbq`. No Pixel ID is included yet.

## Free hosting

The site is compatible with GitHub Pages and Cloudflare Pages. It has no build step and should publish from the repository root.
