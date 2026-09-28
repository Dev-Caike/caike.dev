// Tema claro/escuro (a preferência inicial é aplicada no <head> do index.html)
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
  const escuro = root.classList.toggle('dark');
  try {
    localStorage.setItem('tema', escuro ? 'dark' : 'light');
  } catch (e) {
    // sem localStorage: o tema vale só para esta visita
  }
});

// Menu mobile
const nav = document.querySelector('header nav');
const menuToggle = document.querySelector('.menu-toggle');

function definirMenu(aberto) {
  nav.classList.toggle('aberto', aberto);
  menuToggle.classList.toggle('aberto', aberto);
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
  definirMenu(!nav.classList.contains('aberto'));
});

nav.querySelectorAll('ul a').forEach((link) => {
  link.addEventListener('click', () => definirMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') definirMenu(false);
});

// Copiar e-mail
document.querySelectorAll('[data-copiar]').forEach((botao) => {
  const textoOriginal = botao.textContent;
  botao.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(botao.dataset.copiar);
      botao.textContent = 'E-mail copiado';
    } catch (e) {
      botao.textContent = botao.dataset.copiar;
    }
    setTimeout(() => { botao.textContent = textoOriginal; }, 2500);
  });
});
