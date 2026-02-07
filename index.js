import{S as p,N as y}from"./assets/vendor-BNS4lbLp.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const u="/RhythMix/assets/rhythmix-sprite-symbol-defs-CuHJjBBn.svg",m=document.querySelector(".header-logo-use");m.setAttribute("href",`${u}#icon-logo`);m.setAttribute("xlink:href",`${u}#icon-logo`);const b="https://sound-wave.b.goit.study/api";class g{constructor(){this.initialized=!1,this.backdrop=null,this.closeBtn=null,this.loader=null,this.content=null,this.elements={}}initElements(){this.initialized||(this.backdrop=document.querySelector("[data-modal-backdrop]"),this.closeBtn=document.querySelector("[data-modal-close]"),this.loader=document.querySelector("[data-loader]"),this.content=document.querySelector(".artist-modal-content"),this.elements={image:document.querySelector("[data-artist-image]"),name:document.querySelector("#artist-modal-title"),years:document.querySelector("[data-artist-years]"),sex:document.querySelector("[data-artist-gender]"),members:document.querySelector("[data-artist-members]"),country:document.querySelector("[data-artist-country]"),genres:document.querySelector("[data-artist-genres]"),biography:document.querySelector("[data-artist-bio]"),albumsList:document.querySelector("[data-artist-albums]")},this.backdrop&&this.closeBtn?(this.init(),this.initialized=!0):console.error("Required modal elements not found!"))}init(){this.closeBtn.addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",t=>{t.target===this.backdrop&&this.close()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.backdrop&&!this.backdrop.classList.contains("is-hidden")&&this.close()})}async open(t){if(this.initElements(),!!this.backdrop){this.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",this.showLoader();try{const e=await this.fetchArtistData(t);this.renderArtistData(e),this.hideLoader()}catch(e){console.error("Error loading artist data:",e),this.hideLoader(),this.showError()}}}close(){this.backdrop&&(this.backdrop.classList.add("is-hidden"),document.body.style.overflow="")}showLoader(){this.loader&&this.content&&(this.loader.style.display="flex",this.content.style.display="none")}hideLoader(){this.loader&&this.content&&(this.loader.style.display="none",this.content.style.display="block")}async fetchArtistData(t){const e=`${b}/artists/${t}/albums`,r=await fetch(e);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}renderArtistData(t){if(t)try{if(this.elements.image&&(this.elements.image.src=t.strArtistThumb||"",this.elements.image.alt=t.strArtist||"Artist"),this.elements.name&&(this.elements.name.textContent=t.strArtist||""),this.elements.years){const e=this.formatYearsActive(t.intFormedYear,t.intDiedYear);this.elements.years.textContent=e}if(this.elements.sex){const e=this.elements.sex.closest(".artist-modal-meta-item");t.strGender&&e?(e.style.display="block",this.elements.sex.textContent=t.strGender):e&&(e.style.display="none")}if(this.elements.members){const e=this.elements.members.closest(".artist-modal-meta-item");t.intMembers&&e?(e.style.display="block",this.elements.members.textContent=t.intMembers):e&&(e.style.display="none")}this.elements.country&&(this.elements.country.textContent=t.strCountry||""),this.elements.genres&&this.renderGenres(t.genres),this.elements.biography&&(this.elements.biography.textContent=t.strBiographyEN||""),this.elements.albumsList&&this.renderAlbums(t.albumsList)}catch(e){console.error("Error during rendering:",e)}}formatYearsActive(t,e){return t?`${t}-${e||"present"}`:"information missing"}renderGenres(t){if(!t||t.length===0){this.elements.genres.innerHTML="";return}const e=t.map(r=>`<span class="genre-tag">${r}</span>`).join("");this.elements.genres.innerHTML=e}renderAlbums(t){if(!t||t.length===0){this.elements.albumsList.innerHTML='<p class="no-albums">No albums available</p>';return}const e=t.map(r=>this.createAlbumHTML(r)).join("");this.elements.albumsList.innerHTML=e,this.attachYouTubeListeners()}createAlbumHTML(t){const r=(t.tracks||[]).map(s=>`
      <div class="track-item">
        <div class="track-info">
          <span class="track-title">${s.strTrack||""}</span>
          <span class="track-duration">${this.formatDuration(s.intDuration)}</span>
        </div>
        ${s.movie?`
          <button class="youtube-btn" data-youtube-link="${s.movie}" type="button">
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
          ${r}
        </div>
      </div>
    `}formatDuration(t){if(!t)return"";const e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return`${r}:${s.toString().padStart(2,"0")}`}attachYouTubeListeners(){this.elements.albumsList.querySelectorAll("[data-youtube-link]").forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const s=e.dataset.youtubeLink;s&&window.open(s,"_blank","noopener,noreferrer")})})}showError(){this.content&&(this.content.style.display="block",this.content.innerHTML='<p class="error-message">Failed to load artist information. Please try again later.</p>')}}const L=new g,v="https://sound-wave.b.goit.study/api",l=8;class h{constructor(){this.artistsList=document.getElementById("artists-list"),this.loadMoreBtn=document.getElementById("load-more"),this.currentPage=1,this.isLoading=!1,this.allArtists=[],this.init()}async init(){try{await this.loadArtists(),this.renderArtists(),this.setupEventListeners()}catch{this.showError()}}setupEventListeners(){this.loadMoreBtn&&this.loadMoreBtn.addEventListener("click",()=>this.loadMore())}async loadArtists(){if(!this.isLoading){this.isLoading=!0,this.showLoadingState();try{const t=await fetch(`${v}/artists`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();Array.isArray(e)?this.allArtists=e:e&&Array.isArray(e.artists)?this.allArtists=e.artists:e&&typeof e=="object"?this.allArtists=Object.values(e):this.allArtists=[]}catch(t){throw t}finally{this.isLoading=!1,this.hideLoadingState()}}}renderArtists(){if(!this.artistsList)return;const t=0,e=this.currentPage*l,r=this.allArtists.slice(t,e);this.artistsList.innerHTML="",r.forEach(s=>{const n=this.createArtistCard(s);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}addMoreArtists(){if(!this.artistsList)return;const t=(this.currentPage-1)*l,e=this.currentPage*l;this.allArtists.slice(t,e).forEach(s=>{const n=this.createArtistCard(s);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}createArtistCard(t){const e=document.createElement("div");e.className="artist-card";const r=t._id||t.idArtist;e.dataset.artistId=r,e.innerHTML=`
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
    `;const s=e.querySelector("[data-learn-more]");return s&&s.addEventListener("click",()=>{L.open(r)}),e}truncateText(t,e){return!t||t.length<=e?t:t.substring(0,e).trim()+"..."}loadMore(){this.isLoading||(this.currentPage++,this.addMoreArtists())}updateLoadMoreButton(){if(!this.loadMoreBtn)return;this.currentPage*l<this.allArtists.length?(this.loadMoreBtn.style.display="block",this.loadMoreBtn.disabled=!1):this.loadMoreBtn.style.display="none"}showLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!0,this.loadMoreBtn.textContent="Loading...")}hideLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!1,this.loadMoreBtn.textContent="Load More")}showError(){this.artistsList&&(this.artistsList.innerHTML=`
        <div class="artists__error">
          <p>Failed to load artists. Please try again later.</p>
        </div>
      `),this.loadMoreBtn&&(this.loadMoreBtn.style.display="none")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new h}):new h;const A="https://sound-wave.b.goit.study/api/feedbacks",w=10,a={wrapper:document.querySelector(".feedback"),swiperEl:document.querySelector(".feedback-swiper"),slidesEl:document.querySelector(".feedback-swiper .swiper-wrapper"),prevBtn:document.querySelector(".feedback-arrow--prev"),nextBtn:document.querySelector(".feedback-arrow--next"),dots:Array.from(document.querySelectorAll(".feedback-pagination .dot"))};M();async function M(){if(!(!a.wrapper||!a.slidesEl))try{const i=await k(w);S(i),C()}catch(i){f("Failed to load feedbacks."),console.error(i)}}async function k(i){const t=new URLSearchParams({limit:String(i),page:"1"}),e=await fetch(`${A}?${t.toString()}`);if(!e.ok)throw new Error(`Feedbacks request failed: ${e.status}`);const r=await e.json(),s=(r==null?void 0:r.data)??(r==null?void 0:r.feedbacks)??r??[];return Array.isArray(s)?s.slice(0,i):[]}function S(i){if(!i.length){f("No feedbacks available.");return}a.slidesEl.innerHTML=i.map(E).join(""),c(0,i.length)}function E(i){const t=(i==null?void 0:i.name)??"Anonymous",e=(i==null?void 0:i.descr)??"",r=$(Math.round(Number((i==null?void 0:i.rating)??0)));return`
    <div class="swiper-slide feedback-card">
      <div class="feedback-rating rating star-icon value-${r} label-hidden">
        <div class="label-value">${r}</div>
        <div class="star-container">
          ${B()}
        </div>
      </div>
      <p class="feedback-text">"${d(e)}"</p>
      <p class="feedback-author">${d(t)}</p>
    </div>
  `}function B(){return Array.from({length:5}).map(()=>`
        <div class="star icon">
          <i class="star-empty"></i>
          <i class="star-half"></i>
          <i class="star-filled"></i>
        </div>
      `).join("")}function C(){if(!a.swiperEl)return;const i=new p(a.swiperEl,{modules:[y],slidesPerView:1,spaceBetween:24,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},on:{slideChange(t){c(t.activeIndex,t.slides.length)}}});c(i.activeIndex,i.slides.length)}function c(i,t){var e,r,s,n;if(a.dots.length){if(a.dots.forEach(o=>o.classList.remove("is-active")),t<=1){(e=a.dots[0])==null||e.classList.add("is-active");return}if(i<=0){(r=a.dots[0])==null||r.classList.add("is-active");return}if(i>=t-1){(s=a.dots[2])==null||s.classList.add("is-active");return}(n=a.dots[1])==null||n.classList.add("is-active")}}function f(i){a.slidesEl.innerHTML=`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">${d(i)}</p>
    </div>
  `}function $(i){return Number.isFinite(i)?Math.min(5,Math.max(0,i)):0}function d(i){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}
//# sourceMappingURL=index.js.map
