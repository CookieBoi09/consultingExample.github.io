const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('#year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const inquiryForm = document.querySelector('#inquiry-form');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const name = data.get('name');
    const company = data.get('company');
    const need = data.get('need');
    const email = data.get('email');
    const message = data.get('message');
    const title = encodeURIComponent(`Project inquiry: ${company} — ${need}`);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nFocus: ${need}\n\nProject context:\n${message}`);
    window.open(`https://github.com/CookieBoi09/consultingExample.github.io/issues/new?title=${title}&body=${body}`, '_blank', 'noopener,noreferrer');
    document.querySelector('#form-note').textContent = 'Your inquiry is ready in a new tab. Review it, then submit on GitHub.';
  });
}
