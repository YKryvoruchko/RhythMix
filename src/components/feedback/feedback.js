import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'css-star-rating/css/star-rating.css';

const leftArrowUrl = `${import.meta.env.BASE_URL}img/feedback/icon-arrow-left.svg`;
const rightArrowUrl = `${import.meta.env.BASE_URL}img/feedback/icon-arrow-right.svg`;
const API_URL = 'https://sound-wave.b.goit.study/api/feedbacks';
const FEEDBACK_LIMIT = 10;

const refs = {
  wrapper: document.querySelector('.feedback'),
  swiperEl: document.querySelector('.feedback-swiper'),
  slidesEl: document.querySelector('.feedback-swiper .swiper-wrapper'),
  prevBtn: document.querySelector('.feedback-arrow--prev'),
  nextBtn: document.querySelector('.feedback-arrow--next'),
  dots: Array.from(document.querySelectorAll('.feedback-pagination .dot')),
};

setArrowIcons();
initFeedback();

function setArrowIcons() {
  const prevUse = document.querySelector('.feedback-arrow--prev use');
  const nextUse = document.querySelector('.feedback-arrow--next use');

  if (prevUse) {
    prevUse.setAttribute('href', leftArrowUrl);
    prevUse.setAttribute('xlink:href', leftArrowUrl);
  }

  if (nextUse) {
    nextUse.setAttribute('href', rightArrowUrl);
    nextUse.setAttribute('xlink:href', rightArrowUrl);
  }
}

async function initFeedback() {
  if (!refs.wrapper || !refs.slidesEl) return;

  try {
    const feedbacks = await fetchFeedbacks(FEEDBACK_LIMIT);
    renderSlides(feedbacks);
    initSwiper();
  } catch (error) {
    renderError('Failed to load feedbacks.');
    console.error(error);
  }
}

async function fetchFeedbacks(limit) {
  const params = new URLSearchParams({ limit: String(limit), page: '1' });
  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Feedbacks request failed: ${response.status}`);
  }

  const payload = await response.json();
  const items = payload?.data ?? payload?.feedbacks ?? payload ?? [];
  return Array.isArray(items) ? items.slice(0, limit) : [];
}

function renderSlides(items) {
  if (!items.length) {
    renderError('No feedbacks available.');
    return;
  }

  refs.slidesEl.innerHTML = items.map(buildSlideMarkup).join('');
  setPaginationState(0, items.length);
}

function buildSlideMarkup(item) {
  const name = item?.name ?? 'Anonymous';
  const text = item?.descr ?? '';
  const rating = clampRating(Math.round(Number(item?.rating ?? 0)));

  return `
    <div class="swiper-slide feedback-card">
      <div class="feedback-rating rating star-icon value-${rating} label-hidden">
        <div class="label-value">${rating}</div>
        <div class="star-container">
          ${buildStars()}
        </div>
      </div>
      <p class="feedback-text">"${escapeHtml(text)}"</p>
      <p class="feedback-author">${escapeHtml(name)}</p>
    </div>
  `;
}

function buildStars() {
  return Array.from({ length: 5 })
    .map(
      () => `
        <div class="star icon">
          <i class="star-empty"></i>
          <i class="star-half"></i>
          <i class="star-filled"></i>
        </div>
      `
    )
    .join('');
}

function initSwiper() {
  if (!refs.swiperEl) return;

  swiperInstance = new Swiper(refs.swiperEl, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      prevEl: refs.prevBtn,
      nextEl: refs.nextBtn,
    },
    on: {
      slideChange(sw) {
        setPaginationState(sw.activeIndex, sw.slides.length);
      },
    },
  });

  setPaginationState(swiperInstance.activeIndex, swiperInstance.slides.length);
  bindDots(swiperInstance.slides.length);
}

function setPaginationState(activeIndex, total) {
  if (!refs.dots.length) return;

  refs.dots.forEach(dot => dot.classList.remove('is-active'));

  if (total <= 1) {
    refs.dots[0]?.classList.add('is-active');
    return;
  }

  if (activeIndex <= 0) {
    refs.dots[0]?.classList.add('is-active');
    return;
  }

  if (activeIndex >= total - 1) {
    refs.dots[2]?.classList.add('is-active');
    return;
  }

  refs.dots[1]?.classList.add('is-active');
}
// -------- pagination ----------
let swiperInstance = null;

function bindDots() {
  if (!refs.dots.length || !swiperInstance) return;

  refs.dots[0].onclick = () => {
    swiperInstance.slideTo(Math.max(swiperInstance.activeIndex - 1, 0));
  };

  refs.dots[1].onclick = () => {
    swiperInstance.slideTo(swiperInstance.activeIndex);
  };

  refs.dots[2].onclick = () => {
    swiperInstance.slideTo(
      Math.min(swiperInstance.activeIndex + 1, swiperInstance.slides.length - 1)
    );
  };
}

// -----------------------------------
function renderError(message) {
  refs.slidesEl.innerHTML = `
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">${escapeHtml(message)}</p>
    </div>
  `;
}

function clampRating(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(5, Math.max(0, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
