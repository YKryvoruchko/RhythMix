import './artists.css';
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


const artistsList = document.getElementById("artists-list");


export function createArtistCard(artist) {
  const card = document.createElement("div");
  card.className = "artist-card";

  card.innerHTML = `
    <div class="artist-card__image">
      <img
        src="${artist.strArtistThumb || "https://via.placeholder.com/640x393"}"
        alt="${artist.strArtist || "Artist"}"
      />
    </div>

    <div class="artist-card__content">
      <div class="artist-card__genres">
        ${(artist.genres || [])
          .map(
            (genre) =>
              `<span class="artist-card__genre">${genre}</span>`
          )
          .join("")}
      </div>

      <h3 class="artist-card__name">
        ${artist.strArtist || "Artist name"}
      </h3>

      <p class="artist-card__description">
        ${artist.strBiographyEN || "No description available"}
      </p>

      <button class="artist-card__link" type="button">
        Learn More
        <svg
          class="artist-card__icon"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          aria-hidden="true"
        >
          <path d="M0 14L8 7L0 0V14Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  `;

  return card;
}



const mockArtists = [
  {
    strArtist: "Artist Name",
    strArtistThumb: "https://via.placeholder.com/640x393",
    genres: ["Rock", "Indie"],
    strBiographyEN: "Short artist description goes here."
  },
  {
    strArtist: "Artist Name",
    strArtistThumb: "https://via.placeholder.com/640x393",
    genres: ["Pop"],
    strBiographyEN: "Short artist description goes here."
  }
];

mockArtists.forEach((artist) => {
  artistsList.appendChild(createArtistCard(artist));
});
