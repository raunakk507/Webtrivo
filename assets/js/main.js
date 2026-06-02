/* === BLOCK 1: STABLE INIT & SITE LOGIC === */
// ==========================================
// Super Stable Init Logic
// ==========================================

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.transition = 'opacity 0.8s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
                console.log('ScrollTrigger refreshed after loader hide');
            }
        }, 800);
        console.log('Loader hidden successfully');
    }
}

// Start Everything function
function startWebtrivo() {
      console.log("Starting WEBTRIVO initialization...");
      try { initLenis(); } catch(e) { console.error(e); }
      try { initSiteLogic(); } catch(e) { console.error(e); }
      hideLoader();
      
      // Post-load failsafe refresh after layout has fully settled
      setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
              console.log('ScrollTrigger post-load settled refresh executed');
          }
      }, 1000);
  }

// THE FIX: Check if page is already loaded
if (document.readyState === 'complete') {
    startWebtrivo();
} else {
    window.addEventListener('load', startWebtrivo);
}

// Failsafe: If loader still exists after 2 seconds, kill it
setTimeout(hideLoader, 2000);


// ==========================================
// 1. Lenis Smooth Scrolling Engine
// ==========================================
let lenis;
function initLenis() {
    try {
        if (typeof Lenis === 'undefined') return;
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
        });
        lenis.on('scroll', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update(); });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        console.log('Lenis initialized');
    } catch (e) { console.error('Lenis error:', e); }
}

// ==========================================
// 2. Three.js 'White Luxury / Glass Orbs' Engine
// ==========================================
function initThreeJS() { 
    try {
        console.log("Three.js skipped for performance"); 
    } catch (e) { 
        console.error('Three.js error:', e); 
    }
}

// ==========================================
// 3. Original Website Logic
// ==========================================
function initSiteLogic() {
    try {
        // if (typeof lucide !== 'undefined') lucide.createIcons();

        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
            const topBtn = document.getElementById('scrollTop');
            if (topBtn) topBtn.classList.toggle('show', window.scrollY > 500);
        });

        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const closeMenu = document.getElementById('closeMenu');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => navLinks.classList.add('active'));
        }
        
        if (closeMenu && navLinks) {
            closeMenu.addEventListener('click', () => navLinks.classList.remove('active'));
        }

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992 && navLinks) {
                    navLinks.classList.remove('active');
                }
            });
        });

        // Optimized Image Observer for Bandwidth Saving
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, observerOptions);

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });

        if (typeof gsap !== 'undefined') {
            if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const val = btn.getAttribute('data-filter');
                    document.querySelectorAll('.portfolio-card').forEach(card => {
                        const match = val === 'all' || card.getAttribute('data-category').includes(val);
                        gsap.to(card, { opacity: match ? 1 : 0, scale: match ? 1 : 0.8, display: match ? 'block' : 'none', duration: 0.4 });
                    });
                });
            });

            document.querySelectorAll('.counter').forEach(c => {
                const target = +c.getAttribute('data-target');
                gsap.to(c, { scrollTrigger: { trigger: '#stats', start: 'top 80%' }, innerText: target, duration: 2, snap: { innerText: 1 }, ease: 'power1.out' });
            });
        }

        // Contact form is now handled by Web3Forms (no JS needed)

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (cursorDot && cursorOutline) {
            window.addEventListener('mousemove', (e) => {
                cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
                cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
            });
            document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card, .pricing-card, .team-card, .filter-btn').forEach(item => {
                item.addEventListener('mouseenter', () => { cursorOutline.classList.add('cursor-hover'); cursorDot.classList.add('cursor-hover-dot'); });
                item.addEventListener('mouseleave', () => { cursorOutline.classList.remove('cursor-hover'); cursorDot.classList.remove('cursor-hover-dot'); });
            });
        }
        console.log('Site logic initialized');
    } catch (e) { console.error('Site logic error:', e); }
}

// 3D Laptop Frame Player Engine
// Laptop player engine removed

// Failsafe: Hide loader if stuck after 3 seconds
setTimeout(hideLoader, 3000);



