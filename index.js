import{S as u,N as f}from"./assets/vendor-BNS4lbLp.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();document.getElementById("artists-list");const p="https://sound-wave.b.goit.study/api/feedbacks",b=10,n={wrapper:document.querySelector(".feedback"),swiperEl:document.querySelector(".feedback-swiper"),slidesEl:document.querySelector(".feedback-swiper .swiper-wrapper"),prevBtn:document.querySelector(".feedback-arrow--prev"),nextBtn:document.querySelector(".feedback-arrow--next"),dots:Array.from(document.querySelectorAll(".feedback-pagination .dot"))};g();async function g(){if(!(!n.wrapper||!n.slidesEl))try{const e=await v(b);h(e),y()}catch(e){d("Failed to load feedbacks."),console.error(e)}}async function v(e){const i=new URLSearchParams({limit:String(e),page:"1"}),a=await fetch(`${p}?${i.toString()}`);if(!a.ok)throw new Error(`Feedbacks request failed: ${a.status}`);const t=await a.json(),r=(t==null?void 0:t.data)??(t==null?void 0:t.feedbacks)??t??[];return Array.isArray(r)?r.slice(0,e):[]}function h(e){if(!e.length){d("No feedbacks available.");return}n.slidesEl.innerHTML=e.map(m).join(""),o(0,e.length)}function m(e){const i=(e==null?void 0:e.name)??"Anonymous",a=(e==null?void 0:e.descr)??"",t=S(Math.round(Number((e==null?void 0:e.rating)??0)));return`
    <div class="swiper-slide feedback-card">
      <div class="feedback-rating rating star-icon value-${t} label-hidden">
        <div class="label-value">${t}</div>
        <div class="star-container">
          ${w()}
        </div>
      </div>
      <p class="feedback-text">"${l(a)}"</p>
      <p class="feedback-author">${l(i)}</p>
    </div>
  `}function w(){return Array.from({length:5}).map(()=>`
        <div class="star icon">
          <i class="star-empty"></i>
          <i class="star-half"></i>
          <i class="star-filled"></i>
        </div>
      `).join("")}function y(){if(!n.swiperEl)return;const e=new u(n.swiperEl,{modules:[f],slidesPerView:1,spaceBetween:24,navigation:{prevEl:n.prevBtn,nextEl:n.nextBtn},on:{slideChange(i){o(i.activeIndex,i.slides.length)}}});o(e.activeIndex,e.slides.length)}function o(e,i){var a,t,r,s;if(n.dots.length){if(n.dots.forEach(c=>c.classList.remove("is-active")),i<=1){(a=n.dots[0])==null||a.classList.add("is-active");return}if(e<=0){(t=n.dots[0])==null||t.classList.add("is-active");return}if(e>=i-1){(r=n.dots[2])==null||r.classList.add("is-active");return}(s=n.dots[1])==null||s.classList.add("is-active")}}function d(e){n.slidesEl.innerHTML=`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">${l(e)}</p>
    </div>
  `}function S(e){return Number.isFinite(e)?Math.min(5,Math.max(0,e)):0}function l(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}
//# sourceMappingURL=index.js.map
