const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const soundToggle = document.querySelector('.sound-toggle');
const soundLabel = document.querySelector('.sound-label');
const soundIcon = document.querySelector('.sound-icon');
const copyButton = document.querySelector('.copy-button');
const avatarStage = document.querySelector('[data-avatar-stage]');
const paletteButtons = [...document.querySelectorAll('[data-accent]')];
const phtClock = document.querySelector('[data-time-pht]');
const localClock = document.querySelector('[data-time-local]');
const localZone = document.querySelector('[data-local-zone]');
const localOffset = document.querySelector('[data-local-offset]');
const timeRelation = document.querySelector('[data-time-relation]');
const panels = [...document.querySelectorAll('.card')];
const questPanel = document.querySelector('.currently-card');
const questToggle = document.querySelector('[data-quest-toggle]');
const questLabel = document.querySelector('[data-quest-label]');
const questRole = document.querySelector('[data-quest-role]');
const questTense = document.querySelector('[data-quest-tense]');
const questCompany = document.querySelector('[data-quest-company]');
const questPeriod = document.querySelector('[data-quest-period]');
const questCount = document.querySelector('[data-quest-count]');
const questContent = document.querySelector('[data-quest-content]');
const questLight = document.querySelector('[data-quest-light]');
const contactDialog = document.querySelector('[data-contact-dialog]');
const contactDialogOpen = document.querySelector('[data-contact-dialog-open]');
const contactDialogClose = document.querySelector('[data-contact-dialog-close]');
const dialogMeetButton = contactDialog?.querySelector('[data-cal-link]');
const dialogEmailLink = contactDialog?.querySelector('a[href*="mail.google.com"]');
const francoisRoamer = document.querySelector('[data-francois]');
const francoisMessage = document.querySelector('[data-francois-message]');

const workExperience = [
  {
    role: 'Risk Analyst / Tech Support',
    tense: 'Currently working at',
    company: 'Whim',
    period: 'APR 2026 — PRESENT',
  },
  {
    role: 'Fraud Analyst / Technical Support (Tier 2)',
    tense: 'Previously working at',
    company: 'NZXT, Inc.',
    period: 'NOV 2024 — APR 2026',
  },
  {
    role: 'Software Engineer (Internship)',
    tense: 'Previously working at',
    company: 'Infosoft Consulting Corp',
    period: 'JAN 2024 — OCT 2024',
  },
  {
    role: 'Financial Fraud VA / Legal Assistant',
    tense: 'Previously working at',
    company: 'The VA Hub US',
    period: 'JUN 2023 — JAN 2024',
  },
];

let activeExperience = 0;
let questTransitionTimer;
let questResetTimer;

