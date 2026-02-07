import{S as E,N as S}from"./assets/vendor-BNS4lbLp.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();const a="/RhythMix/img/rhythmix-sprite-symbol-defs.svg",x=document.querySelectorAll(".header-logo-use"),f=document.querySelector(".header"),p=document.querySelector(".burger"),L=document.querySelector(".burger-use"),$=document.querySelector(".mobile-close"),A=document.querySelector(".mobile-close-use"),B=document.querySelectorAll(".mobile-navigation-link");x.forEach(s=>{s.setAttribute("href",`${a}#icon-logo`),s.setAttribute("xlink:href",`${a}#icon-logo`)});L.setAttribute("href",`${a}#icon-menu-alt-right`);L.setAttribute("xlink:href",`${a}#icon-menu-alt-right`);A.setAttribute("href",`${a}#icon-x`);A.setAttribute("xlink:href",`${a}#icon-x`);function q(){f.classList.add("is-open"),document.body.classList.add("no-scroll"),p.setAttribute("aria-expanded","true")}function d(){f.classList.remove("is-open"),document.body.classList.remove("no-scroll"),p.setAttribute("aria-expanded","false")}p.addEventListener("click",s=>{s.preventDefault(),f.classList.contains("is-open")?d():q()});$.addEventListener("click",s=>{s.preventDefault(),d()});B.forEach(s=>{s.addEventListener("click",()=>d())});document.addEventListener("keydown",s=>{s.key==="Escape"&&d()});const C=document.querySelector(".btn-explore"),T=document.querySelector("#artists-section");C.addEventListener("click",()=>{T.scrollIntoView({behavior:"smooth",block:"start"})});const _="https://sound-wave.b.goit.study/api";class P{constructor(){this.initialized=!1,this.backdrop=null,this.closeBtn=null,this.loader=null,this.content=null,this.elements={}}initElements(){this.initialized||(this.backdrop=document.querySelector("[data-modal-backdrop]"),this.closeBtn=document.querySelector("[data-modal-close]"),this.loader=document.querySelector("[data-loader]"),this.content=document.querySelector(".artist-modal-content"),this.elements={image:document.querySelector("[data-artist-image]"),name:document.querySelector("#artist-modal-title"),years:document.querySelector("[data-artist-years]"),sex:document.querySelector("[data-artist-gender]"),members:document.querySelector("[data-artist-members]"),country:document.querySelector("[data-artist-country]"),genres:document.querySelector("[data-artist-genres]"),biography:document.querySelector("[data-artist-bio]"),albumsList:document.querySelector("[data-artist-albums]")},this.backdrop&&this.closeBtn?(this.init(),this.initialized=!0):console.error("Required modal elements not found!"))}init(){this.closeBtn.addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",t=>{t.target===this.backdrop&&this.close()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.backdrop&&!this.backdrop.classList.contains("is-hidden")&&this.close()})}async open(t){if(this.initElements(),!!this.backdrop){this.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",this.showLoader();try{const e=await this.fetchArtistData(t);this.renderArtistData(e),this.hideLoader()}catch(e){console.error("Error loading artist data:",e),this.hideLoader(),this.showError()}}}close(){this.backdrop&&(this.backdrop.classList.add("is-hidden"),document.body.style.overflow="")}showLoader(){this.loader&&this.content&&(this.loader.style.display="flex",this.content.style.display="none")}hideLoader(){this.loader&&this.content&&(this.loader.style.display="none",this.content.style.display="block")}async fetchArtistData(t){const e=`${_}/artists/${t}/albums`,i=await fetch(e);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return await i.json()}renderArtistData(t){if(t)try{if(this.elements.image&&(this.elements.image.src=t.strArtistThumb||"",this.elements.image.alt=t.strArtist||"Artist"),this.elements.name&&(this.elements.name.textContent=t.strArtist||""),this.elements.years){const e=this.formatYearsActive(t.intFormedYear,t.intDiedYear);this.elements.years.textContent=e}if(this.elements.sex){const e=this.elements.sex.closest(".artist-modal-meta-item");t.strGender&&e?(e.style.display="block",this.elements.sex.textContent=t.strGender):e&&(e.style.display="none")}if(this.elements.members){const e=this.elements.members.closest(".artist-modal-meta-item");t.intMembers&&e?(e.style.display="block",this.elements.members.textContent=t.intMembers):e&&(e.style.display="none")}this.elements.country&&(this.elements.country.textContent=t.strCountry||""),this.elements.genres&&this.renderGenres(t.genres),this.elements.biography&&(this.elements.biography.textContent=t.strBiographyEN||""),this.elements.albumsList&&this.renderAlbums(t.albumsList)}catch(e){console.error("Error during rendering:",e)}}formatYearsActive(t,e){return t?`${t}-${e||"present"}`:"information missing"}renderGenres(t){if(!t||t.length===0){this.elements.genres.innerHTML="";return}const e=t.map(i=>`<span class="genre-tag">${i}</span>`).join("");this.elements.genres.innerHTML=e}renderAlbums(t){if(!t||t.length===0){this.elements.albumsList.innerHTML='<p class="no-albums">No albums available</p>';return}const e=t.map(i=>this.createAlbumHTML(i)).join("");this.elements.albumsList.innerHTML=e,this.attachYouTubeListeners()}createAlbumHTML(t){const i=(t.tracks||[]).map(r=>`
      <div class="track-item">
        <div class="track-info">
          <span class="track-title">${r.strTrack||""}</span>
          <span class="track-duration">${this.formatDuration(r.intDuration)}</span>
        </div>
        ${r.movie?`
          <button class="youtube-btn" data-youtube-link="${r.movie}" type="button">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M15.8 4.8C15.8 4.8 15.6 3.4 15 2.8C14.2 2 13.4 2 13 1.9C10.9 1.8 8 1.8 8 1.8C8 1.8 5.1 1.8 3 1.9C2.6 2 1.8 2 1 2.8C0.4 3.4 0.2 4.8 0.2 4.8C0.2 4.8 0 6.4 0 8V9.6C0 11.2 0.2 12.8 0.2 12.8C0.2 12.8 0.4 14.2 1 14.8C1.8 15.6 2.8 15.6 3.2 15.7C4.8 15.8 8 15.9 8 15.9C8 15.9 10.9 15.9 13 15.8C13.4 15.8 14.2 15.8 15 15C15.6 14.4 15.8 13 15.8 13C15.8 13 16 11.4 16 9.8V8C16 6.4 15.8 4.8 15.8 4.8ZM6.4 10.8V5.2L10.6 8L6.4 10.8Z" fill="currentColor"/>
            </svg>
          </button>
        `:""}
      </div>
    `).join("");return`
      <div class="album-item">
        <div class="album-header">
          <h4 class="album-title">${t.strAlbum||""}</h4>
          <span class="album-year">${t.intYearReleased||""}</span>
        </div>
        <div class="album-tracks">
          ${i}
        </div>
      </div>
    `}formatDuration(t){if(!t)return"";const e=Math.floor(t/1e3),i=Math.floor(e/60),r=e%60;return`${i}:${r.toString().padStart(2,"0")}`}attachYouTubeListeners(){this.elements.albumsList.querySelectorAll("[data-youtube-link]").forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const r=e.dataset.youtubeLink;r&&window.open(r,"_blank","noopener,noreferrer")})})}showError(){this.content&&(this.content.style.display="block",this.content.innerHTML='<p class="error-message">Failed to load artist information. Please try again later.</p>')}}const H=new P,I="https://sound-wave.b.goit.study/api",c=8;class b{constructor(){this.artistsList=document.getElementById("artists-list"),this.loadMoreBtn=document.getElementById("load-more"),this.currentPage=1,this.isLoading=!1,this.allArtists=[],this.init()}async init(){try{await this.loadArtists(),this.renderArtists(),this.setupEventListeners()}catch{this.showError()}}setupEventListeners(){this.loadMoreBtn&&this.loadMoreBtn.addEventListener("click",()=>this.loadMore())}async loadArtists(){if(!this.isLoading){this.isLoading=!0,this.showLoadingState();try{const t=await fetch(`${I}/artists`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();Array.isArray(e)?this.allArtists=e:e&&Array.isArray(e.artists)?this.allArtists=e.artists:e&&typeof e=="object"?this.allArtists=Object.values(e):this.allArtists=[]}catch(t){throw t}finally{this.isLoading=!1,this.hideLoadingState()}}}renderArtists(){if(!this.artistsList)return;const t=0,e=this.currentPage*c,i=this.allArtists.slice(t,e);this.artistsList.innerHTML="",i.forEach(r=>{const n=this.createArtistCard(r);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}addMoreArtists(){if(!this.artistsList)return;const t=(this.currentPage-1)*c,e=this.currentPage*c;this.allArtists.slice(t,e).forEach(r=>{const n=this.createArtistCard(r);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}createArtistCard(t){const e=document.createElement("div");e.className="artist-card";const i=t._id||t.idArtist;e.dataset.artistId=i,e.innerHTML=`
      <div class="artist-card__image">
        <img 
          src="${t.strArtistThumb||""}" 
          alt="${t.strArtist||""}" 
          loading="lazy"
        />
      </div>

      <div class="artist-card__content">
        <div class="artist-card__genres">
          ${(t.genres||[]).map(n=>`<span class="artist-card__genre">${n}</span>`).join("")}
        </div>

        <h3 class="artist-card__name">
          ${t.strArtist||""}
        </h3>

        <p class="artist-card__description">
          ${this.truncateText(t.strBiographyEN||"",150)}
        </p>

        <button class="artist-card__link" type="button" data-learn-more>
          Learn More
          <svg class="artist-card__icon" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
            <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;const r=e.querySelector("[data-learn-more]");return r&&r.addEventListener("click",()=>{H.open(i)}),e}truncateText(t,e){return!t||t.length<=e?t:t.substring(0,e).trim()+"..."}loadMore(){this.isLoading||(this.currentPage++,this.addMoreArtists())}updateLoadMoreButton(){if(!this.loadMoreBtn)return;this.currentPage*c<this.allArtists.length?(this.loadMoreBtn.style.display="block",this.loadMoreBtn.disabled=!1):this.loadMoreBtn.style.display="none"}showLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!0,this.loadMoreBtn.textContent="Loading...")}hideLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!1,this.loadMoreBtn.textContent="Load More")}showError(){this.artistsList&&(this.artistsList.innerHTML=`
        <div class="artists__error">
          <p>Failed to load artists. Please try again later.</p>
        </div>
      `),this.loadMoreBtn&&(this.loadMoreBtn.style.display="none")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new b}):new b;const k="/RhythMix/img/rhythmix-sprite-symbol-defs.svg",w=document.querySelector(".about-logo-use");w.setAttribute("href",`${k}#icon-logo-icon`);w.setAttribute("xlink:href",`${k}#icon-logo-icon`);const y="/RhythMix/img/feedback/icon-arrow-left.svg",g="/RhythMix/img/feedback/icon-arrow-right.svg",D="https://sound-wave.b.goit.study/api/feedbacks",R=10,o={wrapper:document.querySelector(".feedback"),swiperEl:document.querySelector(".feedback-swiper"),slidesEl:document.querySelector(".feedback-swiper .swiper-wrapper"),prevBtn:document.querySelector(".feedback-arrow--prev"),nextBtn:document.querySelector(".feedback-arrow--next"),dots:Array.from(document.querySelectorAll(".feedback-pagination .dot"))};U();N();function U(){const s=document.querySelector(".feedback-arrow--prev use"),t=document.querySelector(".feedback-arrow--next use");s&&(s.setAttribute("href",y),s.setAttribute("xlink:href",y)),t&&(t.setAttribute("href",g),t.setAttribute("xlink:href",g))}async function N(){if(!(!o.wrapper||!o.slidesEl))try{const s=await j(R);F(s),V()}catch(s){M("Failed to load feedbacks."),console.error(s)}}async function j(s){const t=new URLSearchParams({limit:String(s),page:"1"}),e=await fetch(`${D}?${t.toString()}`);if(!e.ok)throw new Error(`Feedbacks request failed: ${e.status}`);const i=await e.json(),r=(i==null?void 0:i.data)??(i==null?void 0:i.feedbacks)??i??[];return Array.isArray(r)?r.slice(0,s):[]}function F(s){if(!s.length){M("No feedbacks available.");return}o.slidesEl.innerHTML=s.map(Y).join(""),h(0,s.length)}function Y(s){const t=(s==null?void 0:s.name)??"Anonymous",e=(s==null?void 0:s.descr)??"",i=G(Math.round(Number((s==null?void 0:s.rating)??0)));return`
    <div class="swiper-slide feedback-card">
      <div class="feedback-rating rating star-icon value-${i} label-hidden">
        <div class="label-value">${i}</div>
        <div class="star-container">
          ${O()}
        </div>
      </div>
      <p class="feedback-text">"${m(e)}"</p>
      <p class="feedback-author">${m(t)}</p>
    </div>
  `}function O(){return Array.from({length:5}).map(()=>`
        <div class="star icon">
          <i class="star-empty"></i>
          <i class="star-half"></i>
          <i class="star-filled"></i>
        </div>
      `).join("")}function V(){if(!o.swiperEl)return;const s=new E(o.swiperEl,{modules:[S],slidesPerView:1,spaceBetween:24,navigation:{prevEl:o.prevBtn,nextEl:o.nextBtn},on:{slideChange(t){h(t.activeIndex,t.slides.length)}}});h(s.activeIndex,s.slides.length)}function h(s,t){var e,i,r,n;if(o.dots.length){if(o.dots.forEach(l=>l.classList.remove("is-active")),t<=1){(e=o.dots[0])==null||e.classList.add("is-active");return}if(s<=0){(i=o.dots[0])==null||i.classList.add("is-active");return}if(s>=t-1){(r=o.dots[2])==null||r.classList.add("is-active");return}(n=o.dots[1])==null||n.classList.add("is-active")}}function M(s){o.slidesEl.innerHTML=`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">${m(s)}</p>
    </div>
  `}function G(s){return Number.isFinite(s)?Math.min(5,Math.max(0,s)):0}function m(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const v="/RhythMix/img/rhythmix-sprite-symbol-defs.svg",u=document.querySelector(".footer-logo-use");u&&(u.setAttribute("href",`${v}#icon-logo`),u.setAttribute("xlink:href",`${v}#icon-logo`));
//# sourceMappingURL=index.js.map
