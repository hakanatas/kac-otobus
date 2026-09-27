/* SAHNE 1 — OKUL GEZİSİ (0–10 s)  370 people, buses of 45.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;

  /** a bus of 45 seats (9 × 5) centred at (x, y); n seats taken */
  function bus(ctx, x, y, n, a, seed, B) {
    if (a <= 0) return;
    const w = B.w, h = B.h;
    Ink.path(ctx, [[x - w / 2 + 12, y + h / 2], [x - w / 2, y + h / 2 - 12], [x - w / 2, y - h / 2 + 12], [x - w / 2 + 12, y - h / 2], [x + w / 2 - 22, y - h / 2], [x + w / 2, y - h / 2 + 22], [x + w / 2, y + h / 2], [x - w / 2 + 12, y + h / 2]], { w: 5, alpha: a, seed, taper: [0, 0], wob: 0.2 });
    [-w / 2 + 38, w / 2 - 38].forEach((dx, i) => { ctx.fillStyle = ink(a); ctx.beginPath(); ctx.arc(x + dx, y + h / 2 + 4, 12, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = `rgba(${LI.PAPER_RGB},${a})`; ctx.beginPath(); ctx.arc(x + dx, y + h / 2 + 4, 5, 0, Math.PI * 2); ctx.fill(); void i; });
    for (let j = 0; j < 45; j++) {
      const c = j % 9, r = Math.floor(j / 9), sx = x - w / 2 + 16 + c * 15.5, sy = y - h / 2 + 14 + r * 14.5;
      ctx.fillStyle = j < n ? amber(0.95 * a) : ink(0.14 * a);
      ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
    }
  }
  const pos = (B, i) => [B.x[i % B.cols], B.y[Math.floor(i / B.cols)]];

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Okul gezisi: 347 öğrenci ve 23 öğretmen'],
      [10.6, 27.8, 'Önce problemi anlayalım'],
      [28.4, 45.8, 'Strateji: toplam kişiyi otobüs kapasitesine böl'],
      [46.4, 61.8, 'Kontrol et, kısa yolu bul'],
      [62.4, 79.8, 'Stratejiyi başka durumlarda deneyelim'],
    ]);
  }

  function buses(ctx, env, t) {
    const L = KD.L(env), B = L.BUS, f = F(), a = END(t) * (1 - seg(t, 79.8, 80.4)); if (a <= 0) return;
    // how many people are on board
    let people = 370 * seg(t, 30.6, 35.6);
    if (t > 62.6) people = lerp(370, 360, inOut(seg(t, 62.6, 63.6)));
    for (let i = 0; i < 9; i++) {
      const show = i === 0 ? seg(t, 4.6, 5.6) : seg(t, 28.6 + i * 0.2, 29.0 + i * 0.2); if (show <= 0) continue;
      const gone = i === 8 ? seg(t, 66.6, 67.4) : 0, k = show * a * (1 - 0.75 * gone);
      const [x, y] = pos(B, i), n = Math.max(0, Math.min(45, Math.floor(people - i * 45)));
      bus(ctx, x, y, n, k, 3500 + i * 3, B);
      if (people > 1 && n > 0) f.T(ctx, String(n), x, y + B.h / 2 + 38, Object.assign({ size: L.G.s * 0.62, alpha: k }, n < 45 ? f.AMB : {}));
      if (i === 8 && gone > 0) f.crossInk(ctx, x, y, 34, gone, a);
      if (i === 8) { const e = win(t, 47.4, 61.8) * a; if (e > 0) f.T(ctx, '35 boş koltuk', x, y - B.h / 2 - 26, Object.assign({ size: L.G.s * 0.6, alpha: e, halo: true }, f.AMB)); }
    }
    const lab = win(t, 5.6, 28.4) * a;
    if (lab > 0) { const [x, y] = pos(B, 0); f.T(ctx, '45 kişilik', x, y - B.h / 2 - 28, Object.assign({ size: L.G.s * 0.7, alpha: lab, halo: true }, f.AMB)); }
    const sum = win(t, 16.4, 28.4) * a;
    if (sum > 0) f.T(ctx, '347 + 23 = 370 kişi', L.BIG[0], L.BIG[1], Object.assign({ size: L.G.s * 1.2, alpha: sum, halo: true }, f.AMB));
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Otobüsler 45 kişilik. Kaç otobüs gerekir?'], [11.4, 27.8, 'Verilen: 347 öğrenci, 23 öğretmen, 45 kişilik otobüs'],
      [29.4, 45.8, '370 ÷ 45 = 8, kalan 10'], [47.4, 61.8, 'Kontrol: 8 × 45 = 360, 370’ten az: 8 otobüs yetmez'],
      [63.0, 74.0, '360 kişi olsaydı: 360 ÷ 45 = 8, kalan 0 → 8 otobüs yeter'], [74.4, 79.8, 'Kural: kalan 0 değilse bölüme 1 ekle', true]]);
    exprs(ctx, t, at(W, 1), [[13.4, 27.8, 'İstenen: otobüs sayısı · önce topla, sonra böl'], [36.4, 45.8, '8 otobüs dolar, 10 kişi açıkta kalır'],
      [51.0, 61.8, '9 × 45 = 405, 370’ten fazla: 9 otobüs yeter'], [67.6, 79.8, '250 kişi, 30 kişilik minibüs: 250 ÷ 30 = 8, kalan 10 → 9 minibüs']]);
    exprs(ctx, t, at(W, 2), [[20.6, 27.8, 'Tahmin: yaklaşık 400 kişi, 40’ar kişi → 10 otobüs kadar', true], [40.4, 45.8, 'Açıkta kalanlar için bir otobüs daha: 9 otobüs', true],
      [55.4, 61.8, 'Kısa yol: 10 × 45 = 450, bir eksiği 450 − 45 = 405', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Verileni, isteneni ve işlemleri belirle', 80.6], ['Tahmin et: yaklaşık 10 otobüs', 81.6], ['Böl ve kontrol et: 9 otobüs', 82.6], ['Kalanı unutma: bir otobüs daha!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); buses(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A school trip', nameTr: 'Okul gezisi', concept: '370 people, buses of 45', conceptTr: '370 kişi, 45’lik otobüs', render });
})(window.LI = window.LI || {});