const showExperience = (index, returning = false) => {
  const experience = workExperience[index];
  if (!experience || !questRole || !questTense || !questCompany || !questPeriod || !questCount) return;
  window.clearTimeout(questTransitionTimer);
  questPanel?.classList.remove('is-changing', 'is-returning');
  questPanel?.classList.add(returning ? 'is-returning' : 'is-changing');
  questTransitionTimer = window.setTimeout(() => {
    if (questLabel) questLabel.textContent = index === 0 ? 'CURRENT QUEST' : 'PREVIOUS QUEST';
    questRole.textContent = experience.role;
    questTense.textContent = experience.tense;
    questCompany.textContent = experience.company;
    questPeriod.textContent = experience.period;
    questCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(workExperience.length).padStart(2, '0')}`;
    if (questLight) questLight.hidden = index !== 0;
    questPanel?.classList.remove('is-changing', 'is-returning');
  }, 110);
};

questToggle?.addEventListener('click', () => {
  window.clearTimeout(questResetTimer);
  activeExperience = (activeExperience + 1) % workExperience.length;
  showExperience(activeExperience);
  if (activeExperience > 0) {
    questResetTimer = window.setTimeout(() => {
      activeExperience = 0;
      showExperience(activeExperience, true);
    }, 6500);
  }
});

contactDialogOpen?.addEventListener('click', () => {
  if (typeof contactDialog?.showModal === 'function') contactDialog.showModal();
});

contactDialogClose?.addEventListener('click', () => contactDialog?.close());

contactDialog?.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

dialogMeetButton?.addEventListener('click', () => {
  window.setTimeout(() => contactDialog?.close(), 0);
});

dialogEmailLink?.addEventListener('click', () => contactDialog?.close());

const setTheme = (theme) => {
  const isDaylight = theme === 'daylight';
  body.classList.toggle('daylight', isDaylight);
  themeToggle.setAttribute('aria-pressed', String(isDaylight));
  themeToggle.setAttribute('aria-label', isDaylight ? 'Switch to nighttime theme' : 'Switch to daylight theme');
  themeToggle.querySelector('[aria-hidden="true"]').textContent = isDaylight ? '☾' : '☀';
  themeLabel.textContent = isDaylight ? 'Nighttime' : 'Daylight';
};

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme === 'daylight' ? 'daylight' : 'nighttime');

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('daylight') ? 'nighttime' : 'daylight';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = 'Copied to inventory!';
    } catch {
      copyButton.textContent = email;
    }
    window.setTimeout(() => {
      copyButton.textContent = 'Copy email';
    }, 2200);
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

const accentColors = {
  red: ['#ef4444', '#5f1b22'],
  amber: ['#f4b52e', '#67470d'],
  blue: ['#4f8df7', '#193b68'],
  violet: ['#9b5cf6', '#43216b'],
  green: ['#65bd63', '#214f2d'],
};

const setAccent = (accent) => {
  const selectedAccent = accentColors[accent] ? accent : 'green';
  const [color, deepColor] = accentColors[selectedAccent];
  document.documentElement.style.setProperty('--green', color);
  document.documentElement.style.setProperty('--green-deep', deepColor);
  body.style.setProperty('--green', color);
  body.style.setProperty('--green-deep', deepColor);
  paletteButtons.forEach((button) => {
    const isActive = button.dataset.accent === selectedAccent;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

setAccent(localStorage.getItem('portfolio-accent') || 'green');

paletteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setAccent(button.dataset.accent);
    localStorage.setItem('portfolio-accent', button.dataset.accent);
  });
});

let panelAudioContext;
let panelHoverAudio;
let soundPreference = localStorage.getItem('portfolio-sound') !== 'off';
let panelSoundsEnabled = soundPreference;
let panelAudioUnlocked = false;

const getPanelAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  panelAudioContext ||= new AudioContext();
  if (panelAudioContext.state === 'suspended') {
    panelAudioContext.resume().catch(() => {});
  }
  return panelAudioContext;
};

const getPanelHoverAudio = () => {
  if (panelHoverAudio) return panelHoverAudio;

  const sampleRate = 8000;
  const sampleCount = Math.floor(sampleRate * 0.075);
  const wav = new ArrayBuffer(44 + sampleCount);
  const view = new DataView(wav);
  const writeText = (offset, value) => {
    [...value].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)));
  };

  writeText(0, 'RIFF');
  view.setUint32(4, 36 + sampleCount, true);
  writeText(8, 'WAVE');
  writeText(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  writeText(36, 'data');
  view.setUint32(40, sampleCount, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const progress = index / sampleCount;
    const frequency = 180 - progress * 65;
    const square = Math.sin((index / sampleRate) * frequency * Math.PI * 2) >= 0 ? 1 : -1;
    view.setUint8(44 + index, 128 + square * 24 * (1 - progress));
  }

  const bytes = new Uint8Array(wav);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  panelHoverAudio = document.createElement('audio');
  panelHoverAudio.preload = 'auto';
  panelHoverAudio.src = `data:audio/wav;base64,${btoa(binary)}`;
  panelHoverAudio.volume = 0.14;
  return panelHoverAudio;
};

const playPanelHoverSound = () => {
  if (!panelSoundsEnabled) return;
  const audioContext = getPanelAudioContext();
  if (!audioContext || audioContext.state !== 'running') {
    const fallbackSound = getPanelHoverAudio().cloneNode();
    fallbackSound.volume = 0.14;
    fallbackSound.play().catch(() => {});
    return;
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(185, now);
  oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.065);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.022, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.075);
};

const updateSoundControl = () => {
  if (!soundToggle) return;
  soundToggle.classList.toggle('is-active', panelSoundsEnabled);
  soundToggle.setAttribute('aria-pressed', String(panelSoundsEnabled));
  soundToggle.setAttribute('aria-label', panelSoundsEnabled ? 'Disable interface sounds' : 'Enable interface sounds');
  soundToggle.title = panelSoundsEnabled ? 'Disable interface sounds' : 'Enable interface sounds';
  soundIcon.textContent = panelSoundsEnabled ? '♫' : '♪';
  soundLabel.textContent = panelSoundsEnabled ? 'Sound on' : 'Enable sound';
};

const enablePanelSounds = async (playConfirmation = false) => {
  panelSoundsEnabled = true;
  panelAudioUnlocked = true;
  updateSoundControl();
  const audioContext = getPanelAudioContext();
  getPanelHoverAudio();
  if (audioContext?.state === 'suspended') {
    await audioContext.resume().catch(() => {});
  }
  if (playConfirmation && panelSoundsEnabled) playPanelHoverSound();
};

updateSoundControl();

soundToggle?.addEventListener('click', async () => {
  if (panelSoundsEnabled) {
    panelSoundsEnabled = false;
    soundPreference = false;
    localStorage.setItem('portfolio-sound', 'off');
    updateSoundControl();
    return;
  }
  soundPreference = true;
  localStorage.setItem('portfolio-sound', 'on');
  await enablePanelSounds(true);
});

window.addEventListener('pointerdown', (event) => {
  if (!soundPreference || panelAudioUnlocked || event.target.closest('.sound-toggle')) return;
  enablePanelSounds();
}, { passive: true });

window.addEventListener('keydown', (event) => {
  if (!soundPreference || panelAudioUnlocked || event.target.closest('.sound-toggle')) return;
  enablePanelSounds();
});

if (window.matchMedia('(hover: hover)').matches) {
  panels.forEach((panel) => panel.addEventListener('pointerenter', playPanelHoverSound));
}

const updateClocks = () => {
  if (!phtClock || !localClock) return;
  const now = new Date();
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  phtClock.textContent = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'Asia/Manila' }).format(now);
  localClock.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

  const phtOffsetMinutes = 8 * 60;
  const userOffsetMinutes = -now.getTimezoneOffset();
  const differenceMinutes = phtOffsetMinutes - userOffsetMinutes;
  const absoluteDifference = Math.abs(differenceMinutes);
  const differenceHours = absoluteDifference / 60;
  const differenceLabel = Number.isInteger(differenceHours)
    ? `${differenceHours}H`
    : `${Math.floor(differenceHours)}H ${absoluteDifference % 60}M`;

  if (timeRelation) {
    if (differenceMinutes === 0) {
      timeRelation.textContent = 'SAME TIME AS YOU';
    } else {
      timeRelation.textContent = `${differenceLabel} ${differenceMinutes > 0 ? 'AHEAD OF' : 'BEHIND'} YOU`;
    }
  }

  if (localOffset) {
    const sign = userOffsetMinutes >= 0 ? '+' : '−';
    const offsetHours = Math.floor(Math.abs(userOffsetMinutes) / 60);
    const offsetMinutes = Math.abs(userOffsetMinutes) % 60;
    localOffset.textContent = `GMT${sign}${offsetHours}${offsetMinutes ? `:${String(offsetMinutes).padStart(2, '0')}` : ''}`;
  }
};

if (localZone) {
  const resolvedZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
  localZone.textContent = resolvedZone.split('/').pop().replaceAll('_', ' ').toUpperCase();
}

updateClocks();
window.setInterval(updateClocks, 30000);

if (avatarStage) {
  const avatarFrames = [...avatarStage.querySelectorAll('.avatar-frame')];
  const avatarStatus = avatarStage.querySelector('[data-avatar-status]');
  const avatarCount = avatarStage.querySelector('[data-avatar-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeFrame = 0;

  const showAvatarFrame = (index) => {
    avatarFrames.forEach((frame, frameIndex) => {
      frame.classList.toggle('is-active', frameIndex === index);
    });
    avatarStatus.textContent = avatarFrames[index].dataset.avatarLabel;
    avatarCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(avatarFrames.length).padStart(2, '0')}`;
  };

  if (!reduceMotion && avatarFrames.length > 1) {
    const scheduleNextAvatarFrame = () => {
      const frameDuration = Number(avatarFrames[activeFrame].dataset.avatarDuration) || 2800;
      window.setTimeout(() => {
        activeFrame = (activeFrame + 1) % avatarFrames.length;
        showAvatarFrame(activeFrame);
        scheduleNextAvatarFrame();
      }, frameDuration);
    };

    scheduleNextAvatarFrame();
  }
}

