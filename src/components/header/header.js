import spriteUrl from '../../img/rhythmix-sprite-symbol-defs.svg?url';

const logoUseEls = document.querySelectorAll('.header-logo-use');
const headerEl = document.querySelector('.header');
const burgerEl = document.querySelector('.burger');
const burgerUseEl = document.querySelector('.burger-use');
const closeEl = document.querySelector('.mobile-close');
const closeUseEl = document.querySelector('.mobile-close-use');
const mobileLinks = document.querySelectorAll('.mobile-navigation-link');

logoUseEls.forEach(el => {
  el.setAttribute('href', `${spriteUrl}#icon-logo`);
  el.setAttribute('xlink:href', `${spriteUrl}#icon-logo`);
});

burgerUseEl.setAttribute('href', `${spriteUrl}#icon-menu-alt-right`);
burgerUseEl.setAttribute('xlink:href', `${spriteUrl}#icon-menu-alt-right`);

closeUseEl.setAttribute('href', `${spriteUrl}#icon-x`);
closeUseEl.setAttribute('xlink:href', `${spriteUrl}#icon-x`);



function openMenu() {
  headerEl.classList.add('is-open');
  document.body.classList.add('no-scroll');
  burgerEl.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  headerEl.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  burgerEl.setAttribute('aria-expanded', 'false');
}

burgerEl.addEventListener('click', e => {
  e.preventDefault();
  headerEl.classList.contains('is-open') ? closeMenu() : openMenu();
});

closeEl.addEventListener('click', e => {
  e.preventDefault();
  closeMenu();
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});
