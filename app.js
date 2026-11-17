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

document.querySelectorAll('.benefits-grid, .guidelines-grid').forEach((grid) => {
  const cards = Array.from(grid.querySelectorAll('details'));
  cards.forEach((card) => {
    card.addEventListener('toggle', () => {
      if (!card.open) return;
      cards.forEach((otherCard) => {
        if (otherCard !== card) otherCard.open = false;
      });
    });
  });
});

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
if (tourViewer) {
  const tourPhoto = tourViewer.querySelector('.tour-photo');
  const tourCaption = tourViewer.querySelector('.tour-photo-caption');
  const tourButtons = Array.from(document.querySelectorAll('[data-tour]'));
  const tourScenes = {
    boardwalk: {
      src: './assets/mangrovedua.jpg',
      alt: 'Jalur boardwalk di antara pepohonan mangrove',
      label: 'Jalur boardwalk'
    },
    lookout: {
      src: './assets/menara.jpeg',
      alt: 'Pemandangan menara di tengah kawasan mangrove',
      label: 'Pemandangan menara'
    }
  };
  const zoomInButton = tourViewer.querySelector('[data-photo-zoom-in]');
  const zoomOutButton = tourViewer.querySelector('[data-photo-zoom-out]');
  const resetButton = tourViewer.querySelector('[data-photo-reset]');
  const zoomStatus = tourViewer.querySelector('[data-photo-zoom-status]');
  const minScale = 1;
  const maxScale = 3;
  let scale = minScale;
  let panX = 0;
  let panY = 0;
  let dragState = null;

  const updatePhotoView = () => {
    const bounds = tourViewer.getBoundingClientRect();
    const maxPanX = bounds.width * (scale - 1) / 2;
    const maxPanY = bounds.height * (scale - 1) / 2;
    panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
    panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
    tourPhoto.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`;
    tourViewer.classList.toggle('is-zoomed', scale > minScale);
    zoomInButton.disabled = scale >= maxScale;
    zoomOutButton.disabled = scale <= minScale;
    zoomStatus.textContent = `Pembesaran ${Math.round(scale * 100)}%`;
  };

  const resetPhotoView = () => {
    scale = minScale;
    panX = 0;
    panY = 0;
    updatePhotoView();
  };

  zoomInButton.addEventListener('click', () => {
    scale = Math.min(maxScale, scale + 0.5);
    updatePhotoView();
  });
  zoomOutButton.addEventListener('click', () => {
    scale = Math.max(minScale, scale - 0.5);
    updatePhotoView();
  });
  resetButton.addEventListener('click', resetPhotoView);

  tourPhoto.addEventListener('pointerdown', (event) => {
    if (scale <= minScale) return;
    event.preventDefault();
    dragState = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX, panY };
    tourPhoto.setPointerCapture(event.pointerId);
    tourViewer.classList.add('is-dragging');
  });
  tourPhoto.addEventListener('pointermove', (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    panX = dragState.panX + event.clientX - dragState.x;
    panY = dragState.panY + event.clientY - dragState.y;
    updatePhotoView();
  });
  const stopPhotoDrag = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    dragState = null;
    tourViewer.classList.remove('is-dragging');
  };
  tourPhoto.addEventListener('pointerup', stopPhotoDrag);
  tourPhoto.addEventListener('pointercancel', stopPhotoDrag);

  tourButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const scene = tourScenes[button.dataset.tour];
      if (!scene) return;

      tourButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      resetPhotoView();
      tourPhoto.classList.remove('is-visible');
      tourPhoto.src = scene.src;
      tourPhoto.alt = scene.alt;
      tourCaption.textContent = scene.label;
      window.requestAnimationFrame(() => tourPhoto.classList.add('is-visible'));
    });
  });
  window.addEventListener('resize', updatePhotoView);
  updatePhotoView();
}

const initHotspotPins = () => {
  const pins = Array.from(document.querySelectorAll('[data-hotspot-pin]'));
  if (!pins.length) return;

  const closePins = (except = null) => {
    pins.forEach((pin) => {
      if (pin === except) return;
      pin.setAttribute('aria-expanded', 'false');
      document.getElementById(pin.getAttribute('aria-describedby'))?.classList.remove('is-open');
    });
  };

  pins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const open = pin.getAttribute('aria-expanded') !== 'true';
      closePins(pin);
      pin.setAttribute('aria-expanded', String(open));
      document.getElementById(pin.getAttribute('aria-describedby'))?.classList.toggle('is-open', open);
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-hotspot-pin], [data-hotspot-card]')) return;
    closePins();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openPin = pins.find((pin) => pin.getAttribute('aria-expanded') === 'true');
    if (!openPin) return;
    closePins();
    openPin.focus();
  });
};

const initPledgeCard = () => {
  const builder = document.querySelector('[data-pledge-builder]');
  if (!builder) return;

  const nameInput = builder.querySelector('#pledge-name');
  const nameOutput = builder.querySelector('[data-pledge-name]');
  const countOutput = builder.querySelector('[data-pledge-count-output]');
  const carbonOutput = builder.querySelector('[data-pledge-carbon]');
  const amountButtons = Array.from(builder.querySelectorAll('[data-pledge-count]'));
  const formatter = new Intl.NumberFormat('id-ID');
  let amount = 3;

  const updatePreview = () => {
    nameOutput.textContent = nameInput.value.trim() || 'Penjaga Pesisir';
    countOutput.textContent = `${amount} bibit mangrove`;
    carbonOutput.textContent = `${formatter.format(amount * 10)} kg CO₂/tahun`;
  };

  nameInput.addEventListener('input', updatePreview);
  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedAmount = Number(button.dataset.pledgeCount);
      if (![1, 3, 5].includes(selectedAmount)) {
        console.error('Jumlah bibit komitmen tidak valid:', button.dataset.pledgeCount);
        return;
      }
      amount = selectedAmount;
      amountButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      updatePreview();
    });
  });
  updatePreview();
};

const initAmbientSoundscape = () => {
  const button = document.querySelector('[data-sound-toggle]');
  if (!button) return;

  const widget = button.closest('.sound-widget');
  const label = (widget && widget.querySelector('[data-sound-label]')) || button.querySelector('[data-sound-label]');
  const status = document.querySelector('[data-sound-status]');
  const volumeInput = document.querySelector('[data-sound-volume]');
  const volumeOutput = document.querySelector('[data-sound-volume-output]');
  const closeButton = widget ? widget.querySelector('[data-sound-close]') : null;

  if (!status || !volumeInput || !volumeOutput) {
    console.error('Kontrol suara alam tidak lengkap pada halaman ini.');
    return;
  }

  const volumeStorageKey = 'ecopath-sound-volume';
  let activeSoundscape = null;
  let volumeStorageWarning = '';
  let volume = 45;
  let autoCollapseTimer = null;
  let isAudioTransitioning = false;
  let dragCompletedRecently = false;

  const clearAutoCollapse = () => {
    if (autoCollapseTimer) {
      window.clearTimeout(autoCollapseTimer);
      autoCollapseTimer = null;
    }
  };

  const clampWidgetPosition = () => {
    if (widget && widget.style.left) {
      window.setTimeout(() => {
        const rect = widget.getBoundingClientRect();
        if (rect.right > window.innerWidth - 12) {
          widget.style.left = `${Math.max(12, window.innerWidth - widget.offsetWidth - 12)}px`;
        }
      }, 50);
    }
  };

  const collapseWidget = () => {
    if (!widget) return;
    clearAutoCollapse();
    widget.classList.remove('is-expanded');
    button.title = activeSoundscape
      ? 'Suara Alam aktif · Klik untuk kontrol / matikan'
      : 'Putar Musik Suara Alam';
  };

  const scheduleAutoCollapse = (delay = 5000) => {
    clearAutoCollapse();
    autoCollapseTimer = window.setTimeout(() => {
      collapseWidget();
    }, delay);
  };

  const expandWidget = () => {
    if (!widget) return;
    widget.classList.add('is-expanded');
    button.title = 'Klik untuk matikan suara alam';
    clampWidgetPosition();
    scheduleAutoCollapse(5000);
  };

  closeButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    collapseWidget();
  });

  try {
    const storedVolume = window.localStorage.getItem(volumeStorageKey);
    if (storedVolume !== null) {
      const parsedVolume = Number(storedVolume);
      if (Number.isFinite(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 100) volume = parsedVolume;
    }
  } catch (error) {
    volumeStorageWarning = 'Pengaturan volume tidak dapat dibaca dari penyimpanan browser.';
    console.error('Gagal membaca pengaturan volume suara alam:', error);
  }
  volumeInput.value = String(volume);
  volumeInput.setAttribute('aria-valuetext', `${volume}%`);
  volumeOutput.textContent = `${volume}%`;

  volumeInput.addEventListener('input', () => {
    volume = Number(volumeInput.value);
    volumeInput.setAttribute('aria-valuetext', `${volume}%`);
    volumeOutput.textContent = `${volume}%`;
    if (activeSoundscape) {
      const now = activeSoundscape.context.currentTime;
      activeSoundscape.master.gain.cancelScheduledValues(now);
      activeSoundscape.master.gain.setTargetAtTime(volume * 0.001, now, 0.12);
    }
    scheduleAutoCollapse(5000);
    try {
      window.localStorage.setItem(volumeStorageKey, String(volume));
    } catch (error) {
      volumeStorageWarning = 'Volume berlaku di halaman ini, tetapi tidak dapat disimpan untuk halaman lain.';
      status.textContent = volumeStorageWarning;
      console.error('Gagal menyimpan pengaturan volume suara alam:', error);
    }
  });

  volumeInput.addEventListener('pointerdown', () => clearAutoCollapse());
  volumeInput.addEventListener('pointerup', () => scheduleAutoCollapse(5000));

  widget?.addEventListener('mouseenter', () => {
    if (widget.classList.contains('is-expanded')) {
      clearAutoCollapse();
    }
  });

  widget?.addEventListener('mouseleave', () => {
    if (widget.classList.contains('is-expanded')) {
      scheduleAutoCollapse(4000);
    }
  });

  const setControlState = (enabled, message = '') => {
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', `${enabled ? 'Matikan' : 'Aktifkan'} suara alam`);
    button.title = enabled
      ? (widget?.classList.contains('is-expanded') ? 'Klik untuk matikan suara alam' : 'Suara Alam aktif · Klik untuk kontrol / matikan')
      : 'Putar Musik Suara Alam';
    if (widget) {
      widget.classList.toggle('is-playing', enabled);
    }
    if (label) {
      label.textContent = `Suara Alam: ${enabled ? 'On' : 'Off'}`;
    }
    status.textContent = message || volumeStorageWarning;
  };

  const createBrownNoise = (context) => {
    const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const samples = buffer.getChannelData(0);
    let brown = 0;
    for (let index = 0; index < samples.length; index += 1) {
      brown = (brown + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      samples[index] = brown * 3.5;
    }
    return buffer;
  };

  const connectNoiseLayer = (context, buffer, master, baseFrequency, modulationDepth, modulationRate, level) => {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const layerGain = context.createGain();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    source.buffer = buffer;
    source.loop = true;
    filter.type = 'lowpass';
    filter.frequency.value = baseFrequency;
    layerGain.gain.value = level;
    lfo.frequency.value = modulationRate;
    lfoGain.gain.value = modulationDepth;

    source.connect(filter);
    filter.connect(layerGain);
    layerGain.connect(master);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    source.start();
    lfo.start();
    return { nodes: [source, filter, layerGain, lfo, lfoGain], sources: [source, lfo] };
  };

  const scheduleBirdCall = (soundscape) => {
    if (!soundscape.enabled) return;
    soundscape.birdTimer = window.setTimeout(() => {
      if (!soundscape.enabled) return;
      const { context, master } = soundscape;
      const start = context.currentTime;
      const bird = context.createOscillator();
      const envelope = context.createGain();
      bird.type = 'sine';
      bird.frequency.setValueAtTime(1700, start);
      bird.frequency.exponentialRampToValueAtTime(2500, start + 0.12);
      bird.frequency.exponentialRampToValueAtTime(1850, start + 0.36);
      envelope.gain.setValueAtTime(0.0001, start);
      envelope.gain.exponentialRampToValueAtTime(0.06, start + 0.035);
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);
      bird.connect(envelope);
      envelope.connect(master);
      bird.addEventListener('ended', () => {
        bird.disconnect();
        envelope.disconnect();
      }, { once: true });
      bird.start(start);
      bird.stop(start + 0.4);
      scheduleBirdCall(soundscape);
    }, 8500 + Math.random() * 7500);
  };

  const fadeOutSoundscape = (soundscape) => {
    soundscape.enabled = false;
    window.clearTimeout(soundscape.birdTimer);
    const now = soundscape.context.currentTime;
    soundscape.master.gain.cancelScheduledValues(now);
    soundscape.master.gain.setTargetAtTime(0.0001, now, 0.22);
    window.setTimeout(() => {
      soundscape.sources.forEach((source) => source.stop());
      soundscape.nodes.forEach((node) => node.disconnect());
      soundscape.context.close().catch((error) => console.error('Gagal menutup audio suara alam:', error));
    }, 1100);
  };

  const handleToggleClick = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (dragCompletedRecently) return;
    if (isAudioTransitioning) return;

    // 1. Jika audio sedang aktif dan widget dalam posisi bulat: buka panel lebar selama 5 detik
    if (activeSoundscape && widget && !widget.classList.contains('is-expanded')) {
      expandWidget();
      return;
    }

    // 2. Jika audio sedang aktif dan widget dalam posisi terbuka (lebar): matikan audio dan tutup
    if (activeSoundscape) {
      const soundscape = activeSoundscape;
      activeSoundscape = null;
      fadeOutSoundscape(soundscape);
      setControlState(false, 'Suara alam dimatikan.');
      collapseWidget();
      return;
    }

    // 3. Jika audio sedang mati: aktifkan audio, buka lebar, dan otomatis ciutkan ke bulat setelah 5 detik
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) {
      setControlState(false, 'Browser ini belum mendukung Web Audio untuk suara alam.');
      return;
    }

    isAudioTransitioning = true;
    let context;
    try {
      context = new AudioContextConstructor();
      if (context.state === 'suspended') {
        await context.resume();
      }
      const master = context.createGain();
      const now = context.currentTime;
      master.gain.setValueAtTime(0.0001, now);
      master.connect(context.destination);
      const buffer = createBrownNoise(context);
      const layers = [
        connectNoiseLayer(context, buffer, master, 480, 170, 0.065, 0.58),
        connectNoiseLayer(context, buffer, master, 245, 90, 0.035, 0.34)
      ];
      const soundscape = {
        context,
        master,
        nodes: [master, ...layers.flatMap((layer) => layer.nodes)],
        sources: layers.flatMap((layer) => layer.sources),
        enabled: true,
        birdTimer: 0
      };
      activeSoundscape = soundscape;
      master.gain.setTargetAtTime(volume * 0.001, context.currentTime, 0.65);
      setControlState(true, 'Suara alam aktif.');
      expandWidget();
      scheduleBirdCall(soundscape);
    } catch (error) {
      if (context && context.state !== 'closed') {
        context.close().catch((closeError) => console.error('Gagal menutup audio setelah aktivasi gagal:', closeError));
      }
      console.error('Gagal mengaktifkan suara alam:', error);
      setControlState(false, 'Suara alam tidak dapat diaktifkan. Coba lagi atau periksa izin audio browser.');
      collapseWidget();
    } finally {
      isAudioTransitioning = false;
    }
  };

  button.addEventListener('click', handleToggleClick);
  if (label) {
    label.addEventListener('click', handleToggleClick);
  }
  if (widget) {
    widget.addEventListener('click', (e) => {
      if (!widget.classList.contains('is-expanded')) {
        handleToggleClick(e);
      }
    });
  }

  if (widget) {
    widget.classList.add('is-draggable');

    const posStorageKey = 'ecopath-sound-widget-pos';
    let isDragging = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;

    const clamp = (left, top) => {
      const header = document.querySelector('.topbar') || document.querySelector('header');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 82;
      const minTop = Math.max(10, headerBottom + 12);
      const maxTop = Math.max(minTop, window.innerHeight - widget.offsetHeight - 12);
      const minLeft = 12;
      const maxLeft = Math.max(minLeft, window.innerWidth - widget.offsetWidth - 12);

      return {
        left: Math.min(Math.max(left, minLeft), maxLeft),
        top: Math.min(Math.max(top, minTop), maxTop)
      };
    };

    const applyPosition = (left, top) => {
      const clamped = clamp(left, top);
      widget.style.left = `${clamped.left}px`;
      widget.style.top = `${clamped.top}px`;
      widget.style.right = 'auto';
      widget.style.bottom = 'auto';
    };

    try {
      const saved = window.localStorage.getItem(posStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
          let l = parsed.left;
          let t = parsed.top;
          if (typeof parsed.ratioX === 'number' && typeof parsed.ratioY === 'number') {
            l = parsed.ratioX * window.innerWidth;
            t = parsed.ratioY * window.innerHeight;
          }
          applyPosition(l, t);
        }
      }
    } catch (_) {}

    widget.addEventListener('pointerdown', (e) => {
      if (e.target.closest('input[type="range"]') || e.target.closest('[data-sound-close]') || e.button !== 0) return;

      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;

      const rect = widget.getBoundingClientRect();
      origLeft = rect.left;
      origTop = rect.top;
    });

    widget.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Threshold 15px agar tap/klik normal di mouse atau layar sentuh tidak pernah terdeteksi sebagai drag
      if (!hasMoved && Math.hypot(dx, dy) < 15) return;

      if (!hasMoved) {
        hasMoved = true;
        widget.classList.add('is-dragging');
        try {
          widget.setPointerCapture(e.pointerId);
        } catch (_) {}
      }

      applyPosition(origLeft + dx, origTop + dy);
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;

      try {
        if (widget.hasPointerCapture && widget.hasPointerCapture(e.pointerId)) {
          widget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      widget.classList.remove('is-dragging');

      if (hasMoved) {
        dragCompletedRecently = true;
        window.setTimeout(() => {
          dragCompletedRecently = false;
        }, 300);

        try {
          const rect = widget.getBoundingClientRect();
          window.localStorage.setItem(posStorageKey, JSON.stringify({
            left: rect.left,
            top: rect.top,
            ratioX: rect.left / window.innerWidth,
            ratioY: rect.top / window.innerHeight
          }));
        } catch (_) {}
      }
    };

    widget.addEventListener('pointerup', endDrag);
    widget.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', () => {
      if (widget.style.left && widget.style.top) {
        const rect = widget.getBoundingClientRect();
        applyPosition(rect.left, rect.top);
      }
    });
  }
};

const initUserDrivenMotion = () => {
  initAmbientSoundscape();
  initHotspotPins();
  initPledgeCard();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const desktopMouse = finePointer && window.innerWidth > 768 && !reducedMotion;
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.setAttribute('role', 'progressbar');
  scrollProgress.setAttribute('aria-label', 'Progres scroll halaman');
  scrollProgress.setAttribute('aria-valuemin', '0');
  scrollProgress.setAttribute('aria-valuemax', '100');
  document.body.prepend(scrollProgress);

  const hero = document.querySelector('.home-page .hero');
  const heroImage = hero?.querySelector('img[src*="mangrove"]');
  const heroBadges = Array.from(hero?.querySelectorAll('.floating-note') || []);
  let scrollParallaxOffset = 0;
  let heroMouseX = 0;
  let heroMouseY = 0;
  let targetHeroMouseX = 0;
  let targetHeroMouseY = 0;
  const applyHeroMotion = () => {
    if (!heroImage) return;
    heroImage.style.setProperty('translate', `${heroMouseX}px ${heroMouseY + scrollParallaxOffset}px`);
    heroBadges.forEach((badge, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      badge.style.setProperty('translate', `${-heroMouseX * 1.6}px ${-heroMouseY * 1.6 + scrollParallaxOffset * direction * 0.35}px`);
    });
  };
  let scrollFramePending = false;
  let parallaxActive = false;
  const updateScrollEffects = () => {
    scrollFramePending = false;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
    scrollProgress.setAttribute('aria-valuenow', String(Math.round(progress * 100)));

    if (reducedMotion || window.innerWidth <= 768 || !heroImage) {
      if (parallaxActive) {
        scrollParallaxOffset = 0;
        heroMouseX = 0;
        heroMouseY = 0;
        heroImage?.style.removeProperty('translate');
        heroBadges.forEach((badge) => badge.style.removeProperty('translate'));
        parallaxActive = false;
      }
      return;
    }

    parallaxActive = true;
    const parallaxOffset = Math.min(26, Math.max(-26, (window.scrollY - hero.offsetTop) * 0.035));
    scrollParallaxOffset = -parallaxOffset;
    applyHeroMotion();
  };
  const scheduleScrollEffects = () => {
    if (scrollFramePending) return;
    scrollFramePending = true;
    window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener('scroll', scheduleScrollEffects, { passive: true });
  window.addEventListener('resize', scheduleScrollEffects, { passive: true });
  scheduleScrollEffects();

  if (desktopMouse && heroImage && hero) {
    let heroFramePending = false;
    const animateHeroPointer = () => {
      heroFramePending = false;
      heroMouseX += (targetHeroMouseX - heroMouseX) * 0.16;
      heroMouseY += (targetHeroMouseY - heroMouseY) * 0.16;
      applyHeroMotion();
      if (Math.abs(targetHeroMouseX - heroMouseX) > 0.15 || Math.abs(targetHeroMouseY - heroMouseY) > 0.15) {
        heroFramePending = true;
        window.requestAnimationFrame(animateHeroPointer);
      }
    };
    const scheduleHeroPointer = () => {
      if (heroFramePending) return;
      heroFramePending = true;
      window.requestAnimationFrame(animateHeroPointer);
    };
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = hero.getBoundingClientRect();
      targetHeroMouseX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24;
      targetHeroMouseY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 24;
      scheduleHeroPointer();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      targetHeroMouseX = 0;
      targetHeroMouseY = 0;
      scheduleHeroPointer();
    });
  }

  const counters = Array.from(document.querySelectorAll('[data-count]')).map((element) => {
    const decimals = Number(element.dataset.countDecimals) || 0;
    return {
      element,
      target: Number(element.dataset.count),
      prefix: element.dataset.countPrefix || '',
      suffix: element.dataset.countSuffix || '',
      formatter: new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })
    };
  });
  const formatCounter = (counter, value) => {
    counter.element.textContent = `${counter.prefix}${counter.formatter.format(value)}${counter.suffix}`;
  };
  const showFinalCounterValues = () => counters.forEach((counter) => {
    formatCounter(counter, counter.target);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    showFinalCounterValues();
  } else if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = counters.find((item) => item.element === entry.target);
        if (!counter) return;
        const duration = 1250;
        let startTime;
        const animateCounter = (time) => {
          if (startTime === undefined) startTime = time;
          const progress = Math.min(1, (time - startTime) / duration);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          formatCounter(counter, counter.target * easedProgress);
          if (progress < 1) window.requestAnimationFrame(animateCounter);
          else formatCounter(counter, counter.target);
        };
        window.requestAnimationFrame(animateCounter);
        observer.unobserve(counter.element);
      });
    }, { threshold: 0.55 });
    counters.forEach((counter) => counterObserver.observe(counter.element));
  }

  if (finePointer && !reducedMotion) {
    const spotlightCards = document.querySelectorAll('.species-card, .article-card, .home-page .stats-strip .stat');
    spotlightCards.forEach((card) => {
      const tilts = card.matches('.species-card, .article-card');
      card.classList.add('spotlight-card');
      if (tilts) card.classList.add('tilt-card');
      let pointerX = 0;
      let pointerY = 0;
      let framePending = false;
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(() => {
          framePending = false;
          const bounds = card.getBoundingClientRect();
          const x = (pointerX - bounds.left) / bounds.width;
          const y = (pointerY - bounds.top) / bounds.height;
          card.style.setProperty('--mx', `${x * 100}%`);
          card.style.setProperty('--my', `${y * 100}%`);
          if (!tilts) return;
          card.style.setProperty('--rx', `${(x - 0.5) * 10}deg`);
          card.style.setProperty('--ry', `${(0.5 - y) * 10}deg`);
        });
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
        if (tilts) {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        }
      });
    });
  }

  const magneticButtons = Array.from(document.querySelectorAll('.nav-links a, .btn-primary, .btn, .tour-button'));
  magneticButtons.forEach((button) => {
    button.classList.add('magnetic-btn');
    if (!reducedMotion) {
      button.addEventListener('click', (event) => {
        if (desktopMouse) return;
        const bounds = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const diameter = Math.max(bounds.width, bounds.height) * 2;
        ripple.className = 'btn-ripple';
        ripple.setAttribute('aria-hidden', 'true');
        const pointerPositioned = event.detail > 0;
        ripple.style.left = `${pointerPositioned ? event.clientX - bounds.left : bounds.width / 2}px`;
        ripple.style.top = `${pointerPositioned ? event.clientY - bounds.top : bounds.height / 2}px`;
        ripple.style.width = `${diameter}px`;
        ripple.style.height = `${diameter}px`;
        ripple.style.setProperty('--ripple-scale', '1');
        button.append(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        window.setTimeout(() => ripple.remove(), 750);
      });
    }
  });

  if (finePointer && !reducedMotion && magneticButtons.length) {
    let pointerX = -1000;
    let pointerY = -1000;
    let framePending = false;
    const resetMagneticButtons = () => {
      magneticButtons.forEach((button) => {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
    };
    const updateMagneticButtons = () => {
      framePending = false;
      if (window.innerWidth <= 768) {
        resetMagneticButtons();
        return;
      }
      magneticButtons.forEach((button) => {
        const bounds = button.getBoundingClientRect();
        const deltaX = pointerX - (bounds.left + bounds.width / 2);
        const deltaY = pointerY - (bounds.top + bounds.height / 2);
        const radius = button.matches('.nav-links a') ? 78 : 96;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = Math.max(0, 1 - distance / radius);
        button.style.setProperty('--magnet-x', `${deltaX * influence * 0.09}px`);
        button.style.setProperty('--magnet-y', `${deltaY * influence * 0.09}px`);
      });
    };
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateMagneticButtons);
    }, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (event.relatedTarget) return;
      pointerX = -1000;
      pointerY = -1000;
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateMagneticButtons);
      }
    });
    window.addEventListener('blur', resetMagneticButtons);
  }

  if (desktopMouse) {
    const cursorRing = document.createElement('span');
    const cursorDot = document.createElement('span');
    cursorRing.className = 'cursor-ring';
    cursorDot.className = 'cursor-dot';
    cursorRing.setAttribute('aria-hidden', 'true');
    cursorDot.setAttribute('aria-hidden', 'true');
    document.body.append(cursorRing, cursorDot);

    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let hasPointer = false;
    let cursorFramePending = false;
    const animateCursor = () => {
      cursorFramePending = false;
      cursorX += (targetX - cursorX) * 0.38;
      cursorY += (targetY - cursorY) * 0.38;
      const x = `${cursorX}px`;
      const y = `${cursorY}px`;
      cursorRing.style.setProperty('--cursor-x', x);
      cursorRing.style.setProperty('--cursor-y', y);
      cursorDot.style.setProperty('--cursor-x', x);
      cursorDot.style.setProperty('--cursor-y', y);
      if (Math.abs(targetX - cursorX) > 0.12 || Math.abs(targetY - cursorY) > 0.12) {
        cursorFramePending = true;
        window.requestAnimationFrame(animateCursor);
      }
    };
    const scheduleCursor = () => {
      if (cursorFramePending) return;
      cursorFramePending = true;
      window.requestAnimationFrame(animateCursor);
    };
    const interactiveSelector = 'a, button, input, textarea, select, .species-card, .article-card, .tour-button';
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPointer) {
        cursorX = targetX;
        cursorY = targetY;
        hasPointer = true;
      }
      cursorRing.classList.add('is-visible');
      cursorDot.classList.add('is-visible');
      scheduleCursor();
    }, { passive: true });
    document.addEventListener('pointerover', (event) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      if (event.target.closest(interactiveSelector)) cursorRing.classList.add('is-hovering');
    }, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      const from = event.target.closest(interactiveSelector);
      const to = event.relatedTarget instanceof Element ? event.relatedTarget.closest(interactiveSelector) : null;
      if (from && from !== to) cursorRing.classList.toggle('is-hovering', Boolean(to));
    }, { passive: true });
    document.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse') cursorRing.classList.add('is-pressed');
    });
    window.addEventListener('pointerup', () => cursorRing.classList.remove('is-pressed'));
    window.addEventListener('pointercancel', () => cursorRing.classList.remove('is-pressed'));
    window.addEventListener('pointerleave', () => {
      cursorRing.classList.remove('is-visible', 'is-hovering', 'is-pressed');
      cursorDot.classList.remove('is-visible');
    });
    document.querySelectorAll('[role="application"], #tour-viewer').forEach((interactiveSurface) => {
      interactiveSurface.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        cursorRing.classList.add('is-obscured');
        cursorDot.classList.add('is-obscured');
      });
      interactiveSurface.addEventListener('pointerleave', () => {
        cursorRing.classList.remove('is-obscured');
        cursorDot.classList.remove('is-obscured');
      });
    });

    const addCanopySpotlight = (section, layer = section) => {
      if (!section || !layer) return;
      const spotlight = document.createElement('span');
      spotlight.className = 'canopy-spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      layer.prepend(spotlight);
      let x = 0;
      let y = 0;
      let targetSpotX = 0;
      let targetSpotY = 0;
      let spotlightFramePending = false;
      const animateSpotlight = () => {
        spotlightFramePending = false;
        x += (targetSpotX - x) * 0.2;
        y += (targetSpotY - y) * 0.2;
        spotlight.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (Math.abs(targetSpotX - x) > 0.5 || Math.abs(targetSpotY - y) > 0.5) {
          spotlightFramePending = true;
          window.requestAnimationFrame(animateSpotlight);
        }
      };
      section.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = layer.getBoundingClientRect();
        targetSpotX = event.clientX - bounds.left;
        targetSpotY = event.clientY - bounds.top;
        spotlight.classList.add('is-active');
        if (spotlightFramePending) return;
        spotlightFramePending = true;
        window.requestAnimationFrame(animateSpotlight);
      }, { passive: true });
      section.addEventListener('pointerleave', () => spotlight.classList.remove('is-active'));
    };

    addCanopySpotlight(hero, hero?.querySelector('.hero-art'));
    addCanopySpotlight(document.querySelector('#tur'));

    document.addEventListener('click', (event) => {
      if (event.detail === 0 || event.button !== 0 || !(event.target instanceof Element)) return;
      const ripple = document.createElement('span');
      ripple.className = 'water-click-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      window.setTimeout(() => ripple.remove(), 1150);
    }, { capture: true });
  }

  function launchLeafConfetti() {
    if (reducedMotion) return;
    const leaves = ['🌿', '🌱', '🍃'];
    for (let index = 0; index < 20; index += 1) {
      const particle = document.createElement('span');
      particle.className = 'leaf-confetti';
      particle.textContent = leaves[index % leaves.length];
      particle.setAttribute('aria-hidden', 'true');
      particle.style.setProperty('--leaf-x', `${Math.random() * 100}vw`);
      particle.style.setProperty('--leaf-size', `${14 + Math.random() * 12}px`);
      particle.style.setProperty('--leaf-duration', `${2.4 + Math.random() * 1.4}s`);
      particle.style.setProperty('--leaf-drift', `${-70 + Math.random() * 140}px`);
      particle.style.setProperty('--leaf-rotation', `${180 + Math.random() * 540}deg`);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
      document.body.append(particle);
    }
  }

  const quizResult = document.querySelector('[data-quiz-result]');
  if (quizResult && 'MutationObserver' in window) {
    const quizObserver = new MutationObserver(() => {
      if (!quizResult.hidden) launchLeafConfetti();
    });
    quizObserver.observe(quizResult, { attributes: true, attributeFilter: ['hidden'] });
  }

  const visitProgress = document.querySelector('[data-visit-progress]');
  if (visitProgress && 'MutationObserver' in window) {
    const maxProgress = Number(visitProgress.getAttribute('aria-valuemax')) || 4;
    let checklistComplete = Number(visitProgress.getAttribute('aria-valuenow')) >= maxProgress;
    const progressObserver = new MutationObserver(() => {
      const complete = Number(visitProgress.getAttribute('aria-valuenow')) >= maxProgress;
      if (complete && !checklistComplete) launchLeafConfetti();
      checklistComplete = complete;
    });
    progressObserver.observe(visitProgress, { attributes: true, attributeFilter: ['aria-valuenow'] });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUserDrivenMotion, { once: true });
} else {
  initUserDrivenMotion();
}