if (francoisRoamer && francoisMessage) {
  const francoisSprite = francoisRoamer.querySelector('.francois-sprite');
  const messages = [
    "I'm Francois!",
    'I am his loyal friend.',
    'Nice to meet you!',
    'Walk with me!',
    'Keep exploring!',
  ];
  const clips = {
    walk: { row: 0, frames: 4, fps: 5, loop: true, hold: [3.2, 7.8] },
    idle: { row: 1, frames: 4, fps: 5, loop: true, hold: [1.4, 4.2] },
    sit: { row: 2, frames: 4, fps: 4, loop: true, hold: [4.5, 10] },
    'sit-down': { row: 3, frames: 4, fps: 7, loop: false },
  };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let messageIndex = -1;
  let messageTimer;
  let pointerWasOverDog = false;
  let clip = 'walk';
  let clipReversed = false;
  let clipTime = 0;
  let remaining = 0;
  let direction = 1;
  let x = 20;
  let lastFrameTime = 0;
  let animationFrame = 0;

  const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);
  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  const edgeMargin = () => (window.innerWidth < 520 ? 4 : 12);
  const maxX = () => Math.max(edgeMargin(), window.innerWidth - francoisRoamer.offsetWidth - edgeMargin());

  const frameIndexFor = () => {
    const config = clips[clip];
    const rawFrame = Math.floor(clipTime * config.fps);
    const index = config.loop
      ? ((rawFrame % config.frames) + config.frames) % config.frames
      : clamp(rawFrame, 0, config.frames - 1);
    return clipReversed ? config.frames - 1 - index : index;
  };

  const paintFrame = () => {
    if (!francoisSprite) return;
    const config = clips[clip];
    const column = frameIndexFor();
    francoisSprite.style.backgroundPosition = `${(column * 100) / 3}% ${(config.row * 100) / 3}%`;
  };

  const setClip = (nextClip, reversed = false) => {
    clip = nextClip;
    clipReversed = reversed;
    clipTime = 0;
    const config = clips[clip];
    remaining = config.loop ? randomBetween(...config.hold) : config.frames / config.fps;
    francoisRoamer.dataset.state = clipReversed ? 'stand-up' : clip;
    paintFrame();
  };

  const showFrancoisMessage = () => {
    window.clearTimeout(messageTimer);
    messageIndex = (messageIndex + 1) % messages.length;
    francoisMessage.textContent = messages[messageIndex];
    francoisRoamer.classList.add('is-speaking');
    messageTimer = window.setTimeout(() => francoisRoamer.classList.remove('is-speaking'), 2600);
  };

  const pointIsOverDog = (clientX, clientY) => {
    const bounds = francoisRoamer.getBoundingClientRect();
    return clientX >= bounds.left && clientX <= bounds.right && clientY >= bounds.top && clientY <= bounds.bottom;
  };

  const advanceBehavior = () => {
    const roll = Math.random();
    if (clip === 'sit') {
      setClip('sit-down', true);
    } else if (clip === 'sit-down') {
      setClip(clipReversed ? 'idle' : 'sit');
    } else if (clip === 'walk') {
      setClip(roll < 0.78 ? 'idle' : 'walk');
    } else if (roll < 0.56) {
      setClip('walk');
    } else if (roll < 0.82) {
      setClip('sit-down');
    } else {
      setClip('idle');
    }

    if ((clip === 'idle' || clip === 'sit') && Math.random() > 0.58) {
      showFrancoisMessage();
    }
  };

  const stopAnimation = () => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  };

  const tick = (now) => {
    animationFrame = window.requestAnimationFrame(tick);
    const step = Math.min(0.05, Math.max(0, (now - lastFrameTime) / 1000));
    lastFrameTime = now;
    clipTime += step;
    remaining -= step;

    paintFrame();

    if (clip === 'walk') {
      // Match one four-frame stride to roughly one third of the dog's width.
      // This keeps the paws visually planted instead of cycling faster than travel.
      const speed = clamp(francoisRoamer.offsetHeight * 0.5, 34, 46);
      x += direction * speed * step;
      const limit = maxX();
      if (x >= limit) {
        x = limit;
        direction = -1;
      } else if (x <= edgeMargin()) {
        x = edgeMargin();
        direction = 1;
      }
      francoisRoamer.style.setProperty('--dog-facing', String(direction));
    }

    francoisRoamer.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
    const finishedStride = clip !== 'walk' || frameIndexFor() === 0;
    if (remaining <= 0 && finishedStride) advanceBehavior();
  };

  const startAnimation = () => {
    stopAnimation();
    if (prefersReducedMotion.matches || document.hidden) return;
    lastFrameTime = performance.now();
    animationFrame = window.requestAnimationFrame(tick);
  };

  const placeFrancoisSafely = () => {
    x = clamp(x, edgeMargin(), maxX());
    francoisRoamer.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  };

  document.addEventListener('pointermove', (event) => {
    const isOverDog = pointIsOverDog(event.clientX, event.clientY);
    if (isOverDog && !pointerWasOverDog) showFrancoisMessage();
    pointerWasOverDog = isOverDog;
  }, { passive: true });

  document.addEventListener('click', (event) => {
    if (pointIsOverDog(event.clientX, event.clientY)) showFrancoisMessage();
  });

  window.addEventListener('resize', placeFrancoisSafely);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAnimation();
    else startAnimation();
  });
  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      stopAnimation();
      setClip('idle');
    } else {
      setClip('walk');
      startAnimation();
    }
  });

  x = randomBetween(edgeMargin(), maxX());
  direction = Math.random() < 0.5 ? -1 : 1;
  francoisRoamer.style.setProperty('--dog-facing', String(direction));
  placeFrancoisSafely();
  if (prefersReducedMotion.matches) {
    setClip('idle');
  } else {
    setClip('walk');
    startAnimation();
  }
}

const revealItems = document.querySelectorAll('.reveal');
const backToSpawn = document.querySelector('[data-scroll-top]');

if (backToSpawn) {
  backToSpawn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const syncPageScroll = () => {
  body.classList.toggle('has-page-scroll', document.documentElement.scrollHeight > window.innerHeight + 1);
};

syncPageScroll();
window.addEventListener('resize', syncPageScroll);
window.addEventListener('load', syncPageScroll);
