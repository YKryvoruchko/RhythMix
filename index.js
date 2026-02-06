(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const o=document.querySelector("#artists-list");console.log("artistsList:",o);const c={name:"Ren",image:"../../img/ren.png",genres:["Alternative","Pop","Rock","Indie"],description:"Ren Eryn Gill, known professionally as Ren, is a multi-award-winning Welsh singer-songwriter..."};function d(r){return`
    <div class="artist-card">
      <div class="artist-card__image">
        <img src="${r.image}" alt="${r.name}">
      </div>

      <div class="artist-card__content">
        <div class="artist-card__genres">
          ${r.genres.map(s=>`<span class="artist-card__genre">${s}</span>`).join("")}
        </div>

        <h3 class="artist-card__name">${r.name}</h3>

        <p class="artist-card__description">
          ${r.description}
        </p>

        <button class="artist-card__link">
          Learn More
          <svg width="8" height="14" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  `}o.insertAdjacentHTML("beforeend",d(c));
//# sourceMappingURL=index.js.map
