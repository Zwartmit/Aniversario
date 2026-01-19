// --- Three.js Background Animation ---
const initThreeJS = () => {
  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Galaxy Background Logic
  const parameters = {
    count: 3000,
    size: 0.1,
    radius: 30,
    branches: 4,
    spin: 1,
    randomness: 0.5,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Use clone to avoid mutating the original color object repeatedly in a weird way (though not strictly necessary if lerp returns self, safety first)
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Initial rotation
  points.rotation.x = 0.5;

  // Animation Loop
  const animate = () => {
    points.rotation.y += 0.001; // Slow rotation

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  // Resize Handle
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

// --- GSAP Animations ---
const initAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Note: Hero text animation is set to manual typewriter now, so we remove the original H1 tween
  const heroTl = gsap.timeline();
  // Animate button only, wait for date logic to show text
  heroTl.from('.btn-primary', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 2 });

  // Timeline Events
  gsap.utils.toArray('.event').forEach((event, i) => {
    gsap.from(event, {
      scrollTrigger: {
        trigger: event,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: i % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Gallery Photos
  gsap.utils.toArray('.photo-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: i * 0.2, // Stagger effect
      ease: 'power4.out'
    });
  });

  // Letters
  gsap.from('.letter-card', {
    scrollTrigger: {
      trigger: '.letters-grid',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out'
  });
};

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initAnimations();

  // Smooth Scroll to Timeline
  window.scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle Event Details (Accordion behavior)
  window.toggleEvent = (element) => {
    // Close all other events first
    document.querySelectorAll('.event').forEach(event => {
      if (event !== element) {
        event.classList.remove('active');
      }
    });

    // Toggle the clicked event
    element.classList.toggle('active');
  };

  // Toggle Letter
  window.toggleLetter = (element) => {
    // Close others
    document.querySelectorAll('.letter-card').forEach(card => {
      if (card !== element) card.classList.remove('open');
    });
    element.classList.toggle('open');
  };
});

// Typewriter Effect for H1
const typeText = (element, text, speed = 75, callback) => {
  element.textContent = "";
  element.style.opacity = 1;
  let i = 0;

  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
};

// Date Counter Animation
const animateDateCounter = () => {
  const el = document.getElementById('hero-date-counter');
  const h1 = document.querySelector('h1');
  const titleText = "Hace un año empezó algo increíble...";

  if (!el) return;

  // 1. Typewriter Start
  // Reduced speed to 75ms (faster than 100ms)
  typeText(h1, titleText, 75, () => {

    // START DATE ANIMATION ONLY AFTER H1 FINISHES

    // Initial State visible
    el.innerText = '20/01/2025';

    // Fade in date
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

    // Use (Year, MonthIndex, Day) to ensure Local Time
    const startDate = new Date(2025, 0, 20).getTime(); // Jan is 0
    const endDate = new Date(2026, 0, 20).getTime();
    const duration = 2000; // 2 seconds
    let startTime = null;

    const update = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);

      // Ease In (Starts slow, ends fast) -> t^3
      const easedProgress = Math.pow(progress, 3);

      const currentMap = startDate + (endDate - startDate) * easedProgress;
      const dateObj = new Date(currentMap);

      // Format DD/MM/YYYY
      const d = String(dateObj.getDate()).padStart(2, '0');
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const y = dateObj.getFullYear();

      el.innerText = `${d}/${m}/${y}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // 2. Final Value Reached
        el.innerText = '20/01/2026';

        // 3. Zoom Animation & Reveal
        triggerFinalReveal(el);
      }
    };

    // Wait a small moment (500ms) after title finishes before showing date
    setTimeout(() => {
      requestAnimationFrame(update);
    }, 500);
  });
};

// Final Reveal Logic
const triggerFinalReveal = (dateElement) => {
  // DATE ZOOM EFFECT
  gsap.to(dateElement, {
    scale: 10,        // Zoom in massive
    opacity: 0,       // Fade out
    duration: 1.5,
    ease: "power2.in",
    onComplete: () => {
      // 1. Capture H1 Position (First)
      const h1 = document.querySelector('h1');
      const startY = h1.getBoundingClientRect().top;

      // 2. Change Layout
      dateElement.style.display = 'none'; // Remove date
      const revealContainer = document.getElementById('final-reveal');

      if (revealContainer) {
        revealContainer.style.display = 'flex'; // Show final content

        // 3. Capture H1 Position (Last) & Calculate Delta
        const endY = h1.getBoundingClientRect().top;
        const deltaY = startY - endY;

        // 4. Animate H1 (Smooth Slide Up)
        gsap.fromTo(h1,
          { y: deltaY }, // Start from visual original position
          { y: 0, duration: 1.5, ease: "power3.inOut" } // Move to new position smoothly
        );

        // 5. Animate Reveal Container (Fade In)
        gsap.to(revealContainer, {
          opacity: 1,
          duration: 1.5,
          delay: 0.3, // Slight delay to sync with H1 movement
          ease: "power2.out",
          onComplete: () => {
            // Enable Scroll Interaction for Heart
            setupHeartScrollEffect();
          }
        });
      }
    }
  });
};

const setupHeartScrollEffect = () => {
  // Heart Zoom Effect (only for intro heart)
  gsap.to('#intro .heart-wrapper', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onEnter: () => {
        // Stop pulsating when scrolling starts to avoid conflict
        const introHeart = document.querySelector('#intro .burning-heart');
        if (introHeart) introHeart.style.animation = 'none';
      },
      onLeaveBack: () => {
        // Restore pulsating when back at top
        const introHeart = document.querySelector('#intro .burning-heart');
        if (introHeart) introHeart.style.animation = 'burnPulse 1.5s infinite alternate';
      }
    },
    scale: 15,
    y: 600,
    opacity: 0,
    ease: "power1.in"
  });

  // Hide Scroll Indicator on Scroll
  gsap.to('.scroll-indicator', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: '10% top',   // Disappear quickly
      scrub: true
    },
    opacity: 0,
    y: -20
  });
};

// Force scroll to top on page load/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Loading Screen Logic
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-overlay');
  const loaderBtn = document.querySelector('.loader-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  let isPlaying = false;

  // Click to start experience
  if (loaderBtn && bgMusic) {
    loaderBtn.addEventListener('click', () => {
      // Start music
      bgMusic.muted = false;
      bgMusic.volume = 0.3;
      bgMusic.play().then(() => {
        isPlaying = true;
        if (musicToggle) {
          musicToggle.classList.add('playing');
          musicToggle.querySelector('.music-icon').textContent = '🔊';
        }
      }).catch(err => {
        console.log('Error playing music:', err);
      });

      // Fade out loader
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';

        // Refresh ScrollTrigger and start animations
        setTimeout(() => {
          ScrollTrigger.refresh();
          animateDateCounter();
        }, 500);
      }, 800);
    });
  }

  // Music toggle functionality
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
        isPlaying = false;
      } else {
        bgMusic.muted = false;
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
          musicToggle.classList.add('playing');
          musicToggle.querySelector('.music-icon').textContent = '🔊';
          isPlaying = true;
        }).catch(err => {
          console.log('Error playing music:', err);
        });
      }
    });
  }
});