/* === BLOCK 2: PORTFOLIO SHOWCASE MODAL === */
        const modal = document.getElementById('projectModal');
        const projects = {
            kingveen: {
                title: "NEONLAB Premium Store",
                category: "PREMIUM SHOWCASE",
                desc: "A futuristic, high-performance product showcase built to elevate brand prestige. Features include dynamic custom transitions, immersive digital aesthetics, and a fully responsive architecture optimized for all devices.",
                url: "https://kingveen-by-webtrivo.netlify.app/",
                images: ["assets/img/kingveen1.png", "assets/img/kingveen2.png", "assets/img/kingveen3.png"]
            },
            artisan: {
                title: "Artisan Home",
                category: "INTERIOR E-COMMERCE",
                desc: "A premium furniture and interior design e-commerce platform. Features a clean, sophisticated aesthetic with high-resolution galleries, room-based categories, and a seamless shopping experience.",
                url: "https://artlisanhome.netlify.app/",
                images: ["assets/img/artisan1.png"]
            }
        };

        function openProjectModal(projectId) {
            const data = projects[projectId];
            if (!data) return;

            document.getElementById('mainModalImg').src = data.images[0];
            const thumbRow = document.querySelector('.thumbnail-row');
            thumbRow.innerHTML = '';
            
            if (data.images.length > 1) {
                thumbRow.style.display = 'flex';
                data.images.forEach((img, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = img;
                    thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
                    thumb.onclick = () => switchModalImg(img, thumb);
                    thumbRow.appendChild(thumb);
                });
            } else {
                thumbRow.style.display = 'none';
            }

            document.querySelector('.modal-info h3').innerText = data.title;
            document.querySelector('.modal-info .portfolio-category').innerText = data.category;
            document.querySelector('.modal-info p').innerText = data.desc;
            document.querySelector('.modal-actions a.btn-primary').href = data.url;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Project Modal logic (Existing)
        function closeProjectModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function switchModalImg(src, thumb) {
            document.getElementById('mainModalImg').src = src;
            document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        }

        window.onclick = function(event) {
            if (event.target == modal) closeProjectModal();
        }

/* === BLOCK 3: HERO CINEMATIC STATE MACHINE === */
        // ==========================================
        // HERO CINEMATIC STATE MACHINE
        // ==========================================
        const heroStates = [
            {
                badge: "PREMIUM WEB DESIGN",
                title: ["Design.", "Build.", "Launch."],
                subtext: "We build beautiful, high-converting Full-Stack websites for ambitious D2C brands.",
                colors: ["#ffd700", "#ffffff", "#ffd700"], 
                badgeColor: "#ffd700",
                subtextColor: "rgba(255,255,255,0.8)",
                shadow: "0 10px 40px rgba(255, 215, 0, 0.3)",
                bgIndex: 0 // Dark Purple
            },
            {
                badge: "HIGH-SPEED PERFORMANCE",
                title: ["Fast.", "Secure.", "Scalable."],
                subtext: "Websites engineered to load instantly, providing a seamless experience for your customers.",
                colors: ["#ffffff", "#38bdf8", "#ffffff"], 
                badgeColor: "#38bdf8",
                subtextColor: "rgba(255,255,255,0.7)",
                shadow: "0 10px 30px rgba(56, 189, 248, 0.2)",
                bgIndex: 1 // Deep Navy
            },
            {
                badge: "E-COMMERCE OPTIMIZED",
                title: ["Engage.", "Convert.", "Grow."],
                subtext: "More than just design—we engineer digital storefronts optimized to turn visitors into buyers.",
                colors: ["#0f172a", "#38bdf8", "#0f172a"], 
                badgeColor: "#0f172a",
                subtextColor: "#64748b",
                shadow: "none",
                bgIndex: 2 // Luxury White
            }
        ];

        let currentHeroState = 0;
        const bgStates = document.querySelectorAll('.hero-bg-state');
        const badgeTextEl = document.querySelector('#state-badge');
        const heroWords = [
            document.querySelector('#state-word-1'),
            document.querySelector('#state-word-2'),
            document.querySelector('#state-word-3')
        ];
        const heroSubtextEl = document.querySelector('#hero-subtext');
        const heroBadgeEl = document.querySelector('#hero-badge');
        const heroMainTitleEl = document.querySelector('#hero-main-title');

        function updateHeroState() {
            currentHeroState = (currentHeroState + 1) % heroStates.length;
            const state = heroStates[currentHeroState];
            console.log("Transitioning to Hero State: " + state.badge);

            // FASTER Background Transition
            bgStates.forEach((bg, i) => {
                gsap.to(bg, { opacity: i === state.bgIndex ? 1 : 0, duration: 1, ease: "power2.inOut" });
            });

            // Professional Horizontal Slider Transition
            const tl = gsap.timeline();
            tl.to([heroMainTitleEl, heroSubtextEl, heroBadgeEl], { x: 100, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.in" })
              .call(() => {
                  badgeTextEl.textContent = state.badge;
                  badgeTextEl.style.color = state.badgeColor;
                  heroSubtextEl.textContent = state.subtext;
                  heroSubtextEl.style.color = state.subtextColor;
                  heroWords.forEach((w, i) => {
                      w.textContent = state.title[i];
                      w.style.color = state.colors[i];
                      w.style.textShadow = state.shadow;
                      w.style.webkitTextStroke = state.bgIndex === 2 ? "none" : "0.5px rgba(255,255,255,0.1)"; // No outline on light theme
                  });
                  // Reset position for entrance
                  gsap.set([heroMainTitleEl, heroSubtextEl, heroBadgeEl], { x: -100 });
              })
              .to([heroMainTitleEl, heroSubtextEl, heroBadgeEl], { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" });
        }

        // Initialize Hero on Load
        window.addEventListener('load', () => {
            // Initial Animation
            gsap.to('#hero-badge', { opacity: 1, y: 0, duration: 1.2, delay: 0.5 });
            gsap.to('#hero-main-title', { opacity: 1, y: 0, duration: 1.2, delay: 0.7 });
            gsap.to('#hero-subtext', { opacity: 1, y: 0, duration: 1.2, delay: 0.9 });
            gsap.to('#hero-ctas', { opacity: 1, y: 0, duration: 1.2, delay: 1.1 });

            // Start Cycle
            setInterval(updateHeroState, 5000);

            // Close Loader
            const loader = document.getElementById('loader');
            if(loader) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.style.display = 'none', 500);
                }, 1000);
            }
        });

/* === BLOCK 4: AUTO-SCROLL TICKERS, ACCORDIONS & THEMES === */
        // ==========================================
        // UNIFIED SMOOTH TICKER AUTO-SCROLL
        // ==========================================
        function initMobileAutoScroll() {
            const tickerSelectors = [
                '#case-studies-grid', 
                '.why-grid', 
                '#insights-grid', 
                '.partnership-grid'
            ];

            tickerSelectors.forEach(selector => {
                const container = document.querySelector(selector);
                if (!container) return;

                let isPaused = false;
                let exactScroll = 0;
                const speed = 0.5; // Slightly slower, ultra-smooth pixel increment

                function tick() {
                    if (!isPaused) {
                        exactScroll += speed;
                        container.scrollLeft = Math.floor(exactScroll);
                        
                        // Loop back if reached the end
                        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 1)) {
                            exactScroll = 0;
                            container.scrollLeft = 0;
                        }
                    } else {
                        // Sync exactScroll with actual position if user manually swipes while paused
                        exactScroll = container.scrollLeft;
                    }
                    requestAnimationFrame(tick);
                }

                container.addEventListener('touchstart', () => isPaused = true, {passive: true});
                container.addEventListener('touchend', () => setTimeout(() => isPaused = false, 1500), {passive: true});
                
                requestAnimationFrame(tick);
            });
        }

        // Theme Toggle Logic
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleFloat = document.getElementById('theme-toggle-float');
        const body = document.body;

        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animation effect for icons
            const icons = document.querySelectorAll('.theme-toggle i');
            icons.forEach(icon => {
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 500);
            });
        }

        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        if (themeToggleFloat) themeToggleFloat.addEventListener('click', toggleTheme);

        // 3. FAQ ACCORDION LOGIC
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');
                const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

                // Close all other items
                faqItems.forEach(other => {
                    other.querySelector('.faq-answer').style.maxHeight = '0px';
                    other.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                });

                if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        window.addEventListener('load', initMobileAutoScroll);

