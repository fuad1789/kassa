# Kassa — Şəxsi Maliyyə PWA

Şəxsi gəlir, xərc, borc və gözlənilən pul idarəçiliyi üçün PWA tətbiq.

## İşə salmaq

PWA-nın düzgün işləməsi üçün (service worker, install) sadə HTTP server lazımdır:

```bash
# Python varsa
python -m http.server 8080

# Node varsa
npx serve .

# PHP varsa
php -S localhost:8080
```

Sonra brauzerdə aç: `http://localhost:8080`

### Telefondan istifadə (eyni Wi-Fi şəbəkəsində)

1. Kompüterin lokal IP-sini tap (məs: `192.168.1.10`)
2. Telefondan `http://192.168.1.10:8080` aç
3. Chrome / Safari menyusundan **"Add to Home Screen"** seç
4. Tətbiq kimi açılacaq, oflayn da işləyəcək

## Funksionallıq

- **Cari balans** — başlanğıc balans + gəlirlər − xərclər
- **Gündəlik xərc / gəlir** statistikası
- **Gözlənilən gəlirlər** — hələ gəlməyib, balansa daxil olmur
- **Borclarım** — ödənməmiş borclar, balansa təsir etmir
- **"Aldım" / "Ödədim"** — bir kliklə gözlənilən → gəlirə, borc → xərcə çevrilir
- **Filtrlər** — növə görə (xərc/gəlir/borc/gözlənilən)
- **İxrac / İdxal** — JSON şəklində məlumatları köçür
- **Tam oflayn** — bütün məlumat brauzerdə (localStorage)

## Texniki

- Vanilla HTML/CSS/JS — heç bir framework, build prosesi yox
- LocalStorage — sadə, etibarlı
- Service Worker — oflayn dəstəyi
- Manifest — Add to Home Screen

## Faylar

```
index.html         — bütün UI + məntiq
manifest.json      — PWA metadata
sw.js              — service worker
icon.svg           — tətbiq ikonu
icon-maskable.svg  — Android maskable ikon
```

## Məlumat strukturu (localStorage)

```json
{
  "name": "Fuad",
  "initialBalance": 1000,
  "transactions": [
    {
      "id": "tx_...",
      "type": "expense | income | debt | expected",
      "amount": 25.50,
      "note": "Market",
      "category": "Market",
      "date": "2026-05-02T10:30:00.000Z",
      "resolved": false
    }
  ]
}
```
