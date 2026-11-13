(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const themeLabel = toggle.querySelector('.theme-label');
  const savedTheme = localStorage.getItem('fm-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  const updateThemeLabel = () => themeLabel.textContent = root.dataset.theme === 'light' ? 'Dark mode' : 'Light mode';
  updateThemeLabel();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('fm-theme', root.dataset.theme);
    updateThemeLabel();
  });

  const steps = [...document.querySelectorAll('.story-step')];
  const stageCounter = document.getElementById('stageCounter');
  const stageTitle = document.getElementById('stageTitle');
  const stageDescription = document.getElementById('stageDescription');
  const progressFill = document.getElementById('progressFill');
  const stageSvg = document.getElementById('stageSvg');
  const NS = 'http://www.w3.org/2000/svg';
  const stageData = [
    ['The processing core','A CPU follows instructions and performs the calculations that power a computer.'],
    ['A tool for calculation','The calculator makes number-crunching accessible: input, process, and display an answer.'],
    ['A computer takes shape','A computer brings processing, memory, storage, and input/output together in one flexible machine.'],
    ['Connected intelligence','Networks connect devices and services, allowing information and requests to move between systems.'],
    ['An AI agent in action','An AI agent can interpret a goal, plan steps, use tools, and check results — with human oversight.']
  ];
  const drawings = [
    `<rect x="190" y="130" width="180" height="180" rx="14"/><rect x="210" y="150" width="140" height="140" rx="8" stroke-dasharray="5 7"/><rect x="235" y="175" width="90" height="90" rx="5"/><path d="M255 196l-14 14 14 14m50-28 14 14-14 14m-17-34-14 48"/><path d="M225 105v25m35-25v25m35-25v25m35-25v25M225 310v25m35-25v25m35-25v25m35-25v25M165 165h25m-25 35h25m-25 35h25m-25 35h25M370 165h25m-25 35h25m-25 35h25m-25 35h25"/><path d="M160 365h240M175 380h210" opacity=".4"/>`,
    `<rect x="170" y="80" width="220" height="320" rx="18"/><rect x="195" y="110" width="170" height="70" rx="8"/><path d="M220 135h120m-120 20h75"/><g stroke-width="2"><rect x="205" y="205" width="42" height="42" rx="5"/><rect x="259" y="205" width="42" height="42" rx="5"/><rect x="313" y="205" width="42" height="42" rx="5"/><rect x="205" y="260" width="42" height="42" rx="5"/><rect x="259" y="260" width="42" height="42" rx="5"/><rect x="313" y="260" width="42" height="42" rx="5"/><rect x="205" y="315" width="42" height="42" rx="5"/><rect x="259" y="315" width="96" height="42" rx="5"/></g><path d="M220 225h12m-6-6v12m70-6h14m-7-7v14m69-6h-12m-60 74h20"/>`,
    `<rect x="115" y="110" width="330" height="230" rx="15"/><path d="M90 360h380l-35 35H125z"/><rect x="140" y="135" width="280" height="180" rx="5" stroke-dasharray="5 7"/><path d="M180 180h200m-200 35h145m-145 35h180"/><rect x="220" y="175" width="120" height="90" rx="8"/><path d="M250 205h60m-60 20h40M270 340v20m20-20v20"/>`,
    `<circle cx="280" cy="240" r="58"/><circle cx="280" cy="240" r="27"/><g><circle cx="130" cy="110" r="25"/><circle cx="430" cy="115" r="25"/><circle cx="110" cy="355" r="25"/><circle cx="445" cy="355" r="25"/><circle cx="280" cy="65" r="20"/><circle cx="280" cy="415" r="20"/></g><path d="M155 120l75 85m-75 130 75-75m155-155-75 85m75 145-75-75M280 85v97m0 116v97M130 135l-20 195m320-195 15 195"/><path d="M130 110h300M110 355h335" stroke-dasharray="4 8"/><circle cx="230" cy="205" r="7"/><circle cx="355" cy="205" r="7"/><circle cx="230" cy="275" r="7"/><circle cx="355" cy="275" r="7"/>`,
    `<path d="M280 80l125 72v145l-125 72-125-72V152z"/><path d="M280 120l90 52v105l-90 52-90-52V172z"/><circle cx="280" cy="225" r="43"/><path d="M280 182v-52m43 95h66m-109 43v52m-43-95h-66"/><circle cx="280" cy="130" r="9"/><circle cx="389" cy="225" r="9"/><circle cx="280" cy="320" r="9"/><circle cx="171" cy="225" r="9"/><path d="M280 205l-16 20 16 20 16-20z"/><path d="M105 95h65m-65 0v45m350-45h-65m65 0v45M105 385h65m-65 0v-45m350 45h-65m65 0v-45" stroke-dasharray="5 7"/>`
  ];
  function setStage(index) {
    const i = Math.max(0, Math.min(4, index));
    steps.forEach((step, n) => step.classList.toggle('is-active', n === i));
    stageCounter.textContent = `0${i+1} / 05`;
    stageTitle.textContent = stageData[i][0];
    stageDescription.textContent = stageData[i][1];
    progressFill.style.width = `${(i+1)*20}%`;
    const g = stageSvg.querySelector('.blueprint');
    g.style.opacity = '0';
    g.style.transform = 'scale(.94)';
    window.setTimeout(() => {
      g.innerHTML = drawings[i];
      g.style.opacity = '1';
      g.style.transform = 'scale(1)';
      const title = document.createElementNS(NS,'text');
      title.setAttribute('x','280'); title.setAttribute('y','355'); title.setAttribute('text-anchor','middle'); title.setAttribute('class','svg-title');
      title.textContent = ['CPU / CORE PROCESSOR','CALCULATOR / LOGIC','PERSONAL COMPUTER','NETWORK ARCHITECTURE','AUTONOMOUS AI AGENT'][i];
      const subtitle = document.createElementNS(NS,'text');
      subtitle.setAttribute('x','280'); subtitle.setAttribute('y','375'); subtitle.setAttribute('text-anchor','middle'); subtitle.setAttribute('class','svg-subtitle');
      subtitle.textContent = ['EXECUTING INSTRUCTIONS','INPUT  →  PROCESS  →  OUTPUT','HARDWARE + SOFTWARE','DEVICES + DATA + CONNECTIONS','GOAL  →  PLAN  →  ACTION'][i];
      g.append(title, subtitle);
    }, 180);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setStage(Number(visible.target.dataset.stage));
    }, {rootMargin:'-35% 0px -35% 0px',threshold:[0,.15,.35,.6]});
    steps.forEach(step => observer.observe(step));
  }
  setStage(0);
})();