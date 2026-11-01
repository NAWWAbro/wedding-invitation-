// =========================================================================
// WEDDING INVITATION INTERACTIVE LOGIC
// High-Fidelity Clone matching original video intro, audio, and styling
// =========================================================================

import { weddingConfig } from './weddingConfig.js';

// --- State Variables ---
let isMusicPlaying = false;
let audioEl = null;

// --- DOM Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initGuestDetailsFromURL();
  populateContentFromConfig();
  initCountdownTimer();
  initPetalAnimation();
  initVideoIntro();
  initAudioPlayer();
  initTimeline();
  initGallery();
  initRsvpHandler();
  initHostLinkGenerator();
  loadSampleWishes();
});

// =========================================================================
// 1. GUEST RECOGNITION (URL PARAMETERS)
// e.g. ?prefix=Mr.%20%26%20Mrs.&name=Hettiarachchi
// =========================================================================
function initGuestDetailsFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const prefix = urlParams.get('prefix');
  const name = urlParams.get('name');

  let guestDisplayName = "Honored Guest & Family";

  if (prefix && name) {
    guestDisplayName = `${prefix} ${name}`;
  } else if (name) {
    guestDisplayName = name;
  } else if (prefix) {
    guestDisplayName = `${prefix} Guest`;
  }

  // Update Video Entry Greeting
  const introGuestEl = document.getElementById('intro-guest-name');
  if (introGuestEl) introGuestEl.textContent = guestDisplayName;

  // Update Hero Banner
  const heroGuestEl = document.getElementById('hero-guest-name');
  if (heroGuestEl) heroGuestEl.textContent = guestDisplayName;

  // Pre-fill RSVP form name if guest name exists
  const rsvpNameInput = document.getElementById('rsvp-guest-name');
  if (rsvpNameInput && (prefix || name)) {
    rsvpNameInput.value = guestDisplayName;
  }
}

// =========================================================================
// 2. VIDEO INTRO STAGE (Cinematic Experience from Original Site)
// =========================================================================
function initVideoIntro() {
  const videoIntroStage = document.getElementById('video-intro-stage');
  const introVideo = document.getElementById('intro-video');
  const startOverlay = document.getElementById('intro-start-overlay');
  const playingOverlay = document.getElementById('intro-playing-overlay');
  const viewBtn = document.getElementById('view-invitation-btn');
  const skipBtn = document.getElementById('skip-intro-btn');
  const websiteStage = document.getElementById('website-stage');

  if (!introVideo || !videoIntroStage) return;

  // Start background ambient video muted initially
  introVideo.muted = true;
  introVideo.play().catch(e => {
    console.log("Autoplay background muted video waiting for interaction:", e);
  });

  // User clicks "View Invitation"
  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      // Unblur video, unmute and play with audio
      introVideo.muted = false;
      introVideo.currentTime = 0;
      introVideo.classList.remove('blurred');
      introVideo.classList.add('playing');

      startOverlay.classList.add('hidden');
      playingOverlay.classList.remove('hidden');

      introVideo.play().catch(e => {
        console.warn("Audio play issue on video:", e);
      });
    });
  }

  // When video ends or user clicks "Skip Intro"
  function enterWebsite() {
    introVideo.pause();
    videoIntroStage.classList.add('fade-out');
    
    if (websiteStage) {
      websiteStage.className = 'website-stage-active';
    }

    // Start background music automatically (Ed Sheeran - Perfect)
    playBackgroundMusic();
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', enterWebsite);
  }

  introVideo.addEventListener('ended', enterWebsite);
  introVideo.addEventListener('error', enterWebsite);
}

// =========================================================================
// 3. AMBIENT BACKGROUND AUDIO
// =========================================================================
function initAudioPlayer() {
  audioEl = document.getElementById('wedding-audio');
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const audioWaves = document.getElementById('audio-waves');
  const audioBtnLabel = document.getElementById('audio-btn-label');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        pauseBackgroundMusic();
      } else {
        playBackgroundMusic();
      }
    });
  }
}

