// Bu faylı `config.js` adı ilə kopyala və öz dəyərlərini yaz.
// `config.js` .gitignore-dadır — heç vaxt repo-ya push olmur.
//
// Quraşdırma:
//   1. cp config.example.js config.js
//   2. config.js-i aç və SECRET-i öz dəyərinə dəyiş
//   3. App-i aç — cloud avtomatik aktivləşəcək
//
// Apps Script-də `const SECRET = '...'` arasındakı dəyər ilə eyni olmalıdır.

window.KASSA_CONFIG = {
  // Apps Script SECRET (kod.gs faylının başında)
  SECRET: 'BURAYA_SECRETI_YAZ',

  // İstəyə görə URL də override edilə bilər (boş qoysan default işləyir)
  URL: ''
};
