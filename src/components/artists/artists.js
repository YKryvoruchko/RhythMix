const artistsList = document.querySelector('#artists-list');

console.log('artistsList:', artistsList);
const testArtist = {
  name: 'Ren',
  image: '../../img/ren.png',
  genres: ['Alternative', 'Pop', 'Rock', 'Indie'],
  description:
    'Ren Eryn Gill, known professionally as Ren, is a multi-award-winning Welsh singer-songwriter...',
};

function createArtistCard(artist) {
  return `
    <div class="artist-card">
      <div class="artist-card__image">
        <img src="${artist.image}" alt="${artist.name}">
      </div>

      <div class="artist-card__content">
        <div class="artist-card__genres">
          ${artist.genres
            .map(
              (genre) =>
                `<span class="artist-card__genre">${genre}</span>`
            )
            .join('')}
        </div>

        <h3 class="artist-card__name">${artist.name}</h3>

        <p class="artist-card__description">
          ${artist.description}
        </p>

        <button class="artist-card__link">
          Learn More
          <svg width="8" height="14" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 14L8 7L0 0V14Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

artistsList.insertAdjacentHTML(
  'beforeend',
  createArtistCard(testArtist)
);