function playBackgroundMusic() {
  if (!audioEl) return;
  audioEl.play().then(() => {
    isMusicPlaying = true;
    const audioWaves = document.getElementById('audio-waves');
    const audioBtnLabel = document.getElementById('audio-btn-label');
    if (audioWaves) audioWaves.classList.add('playing');
    if (audioBtnLabel) audioBtnLabel.textContent = 'Music: Playing';
  }).catch(err => {
    console.warn("Audio play blocked or unavailable:", err);
  });
}

function pauseBackgroundMusic() {
  if (!audioEl) return;
  audioEl.pause();
  isMusicPlaying = false;
  const audioWaves = document.getElementById('audio-waves');
  const audioBtnLabel = document.getElementById('audio-btn-label');
  if (audioWaves) audioWaves.classList.remove('playing');
  if (audioBtnLabel) audioBtnLabel.textContent = 'Music: Paused';
}

// =========================================================================
// 4. POPULATE DYNAMIC CONTENT FROM weddingConfig
// =========================================================================
function populateContentFromConfig() {
  const { couple, event, venue, dressCode, rsvp } = weddingConfig;

  // Couple names & monograms (Kavishka & Samindya)
  const coupleNamesStr = `${couple.groom.firstName} & ${couple.bride.firstName}`;
  document.title = `${coupleNamesStr} | Wedding Invitation`;

  const heroCoupleEl = document.getElementById('hero-couple-names');
  if (heroCoupleEl) heroCoupleEl.textContent = coupleNamesStr;

  const centerMonogramEl = document.getElementById('center-monogram');
  if (centerMonogramEl) centerMonogramEl.textContent = couple.monogram;

  const footerMonogramEl = document.getElementById('footer-monogram');
  if (footerMonogramEl) footerMonogramEl.textContent = couple.monogram;

  const footerNamesEl = document.getElementById('footer-names');
  if (footerNamesEl) footerNamesEl.textContent = coupleNamesStr;

  const footerHashtagEl = document.getElementById('footer-hashtag');
  if (footerHashtagEl) footerHashtagEl.textContent = couple.hashtag;

  // Hero section info
  const heroDateEl = document.getElementById('hero-date-str');
  if (heroDateEl) heroDateEl.textContent = event.dateDisplayLong;

  const heroVenueEl = document.getElementById('hero-venue-summary');
  if (heroVenueEl) heroVenueEl.textContent = venue.name;

  const poruwaTimeEl = document.getElementById('poruwa-time-str');
  if (poruwaTimeEl) poruwaTimeEl.textContent = event.poruwaTime;

  // Groom Card
  const groomImg = document.getElementById('groom-img');
  if (groomImg) groomImg.src = couple.groom.image;
  const groomName = document.getElementById('groom-name');
  if (groomName) groomName.textContent = couple.groom.fullName;
  const groomParents = document.getElementById('groom-parents');
  if (groomParents) groomParents.textContent = couple.groom.parents;
  const groomBio = document.getElementById('groom-bio');
  if (groomBio) groomBio.textContent = `"${couple.groom.bio}"`;

  // Bride Card
  const brideImg = document.getElementById('bride-img');
  if (brideImg) brideImg.src = couple.bride.image;
  const brideName = document.getElementById('bride-name');
  if (brideName) brideName.textContent = couple.bride.fullName;
  const brideParents = document.getElementById('bride-parents');
  if (brideParents) brideParents.textContent = couple.bride.parents;
  const brideBio = document.getElementById('bride-bio');
  if (brideBio) brideBio.textContent = `"${couple.bride.bio}"`;

  // Venue Section
  const venueNameEl = document.getElementById('venue-name-val');
  if (venueNameEl) venueNameEl.textContent = venue.name;
  const venueHallEl = document.getElementById('venue-hall-val');
  if (venueHallEl) venueHallEl.textContent = venue.hall;
  const venueAddressEl = document.getElementById('venue-address-val');
  if (venueAddressEl) venueAddressEl.textContent = `${venue.address}, ${venue.city}`;

  const mapsBtn = document.getElementById('google-maps-btn');
  if (mapsBtn) mapsBtn.href = venue.googleMapsUrl;

  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const fullAddr = `${venue.name}, ${venue.hall}, ${venue.address}, ${venue.city}`;
      navigator.clipboard.writeText(fullAddr).then(() => {
        copyAddressBtn.innerHTML = '<span>✅</span> Address Copied!';
        setTimeout(() => {
          copyAddressBtn.innerHTML = '<span>📋</span> Copy Address';
        }, 2500);
      });
    });
  }

  // Dress code
  const dressTitleEl = document.getElementById('dress-code-title');
  if (dressTitleEl) dressTitleEl.textContent = dressCode.title;
  const dressDescEl = document.getElementById('dress-code-desc');
  if (dressDescEl) dressDescEl.textContent = dressCode.description;

  const swatchesContainer = document.getElementById('palette-swatches');
  if (swatchesContainer && dressCode.palette) {
    swatchesContainer.innerHTML = '';
    dressCode.palette.forEach(colorHex => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch';
      swatch.style.backgroundColor = colorHex;
      swatch.title = colorHex;
      swatchesContainer.appendChild(swatch);
    });
  }

  // RSVP deadline
  const rsvpDeadlineEl = document.getElementById('rsvp-deadline-str');
  if (rsvpDeadlineEl) rsvpDeadlineEl.textContent = rsvp.deadline;
}