/* === BLOCK 5: PIPELINE SLIDER === */
        // Auto-scroll for Pipeline Slider
        const pipelineSlider = document.querySelector('.pipeline-slider');
        if (pipelineSlider) {
            let pipelineStep = 0;
            const totalPipelineSteps = 3;
            
            setInterval(() => {
                pipelineStep = (pipelineStep + 1) % totalPipelineSteps;
                const scrollTarget = pipelineStep * (pipelineSlider.querySelector('.pipeline-step').offsetWidth + 30);
                pipelineSlider.scrollTo({
                    left: scrollTarget,
                    behavior: 'smooth'
                });
            }, 4000);
        }

/* ════════════════════════════════════════
   GSAP SCROLL-TRIGGER ENTRANCE ANIMATIONS
   Premium individual card reveal system
   ════════════════════════════════════════ */
(function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ── Section Headers: Blur-in from bottom ──
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 50, filter: 'blur(8px)', duration: 0.9, ease: 'power3.out'
        });
    });

    // ── Service Cards: Individual scale-in ──
    gsap.utils.toArray('.service-card, .partnership-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, scale: 0.8, y: 40, duration: 0.7, ease: 'back.out(1.4)'
        });
    });

    // ── Portfolio Cards: Individual fade up ──
    gsap.utils.toArray('.portfolio-card, .case-study-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
        });
    });

    // ── Process Steps: Individual slide from left ──
    gsap.utils.toArray('.process-card, .process-step, [id="process"] .glass-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, x: -50, duration: 0.7, ease: 'power2.out'
        });
    });

    // ── Why Us Cards ──
    gsap.utils.toArray('#why-us .glass-card, #why-us .service-card, #why-us .why-item, #why-us [class*="card"]').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 50, scale: 0.9, duration: 0.7, ease: 'power3.out'
        });
    });

    // ── Insight Cards ──
    gsap.utils.toArray('#insights [class*="card"], #insights .insight-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 40, duration: 0.7, ease: 'power2.out'
        });
    });

    // ── Stats Counters: Scale pop ──
    gsap.utils.toArray('#stats .counter, #stats [class*="stat"]').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, scale: 0.5, duration: 0.6, ease: 'back.out(2)'
        });
    });

    // ── Pricing Cards: Staggered rise ──
    gsap.utils.toArray('.pricing-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 60, duration: 0.8, ease: 'power3.out'
        });
    });

    // ── Team Cards: Scale + rotate slight ──
    gsap.utils.toArray('.team-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, scale: 0.85, rotation: 2, duration: 0.7, ease: 'power3.out'
        });
    });

    // ── FAQ Items: Slide from right ──
    gsap.utils.toArray('#faq .faq-item, #faq [class*="faq"]').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'restart none none reset' },
            opacity: 0, x: 40, duration: 0.6, ease: 'power2.out'
        });
    });

    // ── Contact Section ──
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
        gsap.from('#contact .section-header', {
            scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
        });
        gsap.from('#contact .glass-card, #contact form', {
            scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 50, scale: 0.95, duration: 0.9, ease: 'power3.out', delay: 0.2
        });
    }

    // ── About / Featured Work section ──
    const aboutEl = document.querySelector('#about');
    if (aboutEl) {
        gsap.from('#about', {
            scrollTrigger: { trigger: '#about', start: 'top 80%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 50, duration: 1, ease: 'power3.out'
        });
    }
    const featuredEl = document.querySelector('#featured-work');
    if (featuredEl) {
        gsap.from('#featured-work', {
            scrollTrigger: { trigger: '#featured-work', start: 'top 80%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 60, duration: 1, ease: 'power3.out'
        });
    }

    // ── Disclaimer / Footer ──
    const disclaimerEl = document.querySelector('#disclaimer');
    if (disclaimerEl) {
        gsap.from('#disclaimer', {
            scrollTrigger: { trigger: '#disclaimer', start: 'top 90%', toggleActions: 'restart none none reset' },
            opacity: 0, y: 30, duration: 0.7, ease: 'power2.out'
        });
    }

    // ── Global: Any remaining elements with .gs-fade-up class ──
    gsap.utils.toArray('.gs-fade-up').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'restart none none reset' },
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    console.log('GSAP ScrollTrigger animations initialized');
})();