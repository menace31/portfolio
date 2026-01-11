// script.js — portfolio avec traductions et projets
async function loadJSON(path){
  const res = await fetch(path, { cache: 'no-store' });
  if(!res.ok) throw new Error(`Impossible de charger ${path}`);
  return res.json();
}

function applyTranslations(translations){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(key && translations[key]) el.textContent = translations[key];
  });
}

async function loadTranslations(lang){
  try{
    const all = await loadJSON('translations.json');
    const translations = all[lang] || all['en'];
    applyTranslations(translations);
    document.documentElement.lang = lang;
    return translations;
  }catch(err){
    console.error(err);
    return {};
  }
}

async function loadProjectsForLang(lang, translations){
  try{
    const projects = await loadJSON(`projects.${lang}.json`);
    renderProjects(projects, translations);
  }catch(err){
    try{
      const projects = await loadJSON('projects.json');
      renderProjects(projects, translations);
    }catch(e){
      const grid = document.getElementById('projects-grid');
      if(grid) grid.innerHTML = '<p>Impossible de charger les projets.</p>';
    }
  }
}

function renderProjects(projects, translations){
  // Séparer les projets par catégorie
  const studyProjects = projects.filter(p => p.category === 'study');
  const personalProjects = projects.filter(p => p.category === 'personal');
  
  // Rendre les projets d'étude
  renderProjectsInGrid(studyProjects, 'projects-grid-study', translations);
  
  // Rendre les projets personnels
  renderProjectsInGrid(personalProjects, 'projects-grid-personal', translations);
  
  // Initialiser les carrousels
  initCarousel('study');
  initCarousel('personal');
}

function renderProjectsInGrid(projects, gridId, translations) {
  const grid = document.getElementById(gridId);
  if(!grid) return;
  
  grid.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card';

    if(project.image) {
      const img = document.createElement('img');
      img.className = 'card-image';
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';
      card.appendChild(img);
    }

    const content = document.createElement('div');
    content.className = 'card-content';

    content.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">
        ${(project.tags||[]).map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="links">
        <a class="btn btn-details" href="projects/${project.id}.html">
          ${translations['btn_details'] || 'Learn more'}
        </a>
        ${project.demo ? `<a class="btn" href="${project.demo}" target="_blank" rel="noopener">${translations['btn_demo'] || 'Demo'}</a>` : ''}
        ${project.repo ? `<a class="btn" href="${project.repo}" target="_blank" rel="noopener">${translations['btn_code'] || 'Code'}</a>` : ''}
      </div>
    `;

    card.appendChild(content);
    grid.appendChild(card);
  });
}

function initCarousel(category) {
  const grid = document.getElementById(`projects-grid-${category}`);
  const prevBtn = document.getElementById(`carousel-prev-${category}`);
  const nextBtn = document.getElementById(`carousel-next-${category}`);
  
  if (!grid || !prevBtn || !nextBtn) return;
  
  const cardWidth = 280; // minWidth of cards
  const gap = 16; // 1rem gap
  const scrollAmount = cardWidth + gap;
  
  function updateButtons() {
    const scrollLeft = grid.scrollLeft;
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    
    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= maxScroll - 1; // -1 for potential floating point precision
  }
  
  function scrollPrev() {
    grid.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }
  
  function scrollNext() {
    grid.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  
  // Event listeners
  prevBtn.addEventListener('click', scrollPrev);
  nextBtn.addEventListener('click', scrollNext);
  grid.addEventListener('scroll', updateButtons);
  
  // Initial button state
  updateButtons();
  
  // Update on window resize
  window.addEventListener('resize', updateButtons);
}

function detectLang(){
  const stored = localStorage.getItem('lang');
  if(stored) return stored;
  const nav = navigator.language || navigator.userLanguage || 'en';
  return nav.startsWith('fr') ? 'fr' : 'en';
}

document.addEventListener('DOMContentLoaded', async () => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const lang = detectLang();

  let translations = await loadTranslations(lang);
  await loadProjectsForLang(lang, translations);

  function setActiveLang(currentLang){
    langButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = (btnLang === currentLang);
      btn.classList.toggle('selected', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  setActiveLang(lang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const newLang = btn.getAttribute('data-lang');
      if(!newLang) return;
      localStorage.setItem('lang', newLang);
      translations = await loadTranslations(newLang);
      await loadProjectsForLang(newLang, translations);
      setActiveLang(newLang);
    });
  });
});