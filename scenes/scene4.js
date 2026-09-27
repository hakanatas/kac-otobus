/* SAHNE 4 — KONTROL VE KISA YOL (46–62 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 46, end: 62, name: "Check and shortcut", nameTr: "Kontrol ve kısa yol", concept: "8 is not enough, 9 is", conceptTr: "8 yetmez, 9 yeter", render });
})(window.LI = window.LI || {});
