// =============================
// Modern Portfolio – script.js
// =============================

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navMenu.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Theme toggle (light/dark) using CSS variable switch
const themeBtn = document.querySelector('.theme-toggle');
const root = document.documentElement;
const lightTheme = {
  '--bg': '#f6f7fb',
  '--bg-alt': '#ffffff',
  '--surface': '#ffffff',
  '--text': '#0b0d10',
  '--muted': '#4b5563',
  '--primary': '#7c5cff',
  '--primary-600': '#6b49ff',
  '--border': '#e5e7eb',
  '--chip': '#f1f2f7'
};

const darkTheme = {
  '--bg': '#0b0d10',
  '--bg-alt': '#101318',
  '--surface': '#131822',
  '--text': '#e7ecf3',
  '--muted': '#a8b0bd',
  '--primary': '#7c5cff',
  '--primary-600': '#6b49ff',
  '--border': '#1f2633',
  '--chip': '#1b2230'
};

function setTheme(theme) {
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));
}

// ===============================
// THEME TOGGLE
// ===============================
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') setTheme(lightTheme);
  else if (saved === 'dark') setTheme(darkTheme);
}
initTheme();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentIsDark = getComputedStyle(root)
      .getPropertyValue('--bg')
      .trim()
      .startsWith('#0');
    if (currentIsDark) {
      setTheme(lightTheme);
      localStorage.setItem('theme', 'light');
    } else {
      setTheme(darkTheme);
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ===============================
// CONTACT FORM HANDLER
// ===============================
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  const status = form.querySelector('.form-status');

  if (!name || !email) {
    status.textContent = 'Please provide your name and a valid email.';
    return;
  }

  // In production, send to backend or service like Formspree.
  status.textContent = `Thanks, ${name}! Your message has been prepared.`;
  const mailto = `mailto:YOUR_EMAIL@example.com?subject=Portfolio Enquiry from ${encodeURIComponent(
    name
  )}&body=${encodeURIComponent(msg + '\n\n(' + email + ')')}`;
  setTimeout(() => (window.location.href = mailto), 300);
}

// ===============================
// FOOTER YEAR
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// TYPING ANIMATION FOR HEADLINE
// ===============================
const texts = [
  "Aspiring Data Analyst",
  "Transforming data into actionable insights"
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetween = 1500; // pause before erasing

const typedText = document.getElementById("typed-text");
const cursor = document.querySelector(".cursor");

function type() {
  if (charIndex < texts[textIndex].length) {
    typedText.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex++;
    if (textIndex >= texts.length) textIndex = 0;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (texts.length) setTimeout(type, 500);
});
