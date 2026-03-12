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

function openChat() {
  const chat = document.getElementById('chatWindow');
  if (chat) {
    if (chat.style.display === 'none' || chat.style.display === '') {
      chat.style.display = 'flex';
    } else {
      chat.style.display = 'none';
    }
  }
}

async function getAssistantResponse(userMessage, onChunkReceived) {
  const BASE_URL = "https://ia-portfolio.userboy.com";
  const now = new Date();
  const timeString = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  
  const prompt = `DATE ACTUELLE: ${timeString}. 
Tu es l'assistant de Maxime. Ta mission : répondre à la question du recruteur UNIQUEMENT en utilisant les faits extraits des documents.
RÈGLES STRICTES :
1. Si l'utilisateur ne pose pas une réelle question sur le profil de Maxime réponds lui poliment en lui demandant si il désire en savoir plus sur son parcours, ses compétences ou ses projets.
2. Réponds directement à la question en une ou deux phrases maximum.
3. Si l'information n'est pas dans les documents, réponds simplement : "Désolé, je n'ai pas cette information précise sur le profil de Maxime.`;

  const data = {
    "query": `[The recruiter question]: ${userMessage}`,
    "prompt": prompt
  };

  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      if (onChunkReceived) {
        onChunkReceived(chunk);
      }
    }

    return fullText;

  } catch (error) {
    console.error('Error fetching assistant response:', error);
    return "Désolé, une erreur est survenue.";
  }
}

window.sendQuery = async function() {
    const input = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    
    if (input.value.trim() !== "") {
        const userMsg = document.createElement('div');
        userMsg.textContent = input.value;
        userMsg.style.cssText = "background: var(--accent); color: #042024; padding: 8px; border-radius: 8px; align-self: flex-end; max-width: 80%;";
        chatBody.appendChild(userMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    const userInput = input.value;
    input.value = "";

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    const assistantMsg = document.createElement('div');
    assistantMsg.style.cssText = "background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px; align-self: flex-start;";
    let firstChunk = true;

    console.log("Requête envoyée :", userInput);
    await getAssistantResponse(userInput, (chunk) => {
        if (firstChunk) {
            typingIndicator.remove();
            chatBody.appendChild(assistantMsg);
            firstChunk = false;
        }
        assistantMsg.textContent += chunk;
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    if (firstChunk) {
        typingIndicator.remove();
        assistantMsg.textContent = "Désolé, une erreur est survenue.";
        chatBody.appendChild(assistantMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
};