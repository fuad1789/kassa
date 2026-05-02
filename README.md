# Kassa — Şəxsi Maliyyə PWA

Şəxsi gəlir, xərc, borc və gözlənilən pul idarəçiliyi üçün PWA tətbiq.

Backend: **Supabase** (auth + Postgres + realtime). Email magic code ilə daxil olursan, məlumatlar avtomatik buluda sinxronlaşır.

## İstifadə

1. https://kassa-psi.vercel.app aç
2. Email-ini yaz → 6 rəqəmli kod gəlir → daxil ol
3. İstifadə et — hər dəyişiklik 1.5 saniyədə avtomatik buluda yazılır
4. Yeni cihazda eyni email ilə daxil ol — bütün data orada

## Funksionallıq

- Cari balans, gündəlik gəlir/xərc statistikası
- Gözlənilən gəlirlər və borclar (balansa təsir etmir)
- "Aldım" / "Ödədim" — bir kliklə gözlənilən→gəlir, borc→xərc
- 30 günlük balans sparkline
- 12 həftəlik xərc heatmap-i
- Filtrlər (xərc/gəlir/borc/gözlənilən)
- JSON ixrac/idxal
- Real-time multi-cihaz sinxron (Supabase realtime)
- Tam oflayn dəstək (lokal kəş + sonrakı sinxron)
- Add to Home Screen (PWA)

## Texniki

- **Frontend:** Vanilla HTML/CSS/JS, framework yox
- **Backend:** Supabase (Postgres + Auth + Realtime)
- **Hosting:** Vercel
- **Storage:** localStorage + Supabase `public.kassa_state`
- **Auth:** Email OTP (magic code)

## Faylar

```
index.html         — bütün UI + məntiq
manifest.json      — PWA metadata
sw.js              — service worker
icon.svg           — tətbiq ikonu
icon-maskable.svg  — Android maskable ikon
vercel.json        — Vercel deploy konfiqurasiyası
.vercelignore      — deploy-da xaric ediləcək fayllar
```

## Deploy

```bash
cd C:\Users\FUAD\Desktop\kassa
vercel --prod
```

## Database schema

```sql
public.kassa_state (
  user_id uuid PRIMARY KEY,         -- auth.users(id)
  name text,
  initial_balance numeric,
  transactions jsonb,
  updated_at timestamptz,
  created_at timestamptz
)
```

RLS aktiv: hər istifadəçi yalnız öz sətrinə çatır.
