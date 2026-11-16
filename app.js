const icon = (name) => {
  const paths = {
    leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z"/><path d="M4 21c2-5 6-9 12-12"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.leaf}</svg>`;
};

document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

document.querySelectorAll('a.read-more[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
});

const speciesExplorer = document.querySelector('[data-species-explorer]');
if (speciesExplorer) {
  const speciesCards = Array.from(document.querySelectorAll('.species-card[data-species-category]'));
  const filterButtons = Array.from(speciesExplorer.querySelectorAll('[data-species-filter]'));
  const searchInput = speciesExplorer.querySelector('[data-species-search]');
  const speciesCount = speciesExplorer.querySelector('[data-species-count]');
  const emptyMessage = document.querySelector('[data-species-empty]');
  let activeSpeciesFilter = 'all';

  const updateSpeciesResults = () => {
    const query = searchInput.value.trim().toLocaleLowerCase('id');
    let visibleCount = 0;
    speciesCards.forEach((card) => {
      const matchesFilter = activeSpeciesFilter === 'all' || card.dataset.speciesCategory === activeSpeciesFilter;
      const matchesSearch = !query || card.textContent.toLocaleLowerCase('id').includes(query);
      card.hidden = !matchesFilter || !matchesSearch;
      if (!card.hidden) visibleCount += 1;
    });
    speciesCount.textContent = `${visibleCount} spesies ditampilkan`;
    emptyMessage.hidden = visibleCount !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeSpeciesFilter = button.dataset.speciesFilter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateSpeciesResults();
    });
  });
  searchInput.addEventListener('input', updateSpeciesResults);
  updateSpeciesResults();
}

const revealTargets = Array.from(document.querySelectorAll(
  '.section-head,.story-card,.habitat-explorer,.quiz-card,.map-card,.carbon-card,.visit-planner,.adoption,.about-story>*,.benefit-card,.guideline-card,.species-card,.tour-frame,.article-card,.article-detail,.contact-aside,.form-card'
)).filter((element) => !element.hasAttribute('data-aos'));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

// Estimasi perjalanan pulang-pergi menggunakan faktor emisi mobil 0,12 kg CO2/km.
const distanceInput = document.querySelector('#distance');
const emissionOutput = document.querySelector('#emission-result');
const seedlingOutput = document.querySelector('#seedling-result');
const updateCarbon = () => {
  if (!distanceInput || !emissionOutput || !seedlingOutput) return;
  const distance = Math.max(0, Number(distanceInput.value) || 0);
  const kgCo2 = distance * 2 * 0.12;
  const seedlings = Math.ceil(kgCo2 / 10);
  emissionOutput.textContent = `${kgCo2.toFixed(1)} kg`;
  seedlingOutput.textContent = `${seedlings} bibit`;
};
distanceInput?.addEventListener('input', updateCarbon);
updateCarbon();

