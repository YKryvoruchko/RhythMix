import './artists.css';
import { artistModal } from '../artist-modal/artist-modal.js';

const API_BASE_URL = 'https://sound-wave.b.goit.study/api';
const ARTISTS_PER_PAGE = 8;

class ArtistsSection {
  constructor() {
    this.artistsList = document.getElementById('artists-list');
    this.loadMoreBtn = document.getElementById('load-more');
    this.currentPage = 1;
    this.isLoading = false;
    this.allArtists = [];
    
    this.init();
  }

  async init() {
    try {
      await this.loadArtists();
      this.renderArtists();
      this.setupEventListeners();
    } catch (error) {
      this.showError();
    }
  }

  setupEventListeners() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => this.loadMore());
    }
  }

  async loadArtists() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoadingState();

    try {
      const response = await fetch(`${API_BASE_URL}/artists`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // API може повертати об'єкт з масивом artists або просто масив
      if (Array.isArray(data)) {
        this.allArtists = data;
      } else if (data && Array.isArray(data.artists)) {
        this.allArtists = data.artists;
      } else if (data && typeof data === 'object') {
        // Якщо це об'єкт, беремо всі значення як масив
        this.allArtists = Object.values(data);
      } else {
        this.allArtists = [];
      }
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
      this.hideLoadingState();
    }
  }

  renderArtists() {
    if (!this.artistsList) return;

    const startIndex = 0;
    const endIndex = this.currentPage * ARTISTS_PER_PAGE;
    const artistsToShow = this.allArtists.slice(startIndex, endIndex);

    this.artistsList.innerHTML = '';
    
    artistsToShow.forEach(artist => {
      const card = this.createArtistCard(artist);
      this.artistsList.appendChild(card);
    });

    this.updateLoadMoreButton();
  }

  addMoreArtists() {
    if (!this.artistsList) return;

    const startIndex = (this.currentPage - 1) * ARTISTS_PER_PAGE;
    const endIndex = this.currentPage * ARTISTS_PER_PAGE;
    const newArtists = this.allArtists.slice(startIndex, endIndex);

    newArtists.forEach(artist => {
      const card = this.createArtistCard(artist);
      this.artistsList.appendChild(card);
    });

    this.updateLoadMoreButton();
  }

  createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'artist-card';
    const artistId = artist._id || artist.idArtist;
    card.dataset.artistId = artistId;

    card.innerHTML = `
      <div class="artist-card__image">
        <img 
          src="${artist.strArtistThumb || ''}" 
          alt="${artist.strArtist || ''}" 
          loading="lazy"
        />
      </div>

      <div class="artist-card__content">
        <div class="artist-card__genres">
          ${(artist.genres || [])
            .map(
              (genre) =>
                `<span class="artist-card__genre">${genre}</span>`
            )
            .join('')}
        </div>

        <h3 class="artist-card__name">
          ${artist.strArtist || ''}
        </h3>

        <p class="artist-card__description">
          ${this.truncateText(artist.strBiographyEN || '', 150)}
        </p>

        <button class="artist-card__link" type="button" data-learn-more>
          Learn More
          <svg class="artist-card__icon" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
            <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;

    // Додаємо обробник для кнопки Learn More
    const learnMoreBtn = card.querySelector('[data-learn-more]');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', () => {
        artistModal.open(artistId);
      });
    }

    return card;
  }

  truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  loadMore() {
    if (this.isLoading) return;
    
    this.currentPage++;
    this.addMoreArtists();
  }

  updateLoadMoreButton() {
    if (!this.loadMoreBtn) return;

    const totalShown = this.currentPage * ARTISTS_PER_PAGE;
    const hasMore = totalShown < this.allArtists.length;

    if (hasMore) {
      this.loadMoreBtn.style.display = 'block';
      this.loadMoreBtn.disabled = false;
    } else {
      this.loadMoreBtn.style.display = 'none';
    }
  }

  showLoadingState() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.disabled = true;
      this.loadMoreBtn.textContent = 'Loading...';
    }
  }

  hideLoadingState() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.disabled = false;
      this.loadMoreBtn.textContent = 'Load More';
    }
  }

  showError() {
    if (this.artistsList) {
      this.artistsList.innerHTML = `
        <div class="artists__error">
          <p>Failed to load artists. Please try again later.</p>
        </div>
      `;
    }
    
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display = 'none';
    }
  }
}

// Ініціалізація при завантаженні DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArtistsSection();
  });
} else {
  new ArtistsSection();
}

export function createArtistCard(artist) {
  const card = document.createElement('div');
  card.className = 'artist-card';

  card.innerHTML = `
    <div class="artist-card__image">
      <img 
        src="${artist.strArtistThumb || ''}" 
        alt="${artist.strArtist || ''}" 
      />
    </div>

    <div class="artist-card__content">
      <div class="artist-card__genres">
        ${(artist.genres || [])
          .map(
            (genre) =>
              `<span class="artist-card__genre">${genre}</span>`
          )
          .join('')}
      </div>

      <h3 class="artist-card__name">
        ${artist.strArtist || ''}
      </h3>

      <p class="artist-card__description">
        ${artist.strBiographyEN || ''}
      </p>

      <button class="artist-card__link" type="button">
        Learn More
        <svg class="artist-card__icon" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
          <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  `;

  return card;
}
