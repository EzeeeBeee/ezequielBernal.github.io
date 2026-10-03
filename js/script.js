// ===== Año dinámico en footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Toggle de tema con persistencia =====
const toggle = document.getElementById('theme-toggle');
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'dark') {
  document.body.classList.add('dark');
  toggle.textContent = '☀️';
}
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const esOscuro = document.body.classList.contains('dark');
  toggle.textContent = esOscuro ? '☀️' : '🌙';
  localStorage.setItem('tema', esOscuro ? 'dark' : 'light');
});

// ===== Efecto typing en el hero =====
const frases = [
  'Estudiante de Programación',
  'Desarrollador Jr',
  'C# · C++ · .NET · Web'
];
const elTyping = document.getElementById('typing');
let fIdx = 0, cIdx = 0, borrando = false;

function escribir() {
  const frase = frases[fIdx];
  if (!borrando) {
    elTyping.textContent = frase.slice(0, ++cIdx);
    if (cIdx === frase.length) {
      borrando = true;
      return setTimeout(escribir, 1800);
    }
  } else {
    elTyping.textContent = frase.slice(0, --cIdx);
    if (cIdx === 0) {
      borrando = false;
      fIdx = (fIdx + 1) % frases.length;
    }
  }
  setTimeout(escribir, borrando ? 40 : 80);
}
escribir();

// ===== Reveal on scroll =====
const observador = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observador.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));

// ===== Nav activo según sección visible =====
const secciones = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar nav a');
const obsNav = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('activo'));
      const link = document.querySelector(`.navbar nav a[href="#${e.target.id}"]`);
      if (link) link.classList.add('activo');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
secciones.forEach(s => obsNav.observe(s));