const quizCard = document.querySelector('[data-quiz]');
if (quizCard) {
  const questions = [
    {
      prompt: 'Bagaimana akar mangrove membantu menjaga garis pantai?',
      answers: [
        'Menahan sedimen dan membantu meredam energi gelombang',
        'Menghentikan pasang surut sepenuhnya',
        'Mengubah air laut menjadi air tawar'
      ],
      correct: 0,
      explanation: 'Tepat! Akar mangrove membantu menangkap sedimen dan meredam energi gelombang.'
    },
    {
      prompt: 'Kamu bertemu monyet ekor panjang. Apa sikap terbaik?',
      answers: [
        'Memberinya camilan supaya lebih dekat',
        'Mengamati dari jauh dan tidak memberinya makan',
        'Memanggilnya keras-keras untuk berfoto'
      ],
      correct: 1,
      explanation: 'Betul. Menjaga jarak dan tidak memberi makan membantu satwa tetap liar dan sehat.'
    },
    {
      prompt: 'Apa kebiasaan baik saat menjelajahi jalur mangrove?',
      answers: [
        'Meninggalkan botol sekali pakai di tepi jalur',
        'Memetik daun sebagai suvenir',
        'Membawa botol isi ulang dan membawa pulang sampah sendiri'
      ],
      correct: 2,
      explanation: 'Benar! Bawa pulang sampahmu dan tetap berada di jalur yang diizinkan.'
    }
  ];
  const questionElement = quizCard.querySelector('[data-quiz-question]');
  const optionsElement = quizCard.querySelector('[data-quiz-options]');
  const feedbackElement = quizCard.querySelector('[data-quiz-feedback]');
  const nextButton = quizCard.querySelector('[data-quiz-next]');
  const retryButton = quizCard.querySelector('[data-quiz-retry]');
  const stage = quizCard.querySelector('.quiz-stage');
  const result = quizCard.querySelector('[data-quiz-result]');
  const progress = quizCard.querySelector('[data-quiz-progress]');
  const progressBar = quizCard.querySelector('[role="progressbar"]');
  let questionIndex = 0;
  let score = 0;
  let answered = false;

  const renderQuestion = () => {
    const question = questions[questionIndex];
    answered = false;
    quizCard.querySelector('[data-quiz-step]').innerHTML = `${String(questionIndex + 1).padStart(2, '0')} <span>/ ${String(questions.length).padStart(2, '0')}</span>`;
    questionElement.textContent = question.prompt;
    optionsElement.replaceChildren();
    question.answers.forEach((answer, answerIndex) => {
      const option = document.createElement('button');
      option.className = 'quiz-option';
      option.type = 'button';
      option.textContent = answer;
      option.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = answerIndex === question.correct;
        if (isCorrect) score += 1;
        option.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        optionsElement.querySelectorAll('button').forEach((item, index) => {
          item.disabled = true;
          if (index === question.correct && !isCorrect) item.classList.add('is-correct');
        });
        feedbackElement.textContent = question.explanation;
        feedbackElement.classList.toggle('is-correct', isCorrect);
        feedbackElement.hidden = false;
        nextButton.hidden = false;
        progress.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
        progressBar.setAttribute('aria-valuenow', String(questionIndex + 1));
        nextButton.focus();
      });
      optionsElement.append(option);
    });
    feedbackElement.hidden = true;
    nextButton.hidden = true;
    result.hidden = true;
    stage.hidden = false;
    progress.style.width = `${(questionIndex / questions.length) * 100}%`;
    progressBar.setAttribute('aria-valuenow', String(questionIndex));
  };

  nextButton.addEventListener('click', () => {
    questionIndex += 1;
    if (questionIndex < questions.length) {
      renderQuestion();
      questionElement.focus?.();
      return;
    }
    stage.hidden = true;
    result.hidden = false;
    quizCard.querySelector('[data-quiz-step]').innerHTML = `${String(questions.length).padStart(2, '0')} <span>/ ${String(questions.length).padStart(2, '0')}</span>`;
    progress.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', String(questions.length));
    quizCard.querySelector('[data-quiz-title]').textContent = score === questions.length
      ? 'Keren, Penjaga Pesisir!'
      : score > 0 ? 'Kamu Sahabat Pesisir!' : 'Awal yang baik!';
    quizCard.querySelector('[data-quiz-summary]').textContent = `Jawaban benar: ${score} dari ${questions.length}. Bawa kebiasaan baik ini saat berkunjung ke alam.`;
    retryButton.focus();
  });

  retryButton.addEventListener('click', () => {
    questionIndex = 0;
    score = 0;
    renderQuestion();
    questionElement.focus?.();
  });

  renderQuestion();
}

const habitatTabs = Array.from(document.querySelectorAll('[data-habitat-tab]'));
const habitatPanels = Array.from(document.querySelectorAll('[data-habitat-panel]'));
const activateHabitatTab = (tab, moveFocus = false) => {
  habitatTabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  habitatPanels.forEach((panel) => {
    panel.hidden = panel.dataset.habitatPanel !== tab.dataset.habitatTab;
  });
  if (moveFocus) tab.focus();
};

habitatTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateHabitatTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % habitatTabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + habitatTabs.length) % habitatTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = habitatTabs.length - 1;
    else return;
    event.preventDefault();
    activateHabitatTab(habitatTabs[nextIndex], true);
  });
});