// =========================================================================
// 5. COUNTDOWN TIMER
// =========================================================================
function initCountdownTimer() {
  const targetDate = new Date(weddingConfig.event.targetDateTime).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('days-val').textContent = '00';
      document.getElementById('hours-val').textContent = '00';
      document.getElementById('mins-val').textContent = '00';
      document.getElementById('secs-val').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('days-val').textContent = pad(days);
    document.getElementById('hours-val').textContent = pad(hours);
    document.getElementById('mins-val').textContent = pad(minutes);
    document.getElementById('secs-val').textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

// =========================================================================
// 6. TIMELINE OF THE DAY
// =========================================================================
function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container || !weddingConfig.timeline) return;

  container.innerHTML = '';
  weddingConfig.timeline.forEach((item, index) => {
    const alignmentClass = index % 2 === 0 ? 'left' : 'right';

    const itemEl = document.createElement('div');
    itemEl.className = `timeline-item ${alignmentClass}`;

    itemEl.innerHTML = `
      <div class="timeline-marker">${item.icon || '❦'}</div>
      <div class="timeline-item-content">
        <span class="timeline-time">${item.time}</span>
        <h4 class="timeline-title">${item.title}</h4>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `;

    container.appendChild(itemEl);
  });
}

// =========================================================================
// 7. PHOTO GALLERY & LIGHTBOX
// =========================================================================
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');

  if (!grid || !weddingConfig.gallery) return;

  grid.innerHTML = '';
  weddingConfig.gallery.forEach((photo) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption-txt">${photo.caption}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      lightboxImg.src = photo.url;
      lightboxCaption.textContent = photo.caption;
      lightbox.showModal();
    });

    grid.appendChild(card);
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });
  }
}

// =========================================================================
// 8. FLOATING PETALS CANVAS ANIMATION (Exact colors from original site)
// =========================================================================
function initPetalAnimation() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const PETAL_COUNT = 24;
  const petals = [];
  const petalColors = ['#d5e5d1', '#a6cba4', '#8cbb8f', '#72a981', '#ffb7c5'];

  class Petal {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.1 + 0.6;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1.5 - 0.75;
      this.opacity = Math.random() * 0.5 + 0.35;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y / 45) * 0.7 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 1.6, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// =========================================================================
