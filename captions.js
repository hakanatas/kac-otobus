/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '370 kişi, 45 kişilik otobüsler', en: '370 people, buses of 45',
      note: 'Okul gezisine 347 öğrenci ve 23 öğretmen katılacak. Otobüsler 45 kişilik. Kaç otobüs kiralamalıyız?' },
    { scene: 2, start: 10.8, end: 20.2, tr: 'Önce toplam kişi: 347 + 23 = 370', en: 'First the total: 347 + 23 = 370',
      note: 'Önce problemi anlayalım. Verilenler: 347 öğrenci, 23 öğretmen, 45 kişilik otobüs. İstenen: otobüs sayısı. Önce toplam kişiyi bulalım: 347 artı 23, 370 kişi.' },
    { scene: 2, start: 20.6, end: 27.8, tr: 'Tahmin: 10 otobüs kadar', en: 'Estimate: about 10 buses',
      note: 'Bir tahmin yapalım: yaklaşık 400 kişi, otobüsler yaklaşık 40 kişilik. 400 bölü 40, 10. Yaklaşık 10 otobüs gerekecek.' },
    { scene: 3, start: 28.6, end: 39.8, tr: '370 ÷ 45 = 8, kalan 10', en: '370 ÷ 45 = 8 remainder 10',
      note: 'Şimdi bölelim: 370 bölü 45, 8; kalan 10. Otobüsleri dolduralım: 8 otobüs tam doldu, 10 kişi açıkta kaldı.' },
    { scene: 3, start: 40.2, end: 45.8, tr: 'Açıkta kalanlar için bir otobüs daha: 9', en: 'One more bus for the rest: 9',
      note: 'Açıkta kalan 10 kişiyi de götürmeliyiz, o yüzden bir otobüs daha: 9 otobüs. Tahminimize yakın.' },
    { scene: 4, start: 46.6, end: 54.8, tr: '8 yetmez, 9 yeter', en: '8 is not enough, 9 is',
      note: 'Kontrol edelim: 8 çarpı 45, 360; 370’ten az, 8 otobüs yetmez. 9 çarpı 45, 405; 370’ten fazla, 9 otobüs yeter. Son otobüste 35 boş koltuk kalır.' },
    { scene: 4, start: 55.2, end: 61.8, tr: 'Kısa yol: 450 − 45', en: 'Shortcut: 450 − 45',
      note: 'Kısa bir yol: 10 otobüs 450 kişi alır; bir otobüs eksiği 450 eksi 45, 405. Zihinden kolayca hesaplanır.' },
    { scene: 5, start: 62.6, end: 69.8, tr: '360 kişi: 8 otobüs yeter', en: '360 people: 8 buses are enough',
      note: 'Stratejiyi başka durumlarda deneyelim. 360 kişi olsaydı: 360 bölü 45, 8, kalan 0. Bu kez bir otobüs daha gerekmez.' },
    { scene: 5, start: 70.2, end: 79.8, tr: 'Kalan 0 değilse bir araç daha', en: 'Add one more if the remainder is not 0',
      note: '250 kişi ve 30 kişilik minibüsler: 250 bölü 30, 8, kalan 10; 9 minibüs gerekir. Kural: kalan 0 değilse bölüme 1 ekleriz.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Belirle, tahmin et, böl, kontrol et', en: 'Identify, estimate, divide, check',
      note: 'Aklında kalsın: verileni ve isteneni belirle, tahmin et, işlemi yap ve kontrol et.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kalanı unutma!', en: 'Don’t forget the remainder!',
      note: 'Ve kalanı unutma: açıkta kimse kalmasın!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
