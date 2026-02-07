import spriteUrl from '../../img/rhythmix-sprite-symbol-defs.svg?url';

const useEl = document.querySelector('.footer-logo-use');

if (useEl) {
  useEl.setAttribute('href', `${spriteUrl}#icon-logo`);
  useEl.setAttribute('xlink:href', `${spriteUrl}#icon-logo`);
}

