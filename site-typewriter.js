(function () {
  const targets = document.querySelectorAll('[data-typewriter]');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function typeLoop(target) {
    if (reduceMotion) {
      const phrases = (target.dataset.phrases || target.textContent).split('|').map(p => p.trim()).filter(Boolean);
      target.textContent = phrases[0] || '';
      return;
    }

    let phraseIndex = 0;
    while (true) {
      // Lee data-phrases en cada ciclo para respetar cambios de idioma
      const phrases = (target.dataset.phrases || target.textContent)
        .split('|')
        .map(p => p.trim())
        .filter(Boolean);

      if (!phrases.length) { await wait(500); continue; }

      const phrase = phrases[phraseIndex % phrases.length];

      for (let i = 0; i <= phrase.length; i++) {
        target.textContent = phrase.slice(0, i);
        await wait(42);
      }

      await wait(1500);

      for (let i = phrase.length; i >= 0; i--) {
        target.textContent = phrase.slice(0, i);
        await wait(24);
      }

      await wait(260);
      phraseIndex++;
    }
  }

  targets.forEach(target => typeLoop(target));
})();
