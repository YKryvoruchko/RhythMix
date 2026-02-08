import spriteUrl from '../../img/rhythmix-sprite-symbol-defs.svg';

// логотип
document.querySelectorAll('.footer-logo-use').forEach(el => {
  el.setAttribute('href', `${spriteUrl}#icon-logo-2`);
});

// соцсети
document.querySelectorAll('.socials-icon use').forEach(el => {
  const icon = el.dataset.icon;
  el.setAttribute('href', `${spriteUrl}#icon-${icon}`);
});