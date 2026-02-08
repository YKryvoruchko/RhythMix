const exploreBtn = document.querySelector('.btn-explore');
const nextSection = document.querySelector('#artists');

exploreBtn.addEventListener('click', () => {
  nextSection.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start'     
  });
});