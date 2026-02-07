const exploreBtn = document.querySelector('.btn-explore');
const nextSection = document.querySelector('#artists-section');

exploreBtn.addEventListener('click', () => {
  nextSection.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start'     
  });
});