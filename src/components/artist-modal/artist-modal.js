const API_BASE_URL = 'https://sound-wave.b.goit.study/api';

class ArtistModal {
  constructor() {
    this.initialized = false;
    this.backdrop = null;
    this.closeBtn = null;
    this.loader = null;
    this.content = null;
    this.elements = {};
  }

  initElements() {
    if (this.initialized) return;
    
    this.backdrop = document.querySelector('[data-modal-backdrop]');
    this.closeBtn = document.querySelector('[data-modal-close]');
    this.loader = document.querySelector('[data-loader]');
    this.content = document.querySelector('.artist-modal-content');
    
    this.elements = {
      image: document.querySelector('[data-artist-image]'),
      name: document.querySelector('#artist-modal-title'),
      years: document.querySelector('[data-artist-years]'),
      sex: document.querySelector('[data-artist-gender]'),
      members: document.querySelector('[data-artist-members]'),
      country: document.querySelector('[data-artist-country]'),
      genres: document.querySelector('[data-artist-genres]'),
      biography: document.querySelector('[data-artist-bio]'),
      albumsList: document.querySelector('[data-artist-albums]')
    };

    if (this.backdrop && this.closeBtn) {
      this.init();
      this.initialized = true;
    } else {
      console.error('Required modal elements not found!');
    }
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop && !this.backdrop.classList.contains('is-hidden')) {
        this.close();
      }
    });
  }

  async open(artistId) {
    this.initElements();
    
    if (!this.backdrop) {
      return;
    }

    this.backdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    
    this.clearContent();
    this.showLoader();
    
    try {
      const data = await this.fetchArtistData(artistId);
      this.renderArtistData(data);
      this.hideLoader();
    } catch (error) {
      console.error('Error loading artist data:', error);
      this.hideLoader();
      this.showError();
    }
  }

  close() {
    if (!this.backdrop) return;
    this.backdrop.classList.add('is-hidden');
    document.body.style.overflow = '';
  }

  showLoader() {
    if (this.loader && this.content) {
      this.loader.style.display = 'flex';
      this.content.style.visibility = 'hidden';
    }
    if (this.elements.albumsList) {
      this.elements.albumsList.style.visibility = 'hidden';
    }
  }

  hideLoader() {
    if (this.loader && this.content) {
      this.loader.style.display = 'none';
      this.content.style.visibility = 'visible';
    }
    if (this.elements.albumsList) {
      this.elements.albumsList.style.visibility = 'visible';
    }
  }

  clearContent() {
    if (this.elements.image) {
      this.elements.image.src = '';
      this.elements.image.alt = 'Artist';
    }

    if (this.elements.name) {
      this.elements.name.textContent = '';
    }

    if (this.elements.years) {
      this.elements.years.textContent = 'information missing';
    }

    if (this.elements.sex) {
      this.elements.sex.textContent = '';
      const sexDetail = this.elements.sex.closest('.artist-modal-sex-item');
      if (sexDetail) sexDetail.style.display = 'none';
    }

    if (this.elements.members) {
      this.elements.members.textContent = '';
      const membersDetail = this.elements.members.closest('.artist-modal-members-item');
      if (membersDetail) membersDetail.style.display = 'none';
    }

    if (this.elements.country) {
      this.elements.country.textContent = '';
    }

    if (this.elements.genres) {
      this.elements.genres.innerHTML = '';
    }

    if (this.elements.biography) {
      this.elements.biography.textContent = '';
    }

    if (this.elements.albumsList) {
      this.elements.albumsList.innerHTML = '';
    }
  }

  async fetchArtistData(artistId) {
    const url = `${API_BASE_URL}/artists/${artistId}/albums`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  renderArtistData(data) {
    if (!data) {
      return;
    }

    try {
      if (this.elements.image) {
        this.elements.image.src = data.strArtistThumb || '';
        this.elements.image.alt = data.strArtist || 'Artist';
      }

      if (this.elements.name) {
        this.elements.name.textContent = data.strArtist || '';
      }

      if (this.elements.years) {
        const yearsActive = this.formatYearsActive(data.intFormedYear, data.intDiedYear);
        this.elements.years.textContent = yearsActive;
      }

      if (this.elements.sex) {
        const sexDetail = this.elements.sex.closest('.artist-modal-sex-item');
        if (data.strGender && sexDetail) {
          sexDetail.style.display = 'flex';
          this.elements.sex.textContent = data.strGender;
        } else if (sexDetail) {
          sexDetail.style.display = 'none';
        }
      }

      if (this.elements.members) {
        const membersDetail = this.elements.members.closest('.artist-modal-members-item');
        if (data.intMembers && membersDetail) {
          membersDetail.style.display = 'flex';
          this.elements.members.textContent = data.intMembers;
        } else if (membersDetail) {
          membersDetail.style.display = 'none';
        }
      }

      if (this.elements.country) {
        this.elements.country.textContent = data.strCountry || '';
      }

      if (this.elements.genres) {
        this.renderGenres(data.genres);
      }

      if (this.elements.biography) {
        this.elements.biography.textContent = data.strBiographyEN || '';
      }

      if (this.elements.albumsList) {
        this.renderAlbums(data.albumsList);
      }
    } catch (error) {
      console.error('Error during rendering:', error);
    }
  }

  formatYearsActive(start, end) {
    if (!start) return 'information missing';
    const endYear = end || 'present';
    return `${start}-${endYear}`;
  }

  renderGenres(genres) {
    if (!genres || genres.length === 0) {
      this.elements.genres.innerHTML = '';
      return;
    }

    const genresHTML = genres.map(genre => 
      `<li class="artist-modal-genres-item">${genre}</li>`
    ).join('');
    
    this.elements.genres.innerHTML = genresHTML;
  }

  renderAlbums(albums) {
    if (!albums || albums.length === 0) {
      this.elements.albumsList.innerHTML = '<p class="no-albums">No albums available</p>';
      return;
    }

    const albumsHTML = albums.map(album => this.createAlbumHTML(album)).join('');
    this.elements.albumsList.innerHTML = albumsHTML;

    this.attachYouTubeListeners();
  }

  createAlbumHTML(album) {
    const tracks = album.tracks || [];
    const tracksHTML = tracks.map(track => `
      <div class="track-item">
        <span class="track-title">${track.strTrack || ''}</span>
        <span class="track-duration">${this.formatDuration(track.intDuration)}</span>
        ${track.movie ? `
          <button class="youtube-btn" data-youtube-link="${track.movie}" type="button" aria-label="Watch on YouTube">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.8 4.8C15.8 4.8 15.6 3.4 15 2.8C14.2 2 13.4 2 13 1.9C10.9 1.8 8 1.8 8 1.8C8 1.8 5.1 1.8 3 1.9C2.6 2 1.8 2 1 2.8C0.4 3.4 0.2 4.8 0.2 4.8C0.2 4.8 0 6.4 0 8V9.6C0 11.2 0.2 12.8 0.2 12.8C0.2 12.8 0.4 14.2 1 14.8C1.8 15.6 2.8 15.6 3.2 15.7C4.8 15.8 8 15.9 8 15.9C8 15.9 10.9 15.9 13 15.8C13.4 15.8 14.2 15.8 15 15C15.6 14.4 15.8 13 15.8 13C15.8 13 16 11.4 16 9.8V8C16 6.4 15.8 4.8 15.8 4.8ZM6.4 10.8V5.2L10.6 8L6.4 10.8Z" fill="currentColor"/>
            </svg>
          </button>
        ` : '<span></span>'}
      </div>
    `).join('');

    return `
      <div class="album-item">
        <div class="album-header">
          <h4 class="album-title">${album.strAlbum || ''}</h4>
          <span class="album-year">${album.intYearReleased || ''}</span>
        </div>
        <div class="album-tracks">
          <div class="album-tracks-header">
            <span>Track</span>
            <span>Time</span>
            <span>Link</span>
          </div>
          <div class="album-tracks-list">
            ${tracksHTML}
          </div>
        </div>
      </div>
    `;
  }

  formatDuration(ms) {
    if (!ms) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  attachYouTubeListeners() {
    const youtubeBtns = this.elements.albumsList.querySelectorAll('[data-youtube-link]');
    youtubeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = btn.dataset.youtubeLink;
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  showError() {
    if (this.content) {
      this.content.style.display = 'block';
      this.content.innerHTML = '<p class="error-message">Failed to load artist information. Please try again later.</p>';
    }
  }
}

export default ArtistModal;

export const artistModal = new ArtistModal();