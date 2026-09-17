const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const copyButton = document.querySelector('.copy-button');
const avatarStage = document.querySelector('[data-avatar-stage]');
const paletteButtons = [...document.querySelectorAll('[data-accent]')];
const phtClock = document.querySelector('[data-time-pht]');
const localClock = document.querySelector('[data-time-local]');
const localZone = document.querySelector('[data-local-zone]');
const localOffset = document.querySelector('[data-local-offset]');
const timeRelation = document.querySelector('[data-time-relation]');
const panels = [...document.querySelectorAll('.card')];

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

window.addEventListener('pointerdown', () => {
  getPanelAudioContext();
  getPanelHoverAudio();
}, { once: true, passive: true });
window.addEventListener('keydown', getPanelAudioContext, { once: true });

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
    window.setInterval(() => {
      activeFrame = (activeFrame + 1) % avatarFrames.length;
      showAvatarFrame(activeFrame);
    }, 2800);
  }
}

const revealItems = document.querySelectorAll('.reveal');

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
