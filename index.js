import{S as w,N as M}from"./assets/vendor-BNS4lbLp.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const l="/RhythMix/assets/rhythmix-sprite-symbol-defs-EUqOX6aZ.svg",E=document.querySelectorAll(".header-logo-use"),f=document.querySelector(".header"),b=document.querySelector(".burger"),v=document.querySelector(".burger-use"),x=document.querySelector(".mobile-close"),L=document.querySelector(".mobile-close-use"),S=document.querySelectorAll(".mobile-navigation-link");E.forEach(s=>{s.setAttribute("href",`${l}#icon-logo`),s.setAttribute("xlink:href",`${l}#icon-logo`)});v.setAttribute("href",`${l}#icon-menu-alt-right`);v.setAttribute("xlink:href",`${l}#icon-menu-alt-right`);L.setAttribute("href",`${l}#icon-x`);L.setAttribute("xlink:href",`${l}#icon-x`);function $(){f.classList.add("is-open"),document.body.classList.add("no-scroll"),b.setAttribute("aria-expanded","true")}function u(){f.classList.remove("is-open"),document.body.classList.remove("no-scroll"),b.setAttribute("aria-expanded","false")}b.addEventListener("click",s=>{s.preventDefault(),f.classList.contains("is-open")?u():$()});x.addEventListener("click",s=>{s.preventDefault(),u()});S.forEach(s=>{s.addEventListener("click",()=>u())});document.addEventListener("keydown",s=>{s.key==="Escape"&&u()});const C=document.querySelector(".btn-explore"),q=document.querySelector("#artists");C.addEventListener("click",()=>{q.scrollIntoView({behavior:"smooth",block:"start"})});const B="https://sound-wave.b.goit.study/api";class T{constructor(){this.initialized=!1,this.backdrop=null,this.closeBtn=null,this.loader=null,this.content=null,this.elements={}}initElements(){this.initialized||(this.backdrop=document.querySelector("[data-modal-backdrop]"),this.closeBtn=document.querySelector("[data-modal-close]"),this.loader=document.querySelector("[data-loader]"),this.content=document.querySelector(".artist-modal-content"),this.elements={image:document.querySelector("[data-artist-image]"),name:document.querySelector("#artist-modal-title"),years:document.querySelector("[data-artist-years]"),sex:document.querySelector("[data-artist-gender]"),members:document.querySelector("[data-artist-members]"),country:document.querySelector("[data-artist-country]"),genres:document.querySelector("[data-artist-genres]"),biography:document.querySelector("[data-artist-bio]"),albumsList:document.querySelector("[data-artist-albums]")},this.backdrop&&this.closeBtn?(this.init(),this.initialized=!0):console.error("Required modal elements not found!"))}init(){this.closeBtn.addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",e=>{e.target===this.backdrop&&this.close()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdrop&&!this.backdrop.classList.contains("is-hidden")&&this.close()})}async open(e){if(this.initElements(),!!this.backdrop){this.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",this.clearContent(),this.showLoader();try{const t=await this.fetchArtistData(e);this.renderArtistData(t),this.hideLoader()}catch(t){console.error("Error loading artist data:",t),this.hideLoader(),this.showError()}}}close(){this.backdrop&&(this.backdrop.classList.add("is-hidden"),document.body.style.overflow="")}showLoader(){this.loader&&this.content&&(this.loader.style.display="flex",this.content.style.visibility="hidden"),this.elements.albumsList&&(this.elements.albumsList.style.visibility="hidden")}hideLoader(){this.loader&&this.content&&(this.loader.style.display="none",this.content.style.visibility="visible"),this.elements.albumsList&&(this.elements.albumsList.style.visibility="visible")}clearContent(){if(this.elements.image&&(this.elements.image.src="",this.elements.image.alt="Artist"),this.elements.name&&(this.elements.name.textContent=""),this.elements.years&&(this.elements.years.textContent="information missing"),this.elements.sex){this.elements.sex.textContent="";const e=this.elements.sex.closest(".artist-modal-sex-item");e&&(e.style.display="none")}if(this.elements.members){this.elements.members.textContent="";const e=this.elements.members.closest(".artist-modal-members-item");e&&(e.style.display="none")}this.elements.country&&(this.elements.country.textContent=""),this.elements.genres&&(this.elements.genres.innerHTML=""),this.elements.biography&&(this.elements.biography.textContent=""),this.elements.albumsList&&(this.elements.albumsList.innerHTML="")}async fetchArtistData(e){const t=`${B}/artists/${e}/albums`,r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}renderArtistData(e){if(e)try{if(this.elements.image&&(this.elements.image.src=e.strArtistThumb||"",this.elements.image.alt=e.strArtist||"Artist"),this.elements.name&&(this.elements.name.textContent=e.strArtist||""),this.elements.years){const t=this.formatYearsActive(e.intFormedYear,e.intDiedYear);this.elements.years.textContent=t}if(this.elements.sex){const t=this.elements.sex.closest(".artist-modal-sex-item");e.strGender&&t?(t.style.display="flex",this.elements.sex.textContent=e.strGender):t&&(t.style.display="none")}if(this.elements.members){const t=this.elements.members.closest(".artist-modal-members-item");e.intMembers&&t?(t.style.display="flex",this.elements.members.textContent=e.intMembers):t&&(t.style.display="none")}this.elements.country&&(this.elements.country.textContent=e.strCountry||""),this.elements.genres&&this.renderGenres(e.genres),this.elements.biography&&(this.elements.biography.textContent=e.strBiographyEN||""),this.elements.albumsList&&this.renderAlbums(e.albumsList)}catch(t){console.error("Error during rendering:",t)}}formatYearsActive(e,t){return e?`${e}-${t||"present"}`:"information missing"}renderGenres(e){if(!e||e.length===0){this.elements.genres.innerHTML="";return}const t=e.map(r=>`<li class="artist-modal-genres-item">${r}</li>`).join("");this.elements.genres.innerHTML=t}renderAlbums(e){if(!e||e.length===0){this.elements.albumsList.innerHTML='<p class="no-albums">No albums available</p>';return}const t=e.map(r=>this.createAlbumHTML(r)).join("");this.elements.albumsList.innerHTML=t,this.attachYouTubeListeners()}createAlbumHTML(e){const r=(e.tracks||[]).map(i=>`
      <div class="track-item">
        <span class="track-title">${i.strTrack||""}</span>
        <span class="track-duration">${this.formatDuration(i.intDuration)}</span>
        ${i.movie?`
          <button class="youtube-btn" data-youtube-link="${i.movie}" type="button" aria-label="Watch on YouTube">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.8 4.8C15.8 4.8 15.6 3.4 15 2.8C14.2 2 13.4 2 13 1.9C10.9 1.8 8 1.8 8 1.8C8 1.8 5.1 1.8 3 1.9C2.6 2 1.8 2 1 2.8C0.4 3.4 0.2 4.8 0.2 4.8C0.2 4.8 0 6.4 0 8V9.6C0 11.2 0.2 12.8 0.2 12.8C0.2 12.8 0.4 14.2 1 14.8C1.8 15.6 2.8 15.6 3.2 15.7C4.8 15.8 8 15.9 8 15.9C8 15.9 10.9 15.9 13 15.8C13.4 15.8 14.2 15.8 15 15C15.6 14.4 15.8 13 15.8 13C15.8 13 16 11.4 16 9.8V8C16 6.4 15.8 4.8 15.8 4.8ZM6.4 10.8V5.2L10.6 8L6.4 10.8Z" fill="currentColor"/>
            </svg>
          </button>
        `:"<span></span>"}
      </div>
    `).join("");return`
      <div class="album-item">
        <div class="album-header">
          <h4 class="album-title">${e.strAlbum||""}</h4>
          <span class="album-year">${e.intYearReleased||""}</span>
        </div>
        <div class="album-tracks">
          <div class="album-tracks-header">
            <span>Track</span>
            <span>Time</span>
            <span>Link</span>
          </div>
          <div class="album-tracks-list">
            ${r}
          </div>
        </div>
      </div>
    `}formatDuration(e){if(!e)return"";const t=Math.floor(e/1e3),r=Math.floor(t/60),i=t%60;return`${r}:${i.toString().padStart(2,"0")}`}attachYouTubeListeners(){this.elements.albumsList.querySelectorAll("[data-youtube-link]").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();const i=t.dataset.youtubeLink;i&&window.open(i,"_blank","noopener,noreferrer")})})}showError(){this.content&&(this.content.style.display="block",this.content.innerHTML='<p class="error-message">Failed to load artist information. Please try again later.</p>')}}const _=new T,I="https://sound-wave.b.goit.study/api",d=8;class p{constructor(){this.artistsList=document.getElementById("artists-list"),this.loadMoreBtn=document.getElementById("load-more"),this.currentPage=1,this.isLoading=!1,this.allArtists=[],this.init()}async init(){try{await this.loadArtists(),this.renderArtists(),this.setupEventListeners()}catch{this.showError()}}setupEventListeners(){this.loadMoreBtn&&this.loadMoreBtn.addEventListener("click",()=>this.loadMore())}async loadArtists(){if(!this.isLoading){this.isLoading=!0,this.showLoadingState();try{const e=await fetch(`${I}/artists`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();Array.isArray(t)?this.allArtists=t:t&&Array.isArray(t.artists)?this.allArtists=t.artists:t&&typeof t=="object"?this.allArtists=Object.values(t):this.allArtists=[]}catch(e){throw e}finally{this.isLoading=!1,this.hideLoadingState()}}}renderArtists(){if(!this.artistsList)return;const e=0,t=this.currentPage*d,r=this.allArtists.slice(e,t);this.artistsList.innerHTML="",r.forEach(i=>{const n=this.createArtistCard(i);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}addMoreArtists(){if(!this.artistsList)return;const e=(this.currentPage-1)*d,t=this.currentPage*d;this.allArtists.slice(e,t).forEach(i=>{const n=this.createArtistCard(i);this.artistsList.appendChild(n)}),this.updateLoadMoreButton()}createArtistCard(e){const t=document.createElement("div");t.className="artist-card";const r=e._id||e.idArtist;t.dataset.artistId=r,t.innerHTML=`
      <div class="artist-card__image">
        <img 
          src="${e.strArtistThumb||""}" 
          alt="${e.strArtist||""}" 
          loading="lazy"
        />
      </div>

      <div class="artist-card__content">
        <div class="artist-card__genres">
          ${(e.genres||[]).map(n=>`<span class="artist-card__genre">${n}</span>`).join("")}
        </div>

        <h3 class="artist-card__name">
          ${e.strArtist||""}
        </h3>

        <p class="artist-card__description">
          ${this.truncateText(e.strBiographyEN||"",150)}
        </p>

        <button class="artist-card__link" type="button" data-learn-more>
          Learn More
          <svg class="artist-card__icon" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
            <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;const i=t.querySelector("[data-learn-more]");return i&&i.addEventListener("click",()=>{_.open(r)}),t}truncateText(e,t){return!e||e.length<=t?e:e.substring(0,t).trim()+"..."}loadMore(){this.isLoading||(this.currentPage++,this.addMoreArtists())}updateLoadMoreButton(){if(!this.loadMoreBtn)return;this.currentPage*d<this.allArtists.length?(this.loadMoreBtn.style.display="block",this.loadMoreBtn.disabled=!1):this.loadMoreBtn.style.display="none"}showLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!0,this.loadMoreBtn.textContent="Loading...")}hideLoadingState(){this.loadMoreBtn&&(this.loadMoreBtn.disabled=!1,this.loadMoreBtn.textContent="Load More")}showError(){this.artistsList&&(this.artistsList.innerHTML=`
        <div class="artists__error">
          <p>Failed to load artists. Please try again later.</p>
        </div>
      `),this.loadMoreBtn&&(this.loadMoreBtn.style.display="none")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new p}):new p;const A=document.querySelector(".about-logo-use");A.setAttribute("href",`${l}#icon-logo-icon`);A.setAttribute("xlink:href",`${l}#icon-logo-icon`);const y="/RhythMix/img/feedback/icon-arrow-left.svg",g="/RhythMix/img/feedback/icon-arrow-right.svg",P="https://sound-wave.b.goit.study/api/feedbacks",H=10,o={wrapper:document.querySelector(".feedback"),swiperEl:document.querySelector(".feedback-swiper"),slidesEl:document.querySelector(".feedback-swiper .swiper-wrapper"),prevBtn:document.querySelector(".feedback-arrow--prev"),nextBtn:document.querySelector(".feedback-arrow--next"),dots:Array.from(document.querySelectorAll(".feedback-pagination .dot"))};D();U();function D(){const s=document.querySelector(".feedback-arrow--prev use"),e=document.querySelector(".feedback-arrow--next use");s&&(s.setAttribute("href",y),s.setAttribute("xlink:href",y)),e&&(e.setAttribute("href",g),e.setAttribute("xlink:href",g))}async function U(){if(!(!o.wrapper||!o.slidesEl))try{const s=await N(H);R(s),Y()}catch(s){k("Failed to load feedbacks."),console.error(s)}}async function N(s){const e=new URLSearchParams({limit:String(s),page:"1"}),t=await fetch(`${P}?${e.toString()}`);if(!t.ok)throw new Error(`Feedbacks request failed: ${t.status}`);const r=await t.json(),i=(r==null?void 0:r.data)??(r==null?void 0:r.feedbacks)??r??[];return Array.isArray(i)?i.slice(0,s):[]}function R(s){if(!s.length){k("No feedbacks available.");return}o.slidesEl.innerHTML=s.map(j).join(""),h(0,s.length)}function j(s){const e=(s==null?void 0:s.name)??"Anonymous",t=(s==null?void 0:s.descr)??"",r=V(Math.round(Number((s==null?void 0:s.rating)??0)));return`
    <div class="swiper-slide feedback-card">
      <div class="feedback-rating rating star-icon value-${r} label-hidden">
        <div class="label-value">${r}</div>
        <div class="star-container">
          ${F()}
        </div>
      </div>
      <p class="feedback-text">"${m(t)}"</p>
      <p class="feedback-author">${m(e)}</p>
    </div>
  `}function F(){return Array.from({length:5}).map(()=>`
        <div class="star icon">
          <i class="star-empty"></i>
          <i class="star-half"></i>
          <i class="star-filled"></i>
        </div>
      `).join("")}function Y(){o.swiperEl&&(a=new w(o.swiperEl,{modules:[M],slidesPerView:1,spaceBetween:24,navigation:{prevEl:o.prevBtn,nextEl:o.nextBtn},on:{slideChange(s){h(s.activeIndex,s.slides.length)}}}),h(a.activeIndex,a.slides.length),O(a.slides.length))}function h(s,e){var t,r,i,n;if(o.dots.length){if(o.dots.forEach(c=>c.classList.remove("is-active")),e<=1){(t=o.dots[0])==null||t.classList.add("is-active");return}if(s<=0){(r=o.dots[0])==null||r.classList.add("is-active");return}if(s>=e-1){(i=o.dots[2])==null||i.classList.add("is-active");return}(n=o.dots[1])==null||n.classList.add("is-active")}}let a=null;function O(){!o.dots.length||!a||(o.dots[0].onclick=()=>{a.slideTo(Math.max(a.activeIndex-1,0))},o.dots[1].onclick=()=>{a.slideTo(a.activeIndex)},o.dots[2].onclick=()=>{a.slideTo(Math.min(a.activeIndex+1,a.slides.length-1))})}function k(s){o.slidesEl.innerHTML=`
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">${m(s)}</p>
    </div>
  `}function V(s){return Number.isFinite(s)?Math.min(5,Math.max(0,s)):0}function m(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}document.querySelectorAll(".footer-logo-use").forEach(s=>{s.setAttribute("href",`${l}#icon-logo-2`)});document.querySelectorAll(".socials-icon use").forEach(s=>{const e=s.dataset.icon;s.setAttribute("href",`${l}#icon-${e}`)});
//# sourceMappingURL=index.js.map
