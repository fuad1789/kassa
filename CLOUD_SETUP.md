# Cloud Sinxron Quraşdırması — Google Sheets

5-7 dəqiqə davam edir. Tamamilə pulsuz. Data sənin Google hesabındadır.

---

## 1. Yeni Spreadsheet yarat

1. https://sheets.google.com aç
2. **Boş Spreadsheet** yarat
3. Adına "Kassa Backup" yaz (sol yuxarı)

## 2. Apps Script aç

Üst menyu: **Extensions → Apps Script**

Yeni tab açılır. İçindəki default kod var (`function myFunction()...`) — **hamısını sil**.

## 3. Kassa kodunu yapışdır

Repo-dakı `apps-script.gs` faylını aç → **bütün məzmunu kopyala** → Apps Script editorə yapışdır.

## 4. SECRET təyin et

Kodun yuxarısında bu sətri tap:

```js
const SECRET = 'CHANGE_ME_BURAYA_TESADUFI_SOZ_YAZ';
```

`'...'` arasını öz təsadüfi şifrənlə əvəz et. Məsələn:

```js
const SECRET = 'fuad_kassa_2026_kjsdh32';
```

> Bu sənin "açarın"dır. Onu **Notes-də və ya başqa yerdə** də yadda saxla — itirsən, məlumat yenidən əldə olunmaz.

## 5. Yadda saxla

Disk ikonuna (💾 Save) bas. Layihə adı soruşulsa "Kassa Backend" yaz.

## 6. Deploy et (yayımla)

1. Yuxarı sağda **Deploy → New deployment**
2. ⚙️ (gear) ikonu → **Web app** seç
3. Doldur:
   - **Description:** `Kassa v1`
   - **Execute as:** `Me (öz hesabın)`
   - **Who has access:** **Anyone** ⚠️
     > Narahat olma — açar (SECRET) olmadan heç kim heç nə edə bilməz. URL ictimai görsənsə də, secret yoxdursa → `forbidden` qaytarır.
4. **Deploy** düyməsinə bas
5. Google icazə istəyəcək:
   - **Authorize access** → öz hesabını seç
   - "Google hasn't verified" görsən → **Advanced** → **Go to Kassa Backend (unsafe)**
   - (Öz yazdığın kod olduğu üçün təhlükəsizdir)
   - **Allow**
6. Açılan dialoqda **Web app URL**-i kopyala (məs: `https://script.google.com/macros/s/.../exec`)

## 7. Kassa app-də daxil et

1. Kassa-nı aç
2. Sağ yuxarı **⋯** (settings) → **Cloud sinxron** → **Quraşdır**
3. **URL**: az əvvəl kopyaladığın
4. **Açar**: yuxarıda təyin etdiyin SECRET
5. **Test et** → "Bağlandı ✓" görsənsə hazırdır
6. **Yadda saxla**

İlk dəfə bağladıqda 2 düymə görəcəksən:
- **Buluda göndər** — lokal datanı Sheet-ə yaz
- **Buluddan al** — Sheet-dəki datanı buraya yüklə

Hansını seçdiyindən asılı olaraq bir-birini əvəz edəcək. Əgər lokalda data varsa, **Buluda göndər**.

---

## 📱 Telefon dəyişəndə

1. Yeni telefonda Kassa-nı aç (eyni URL/PWA)
2. Settings → Cloud sinxron → Quraşdır
3. **Eyni URL və SECRET**-i daxil et
4. **Buluddan al** → bütün tarixçə qayıtdı

---

## 📊 Datanı görmək / redaktə etmək

İstənilən vaxt Sheet-i aç:
- **Transactions** vərəqi: bütün əməliyyatlar (sıralanmış, filtrlənə bilən)
- **Settings** vərəqi: ad, başlanğıc balans, son sinxron vaxtı

Hətta birbaşa Sheet-də redaktə edə bilərsən. Sonra Kassa-da **Buluddan al** → cihazda da yenilənəcək.

---

## ♻️ Apps Script kodunu yenilədiyin halda

Əgər `apps-script.gs`-də nə isə dəyişdirsən:

1. Apps Script editor → **Deploy → Manage deployments**
2. ⚙️ ikon (sağda) → **Edit**
3. **Version:** New version → **Deploy**

Yoxsa köhnə kod işləməyə davam edir.

---

## 🔒 Təhlükəsizlik haqqında

- **URL ictimaidir** — Google web app-larının xüsusiyyətidir. Amma SECRET olmadan giriş olmur.
- **SECRET** mütləq mürəkkəb olsun (ən az 12 simvol, müxtəlif xarakterlər)
- **Sheets versiya tarixçəsi** — File → Version history → See version history. Səhvən hər şeyi silsən, geri qaytara bilərsən
- Google öz tərəfindən datanı silmir (öz hesabındakı sənəddir)

---

## 🆘 Problem olarsa

**"forbidden" xətası:** SECRET düz daxil edilməyib. Apps Script-dəki ilə eyni olmalıdır.

**"Failed to fetch" / network xətası:** Web App URL düzgün deyil. `/exec` ilə bitməlidir.

**Sheet-də data dublikat olur:** Hər `saveState` əvvəlki sətirləri silir, dublikat olmamalıdır. Olubsa: Sheet-i manual təmizlə (Transactions vərəqində 2-ci və sonrakı sətirləri sil), sonra Kassa-da **Buluda göndər**.

**Apps Script kodu dəyişəndən sonra app işləmir:** Mütləq **Manage deployments → Edit → New version → Deploy** etməlisən.