const visitChecklist = document.querySelector('[data-visit-checklist]');
if (visitChecklist) {
  const checks = Array.from(visitChecklist.querySelectorAll('[data-visit-check]'));
  const progressBar = visitChecklist.querySelector('[data-visit-progress]');
  const progressFill = visitChecklist.querySelector('[data-visit-progress-fill]');
  const progressLabel = visitChecklist.querySelector('[data-visit-progress-label]');
  const resetButton = visitChecklist.querySelector('[data-visit-reset]');
  const storageKey = 'ecopath-visit-checklist-v1';
  let storageAvailable = true;

  try {
    const savedChecks = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(savedChecks)) {
      checks.forEach((check, index) => { check.checked = savedChecks[index] === true; });
    }
  } catch (error) {
    storageAvailable = false;
    console.warn('Checklist kunjungan tidak dapat dibaca dari penyimpanan lokal.', error);
  }

  const updateVisitChecklist = () => {
    const completeCount = checks.filter((check) => check.checked).length;
    const percentage = checks.length ? (completeCount / checks.length) * 100 : 0;
    progressFill.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', String(completeCount));
    progressLabel.textContent = `${completeCount} dari ${checks.length} langkah siap`;
    if (!storageAvailable) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checks.map((check) => check.checked)));
    } catch (error) {
      storageAvailable = false;
      console.warn('Checklist kunjungan tidak dapat disimpan di penyimpanan lokal.', error);
    }
  };

  checks.forEach((check) => check.addEventListener('change', updateVisitChecklist));
  resetButton?.addEventListener('click', () => {
    checks.forEach((check) => { check.checked = false; });
    updateVisitChecklist();
    checks[0]?.focus();
  });
  updateVisitChecklist();
}

document.querySelectorAll('form[data-local-form]').forEach((form) => {
  const requiredFields = Array.from(form.querySelectorAll('[required]'));
  const progress = form.querySelector('[data-form-progress]');
  const progressBar = progress?.querySelector('[role="progressbar"]');
  const progressFill = progress?.querySelector('[data-form-progress-fill]');
  const progressText = progress?.querySelector('[data-form-progress-text]');
  const updateFormProgress = () => {
    if (!progressBar || !progressFill || !progressText) return;
    const completed = requiredFields.filter((field) => field.validity.valid).length;
    const percentage = requiredFields.length ? (completed / requiredFields.length) * 100 : 0;
    progressBar.setAttribute('aria-valuenow', String(completed));
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = completed === requiredFields.length
      ? 'Semua informasi wajib siap dikirim'
      : `${completed} dari ${requiredFields.length} informasi wajib lengkap`;
  };
  form.addEventListener('input', updateFormProgress);
  form.addEventListener('change', updateFormProgress);
  updateFormProgress();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Terima kasih! Ini demo saja; formulir belum dikirim.';
    form.reset();
    updateFormProgress();
  });
});

let toastTimer;
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

if (window.AOS) AOS.init({ duration: 650, once: true, offset: 50 });

const mapElement = document.querySelector('#eco-map');
if (mapElement && window.L) {
  // Pusat peta berada di kawasan pesisir Gunung Anyar; titik fasilitas ditandai sebagai titik ilustratif.
  const map = L.map(mapElement, { scrollWheelZoom: false }).setView([-7.3385, 112.8212], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const places = [
    { name: 'Dermaga Susur Sungai', coords: [-7.3392, 112.8198] },
    { name: 'Menara Pandang 12 m', coords: [-7.3368, 112.8223] },
    { name: 'Boardwalk Kayu', coords: [-7.338, 112.823] },
    { name: 'Area Pembibitan', coords: [-7.3403, 112.8211] }
  ];
  places.forEach((place) => {
    const markerIcon = L.divIcon({ className: 'custom-marker', iconSize: [18, 18], iconAnchor: [9, 9] });
    L.marker(place.coords, { icon: markerIcon }).addTo(map).bindPopup(`<strong>${place.name}</strong><br>Ekowisata Mangrove Gunung Anyar`);
  });
}

const tourViewer = document.querySelector('#tour-viewer');
if (tourViewer && window.pannellum) {
  const viewer = pannellum.viewer('tour-viewer', {
    default: {
      firstScene: 'boardwalk',
      sceneFadeDuration: 700
    },
    scenes: {
      boardwalk: { type: 'equirectangular', panorama: './assets/boardwalk-panorama.png', autoLoad: true, hfov: 105, pitch: 0, yaw: 0 },
      lookout: { type: 'equirectangular', panorama: './assets/lookout-panorama.png', autoLoad: true, hfov: 105, pitch: 0, yaw: 0 }
    }
  });
  document.querySelectorAll('[data-tour]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tour]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      viewer.loadScene(button.dataset.tour);
    });
  });
}
