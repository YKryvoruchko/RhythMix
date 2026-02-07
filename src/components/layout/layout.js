const spriteUrl = `${import.meta.env.BASE_URL}img/rhythmix-sprite-symbol-defs.svg`;

const useEl = document.querySelector('.about-logo-use');
useEl.setAttribute('href', `${spriteUrl}#icon-logo-icon`);
useEl.setAttribute('xlink:href', `${spriteUrl}#icon-logo-icon`); 