// 9. RSVP SUBMISSION & WHATSAPP INTEGRATION
// =========================================================================
function initRsvpHandler() {
  const form = document.getElementById('rsvp-form');
  const alertBox = document.getElementById('rsvp-status-alert');
  const whatsappBtn = document.getElementById('whatsapp-rsvp-btn');

  if (!form) return;

  // Toggle guest count based on attendance
  const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
  const guestCountContainer = document.getElementById('guest-count-container');
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (guestCountContainer) {
        guestCountContainer.style.display = e.target.value === 'declined' ? 'none' : 'flex';
      }
    });
  });

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const guestName = formData.get('guestName').trim();
    const phone = formData.get('phone').trim();
    const attendance = formData.get('attendance');
    const guestCount = formData.get('guestCount');
    const notes = formData.get('notes').trim();

    const rsvpEntry = {
      guestName,
      phone,
      attendance,
      guestCount: attendance === 'declined' ? 0 : guestCount,
      notes,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const savedList = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    savedList.push(rsvpEntry);
    localStorage.setItem('wedding_rsvps', JSON.stringify(savedList));

    // Show success alert
    alertBox.className = 'status-alert success';
    alertBox.textContent = `Thank you, ${guestName}! Your RSVP response has been recorded.`;

    // Append to wishes wall if message exists
    if (notes) {
      appendWishCard({
        author: guestName,
        text: notes,
        time: 'Just now'
      });
    }

    form.reset();
    setTimeout(() => {
      alertBox.className = 'status-alert hidden';
    }, 5000);
  });

  // Quick WhatsApp RSVP button
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const guestNameInput = document.getElementById('rsvp-guest-name');
      const guestName = guestNameInput?.value || "Guest";
      const phoneNum = weddingConfig.rsvp.whatsappNumber || "94770000000";
      const message = `Warm Greetings! This is ${guestName}. We are delighted to confirm our attendance for the wedding of ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}!`;
      const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  }
}

// =========================================================================
// 10. WISHES WALL / GUESTBOOK
// =========================================================================
function loadSampleWishes() {
  const wall = document.getElementById('wishes-wall');
  if (!wall) return;

  const sampleWishes = [
    {
      author: "Mr. & Mrs. Hettiarachchi",
      text: "Wishing you both a lifetime of boundless love, joy, and prosperity as you embark on this beautiful adventure together!",
      time: "2 days ago"
    },
    {
      author: "Dr. Kanchana & Family",
      text: "May your sacred union be blessed with endless happiness and understanding. Excited to celebrate with you!",
      time: "3 days ago"
    },
    {
      author: "Devinda & Senuri",
      text: "So thrilled for the two of you! Kavishka and Samindya, you make the most radiant couple. Counting down the days!",
      time: "1 week ago"
    }
  ];

  sampleWishes.forEach(appendWishCard);
}

function appendWishCard({ author, text, time }) {
  const wall = document.getElementById('wishes-wall');
  if (!wall) return;

  const card = document.createElement('div');
  card.className = 'wish-card';
  card.innerHTML = `
    <p class="wish-text">${escapeHtml(text)}</p>
    <div class="wish-author">${escapeHtml(author)}</div>
    <div class="wish-time">${time}</div>
  `;
  wall.prepend(card);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// =========================================================================
// 11. HOST TOOL: LINK GENERATOR
// =========================================================================
function initHostLinkGenerator() {
  const prefixInput = document.getElementById('gen-prefix');
  const nameInput = document.getElementById('gen-name');
  const resultInput = document.getElementById('gen-result-link');
  const copyBtn = document.getElementById('copy-gen-link-btn');
  const shareBtn = document.getElementById('whatsapp-share-btn');

  if (!prefixInput || !nameInput || !resultInput) return;

  function updateLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    const prefix = encodeURIComponent(prefixInput.value.trim());
    const name = encodeURIComponent(nameInput.value.trim());
    resultInput.value = `${baseUrl}?prefix=${prefix}&name=${name}`;
  }

  prefixInput.addEventListener('input', updateLink);
  nameInput.addEventListener('input', updateLink);
  updateLink();

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(resultInput.value).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Link'), 2000);
      });
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const guestName = `${prefixInput.value.trim()} ${nameInput.value.trim()}`.trim();
      const coupleNames = `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`;
      const msg = `Dear ${guestName},\n\nYou are cordially invited to celebrate our wedding day!\n\nPlease open your personalized digital invitation here:\n${resultInput.value}\n\nWarm regards,\n${coupleNames}`;
      const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }
}
