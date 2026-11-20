const titles = {
  ru: { home: 'Обзор погоды', forecast: 'Расширенный прогноз', map: 'Погодная карта', favorites: 'Избранное' },
  en: { home: 'Weather overview', forecast: 'Extended forecast', map: 'Weather map', favorites: 'Favorites' }
};

export function initNavigation() {
  const sidebar = document.querySelector('#sidebar');
  const title = document.querySelector('#pageTitle');
  const views = [...document.querySelectorAll('.page')];
  const buttons = [...document.querySelectorAll('[data-page]')];
  function openPage(page) {
    if (!titles.ru[page]) return;
    views.forEach(view => view.classList.toggle('active', view.id === `page-${page}`));
    buttons.forEach(button => button.classList.toggle('active', button.dataset.page === page));
    const language = localStorage.getItem('aeriq-language') || 'ru';
    title.textContent = titles[language][page];
    history.replaceState(null, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  buttons.forEach(button => button.addEventListener('click', () => openPage(button.dataset.page)));
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => openPage(button.dataset.go)));
  document.querySelector('#collapseSidebar').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const collapsed = sidebar.classList.contains('collapsed');
    document.querySelector('#collapseSidebar').setAttribute('aria-label', collapsed ? 'Развернуть меню' : 'Свернуть меню');
  });
  const initial = location.hash.slice(1);
  openPage(titles.ru[initial] ? initial : 'home');
}
