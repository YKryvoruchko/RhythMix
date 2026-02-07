const spriteUrl = `${import.meta.env.BASE_URL}img/rhythmix-sprite-symbol-defs.svg`;

const useEl = document.querySelector('.footer-logo-use');

if (useEl) {
  useEl.setAttribute('href', `${spriteUrl}#icon-logo`);
  useEl.setAttribute('xlink:href', `${spriteUrl}#icon-logo`);
}

