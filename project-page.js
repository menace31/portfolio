// project-page.js — script simplifié pour les pages de projets
async function loadTranslations(lang){
  try{
    const res = await fetch('../translations.json', { cache: 'no-store' });
    if(!res.ok) throw new Error('Impossible de charger les traductions');
    const all = await res.json();
    const translations = all[lang] || all['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(key && translations[key]) el.textContent = translations[key];
    });
    
    document.documentElement.lang = lang;
    return translations;
  }catch(err){
    console.error(err);
    return {};
  }
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

  await loadTranslations(lang);

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
      await loadTranslations(newLang);
      setActiveLang(newLang);
    });
  });
});