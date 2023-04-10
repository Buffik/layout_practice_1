export const addNavLinksHandler = (burgerButton, navMenu) => {
  const links = document.querySelectorAll('.go-smooth');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (navMenu.classList.contains('active-burger')) {
        navMenu.classList.remove('active-burger');
        burgerButton.classList.remove('rotate-burger');
        document.body.classList.remove('no-scroll');
      }

      const blockID = link.getAttribute('href').substring(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};
