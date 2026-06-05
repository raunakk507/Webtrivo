/* ============================================================
   WEBTRIVO MOBILE.JS — White Minimal Glass Template
   ============================================================ */

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.transition = 'opacity 0.8s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }
}

// Check if page is already loaded
if (document.readyState === 'complete') {
    hideLoader();
} else {
    window.addEventListener('load', hideLoader);
}

// Failsafe: Hide loader if stuck after 2 seconds
setTimeout(hideLoader, 2000);

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. HAMBURGER MENU ── */
    const menuBtn   = document.getElementById('menuBtn');
    const menuClose = document.getElementById('menuClose');
    const drawer    = document.getElementById('menuDrawer');

    const openMenu  = () => { drawer.classList.add('open');    document.body.style.overflow = 'hidden'; };
    const closeMenu = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };

    menuBtn   && menuBtn.addEventListener('click', openMenu);
    menuClose && menuClose.addEventListener('click', closeMenu);
    drawer    && drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* ── 2. BOTTOM NAV ACTIVE SWITCHER (pathname or scroll-aware) ── */
    const botItems = document.querySelectorAll('.bot-item');

    function setActive(id) {
        botItems.forEach(i => i.classList.toggle('active', i.dataset.sec === id));
    }

    // Set active tab based on the current page filename
    const path = window.location.pathname;
    if (path.includes('mobile-work')) {
        setActive('work');
    } else if (path.includes('mobile-services')) {
        setActive('services');
    } else if (path.includes('mobile-pricing')) {
        setActive('pricing');
    } else if (path.includes('mobile-contact')) {
        setActive('contact');
    } else if (path.includes('mobile.html') || path.endsWith('/mobile') || path.endsWith('/')) {
        setActive('home');
    }

    // Support smooth scroll within same page if elements exist
    botItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const id = item.dataset.sec;
            const targetEl = document.getElementById(id);
            if (targetEl) {
                e.preventDefault();
                setActive(id);
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll-driven active tab (only if multi-section page)
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length > 1) {
        const secObserver = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.section); });
        }, { rootMargin: '-40% 0px -40% 0px' });
        sections.forEach(s => secObserver.observe(s));
    }

    /* ── 3. HERO CINEMATIC STATES ── */
    const states = [
        { 
            badge:'✦ PREMIUM WEB DESIGN', 
            w1:'Design.', w2:'Build.', w3:'Launch.', 
            c1:'#2D8CFF', c2:'#0f172a', c3:'#2D8CFF',
            sub: 'Beautiful, high-converting websites for ambitious D2C brands.'
        },
        { 
            badge:'⚡ HIGH-SPEED PERFORMANCE', 
            w1:'Fast.', w2:'Secure.', w3:'Scalable.', 
            c1:'#2D8CFF', c2:'#0f172a', c3:'#2D8CFF',
            sub: 'Websites engineered to load instantly — providing a seamless experience for every user.'
        },
        { 
            badge:'🛒 E-COMMERCE OPTIMIZED', 
            w1:'Engage.', w2:'Convert.', w3:'Grow.', 
            c1:'#2D8CFF', c2:'#0f172a', c3:'#2D8CFF',
            sub: 'We engineer digital storefronts that turn casual visitors into loyal, high-value customers.'
        }
    ];

    let idx = 0;
    const elBadge = document.getElementById('heroBadge');
    const elW1    = document.getElementById('heroW1');
    const elW2    = document.getElementById('heroW2');
    const elW3    = document.getElementById('heroW3');
    const elSub   = document.getElementById('heroSub');
    const targets = [elBadge, elW1, elW2, elW3, elSub];

    function applyState(s) {
        if (!elBadge) return;
        elBadge.textContent = s.badge;
        elW1.textContent = s.w1; elW1.style.color = s.c1;
        elW2.textContent = s.w2; elW2.style.color = s.c2;
        elW3.textContent = s.w3; elW3.style.color = s.c3;
        elSub.textContent = s.sub;
    }

    function rotatHero() {
        if (!elBadge) return;
        idx = (idx + 1) % states.length;
        targets.forEach(el => {
            if (!el) return;
            el.style.transition = 'opacity 0.28s, transform 0.28s';
            el.style.opacity = '0';
            el.style.transform = 'translateX(18px)';
        });
        setTimeout(() => {
            applyState(states[idx]);
            targets.forEach((el, i) => {
                if (!el) return;
                el.style.transform = 'translateX(-18px)';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, i * 55);
            });
        }, 300);
    }

    if (elBadge) {
        // Initialize immediately
        applyState(states[0]);
        setInterval(rotatHero, 5000);
    }

    /* ── 4. FAQ ACCORDION ── */
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const body   = btn.nextElementSibling;
            const isOpen = btn.classList.contains('open');

            document.querySelectorAll('.faq-btn').forEach(b => {
                b.classList.remove('open');
                b.nextElementSibling.style.maxHeight = '0';
            });

            if (!isOpen) {
                btn.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* ── 5. DYNAMIC SCROLL REVEAL ENGINE ── */
    const revealTargets = document.querySelectorAll('.d-card, .mobile-team-card, .faq-item, .pricing-hero-card, .m-sec-title, h1, h2, h3, .project-card, .adv-card');
    
    // Group elements by their parent container to apply automatic stagger delays
    const groups = new Map();
    revealTargets.forEach(el => {
        if (el.closest('#menuDrawer') || el.classList.contains('dash-brand')) return;
        
        el.classList.add('reveal');
        
        const parent = el.parentElement;
        if (parent) {
            if (!groups.has(parent)) {
                groups.set(parent, []);
            }
            groups.get(parent).push(el);
        }
    });
    
    // Apply staggered delays dynamically based on order in parent container
    groups.forEach(elements => {
        elements.forEach((el, index) => {
            if (index > 0 && index <= 4) {
                el.classList.add(`d${index}`);
            }
        });
    });
    
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('show');
                revealObs.unobserve(e.target); // Performance optimization: stop observing once revealed
            }
        });
    }, { 
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px' 
    });
    
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ── 6. PAGESPEED CIRCULAR GAUGE COUNT-UP ── */
    const speedScore = document.getElementById('speedScore');
    const speedCircle = document.getElementById('speedCircle');
    const speedCard = document.querySelector('.speed-card');

    if (speedScore && speedCard) {
        const animateSpeedGauge = () => {
            let current = 0;
            const target = 100;
            const duration = 1200; // ms
            const startTime = performance.now();

            // Circular progress stroke calculation
            const circumference = 314.16; // 2 * pi * 50

            const updateGauge = (timestamp) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentVal = Math.floor(easeProgress * target);
                speedScore.textContent = currentVal;
                
                // Circular stroke-dashoffset transition
                if (speedCircle) {
                    const offset = circumference - (easeProgress * circumference);
                    speedCircle.style.strokeDashoffset = offset;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateGauge);
                } else {
                    speedScore.textContent = target;
                    if (speedCircle) {
                        speedCircle.style.strokeDashoffset = 0;
                    }
                }
            };

            requestAnimationFrame(updateGauge);
        };

        // Scroll observer to trigger gauge animation once
        const speedObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateSpeedGauge();
                    speedObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });

        speedObserver.observe(speedCard);
    }


    /* ── 7. INTERACTIVE PROJECT ESTIMATOR WIDGET ── */
    const serviceGrid      = document.getElementById('serviceGrid');
    const timeframeRow     = document.getElementById('timeframeRow');
    const whatLabel        = document.getElementById('whatLabel');
    const estCTA           = document.getElementById('estCTA');
    const estTabs          = document.querySelectorAll('.est-tab');
    
    // Pricing reveal DOM elements
    const pricingReveal    = document.getElementById('pricingReveal');
    const baseValDisplay   = document.getElementById('baseValDisplay');
    const whatsappCTA      = document.getElementById('whatsappCTA');

    if (serviceGrid && timeframeRow && estCTA && pricingReveal) {
        let activeType = 'website'; // default: website (Landing Page)
        let selectedServiceText = '';
        let selectedTimeframeText = '';
        let selectedBasePrice = 0;
        let selectedMultiplier = 1.0;

        const optionsData = {
            website: {
                label: 'CHOOSE LANDING PAGE TIER:',
                services: [
                    { value: 'lead', title: 'Lead Gen Page', desc: 'Designed to capture premium prospects.', icon: '🚀', basePrice: 12999 },
                    { value: 'promo', title: 'Promo Showcase', desc: 'Cinematic layout for new product launches.', icon: '🛍️', basePrice: 14999 },
                    { value: 'saas', title: 'SaaS App Showcase', desc: 'High-tech platform sign-up layout.', icon: '💻', basePrice: 17999 },
                    { value: 'portfolio', title: 'Premium Portfolio', desc: 'Stunning personal brand storytelling.', icon: '💎', basePrice: 9999 }
                ],
                timeframes: [
                    { value: 'urgent', text: 'Urgent (1 Wk)', multiplier: 1.3 },
                    { value: 'standard', text: 'Standard (2-3 Wks)', multiplier: 1.0 },
                    { value: 'flexible', text: 'Flexible (1 Mo+)', multiplier: 0.9 }
                ]
            },
            shopify: {
                label: 'CHOOSE SHOPIFY SERVICE:',
                services: [
                    { value: 'new', title: 'Brand New Setup', desc: 'Complete custom D2C storefront launch.', icon: '🛒', basePrice: 29999 },
                    { value: 'custom', title: 'Theme Customisation', desc: 'Redesigning elements for higher conversions.', icon: '🎨', basePrice: 19999 },
                    { value: 'os2', title: 'OS 2.0 Migration', desc: 'Modular sections & faster editor speed.', icon: '⚡', basePrice: 24999 },
                    { value: 'speed', title: 'Performance Audit', desc: 'Core Web Vital boost & speed audit.', icon: '📈', basePrice: 14999 }
                ],
                timeframes: [
                    { value: 'urgent', text: 'Urgent (2 Wks)', multiplier: 1.3 },
                    { value: 'standard', text: 'Standard (3-4 Wks)', multiplier: 1.0 },
                    { value: 'flexible', text: 'Flexible (1-2 Mo)', multiplier: 0.9 }
                ]
            },
            app: {
                label: 'CHOOSE APP TYPE:',
                services: [
                    { value: 'saas', title: 'SaaS MVP Engine', desc: 'Functional interactive web application.', icon: '⚙️', basePrice: 79999 },
                    { value: 'portal', title: 'Enterprise Portal', desc: 'Admin dashboards & internal workflow tools.', icon: '🛡️', basePrice: 119999 },
                    { value: 'api', title: 'API Integration', desc: 'Seamless third-party systems connection.', icon: '⛓️', basePrice: 59999 },
                    { value: 'headless', title: 'Headless Commerce', desc: 'Hyper-speed custom storefront setup.', icon: '🧬', basePrice: 99999 }
                ],
                timeframes: [
                    { value: 'urgent', text: 'Urgent (3-4 Wks)', multiplier: 1.3 },
                    { value: 'standard', text: 'Standard (1-2 Mo)', multiplier: 1.0 },
                    { value: 'flexible', text: 'Flexible (2 Mo+)', multiplier: 0.9 }
                ]
            }
        };

        const calculateExactPrice = () => {
            const exactPrice = Math.round(selectedBasePrice * selectedMultiplier);
            
            // Format dynamic compiled price
            if (baseValDisplay) {
                baseValDisplay.textContent = '₹' + exactPrice.toLocaleString('en-IN');
            }
            
            // Update the values in our custom reveal info if they exist
            const selectedServiceValEl = document.getElementById('selectedServiceVal');
            const selectedTimeframeValEl = document.getElementById('selectedTimeframeVal');
            
            if (selectedServiceValEl) {
                selectedServiceValEl.textContent = selectedServiceText;
            }
            if (selectedTimeframeValEl) {
                selectedTimeframeValEl.textContent = selectedTimeframeText;
            }
            
            updateWhatsAppCTA(exactPrice);
        };

        const updateEstimator = () => {
            const data = optionsData[activeType];
            
            // 1. Update Section Label
            whatLabel.textContent = data.label;
            
            // 2. Populate Visual Service Choice Cards
            serviceGrid.innerHTML = '';
            data.services.forEach(s => {
                const card = document.createElement('div');
                card.className = 'service-card-choice';
                card.dataset.val = s.value;
                card.dataset.title = s.title;
                card.style.cssText = `
                    padding: 8px 6px;
                    border-radius: 10px;
                    border: 1.2px solid rgba(45, 140, 255, 0.12);
                    background: #ffffff;
                    cursor: pointer;
                    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
                    position: relative;
                `;

                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span style="font-size: 1.05rem; line-height: 1;">${s.icon}</span>
                        <span class="choice-check" style="
                            width: 12px; height: 12px;
                            border-radius: 50%;
                            border: 1.2px solid rgba(45,140,255,0.25);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: white;
                            transition: all 0.2s ease;
                        ">
                            <i class="fa-solid fa-check" style="font-size: 0.42rem; color: white; display: none;"></i>
                        </span>
                    </div>
                    <strong style="font-size: 0.68rem; font-weight: 700; color: #0f172a; line-height: 1.25; margin-top: 1px;">${s.title}</strong>
                    <span style="font-size: 0.54rem; color: #64748b; line-height: 1.2;">${s.desc}</span>
                `;

                card.addEventListener('click', () => {
                    // Selection assignment
                    selectedServiceText = s.title;
                    selectedBasePrice = s.basePrice;
                    
                    // Reset all cards styling
                    const cards = serviceGrid.querySelectorAll('.service-card-choice');
                    cards.forEach(c => {
                        c.style.borderColor = 'rgba(45, 140, 255, 0.12)';
                        c.style.background = '#ffffff';
                        c.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                        c.style.transform = 'scale(1)';
                        
                        const check = c.querySelector('.choice-check');
                        const checkIcon = c.querySelector('.fa-check');
                        check.style.background = 'white';
                        check.style.borderColor = 'rgba(45,140,255,0.25)';
                        checkIcon.style.display = 'none';
                    });

                    // Set active card styling
                    card.style.borderColor = '#2D8CFF';
                    card.style.background = 'linear-gradient(135deg, rgba(45, 140, 255, 0.02) 0%, rgba(45, 140, 255, 0.05) 100%)';
                    card.style.boxShadow = '0 4px 10px rgba(45, 140, 255, 0.1), inset 0 1px 1px white';
                    card.style.transform = 'scale(0.97)'; // Tactile pressed scale bounce

                    const activeCheck = card.querySelector('.choice-check');
                    const activeCheckIcon = card.querySelector('.fa-check');
                    activeCheck.style.background = '#2D8CFF';
                    activeCheck.style.borderColor = '#2D8CFF';
                    activeCheckIcon.style.display = 'block';

                    calculateExactPrice();
                });

                serviceGrid.appendChild(card);
            });

            // 3. Populate Timeframe Pills
            timeframeRow.innerHTML = '';
            data.timeframes.forEach(t => {
                const pill = document.createElement('div');
                pill.className = 'timeframe-pill';
                pill.dataset.val = t.value;
                pill.textContent = t.text;
                pill.style.cssText = `
                    padding: 6px 10px;
                    border-radius: 50px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    border: 1.2px solid rgba(45, 140, 255, 0.12);
                    background: #ffffff;
                    color: #475569;
                    text-align: center;
                    cursor: pointer;
                    flex: 1;
                    transition: all 0.2s ease;
                `;

                pill.addEventListener('click', () => {
                    selectedTimeframeText = t.text;
                    selectedMultiplier = t.multiplier || 1.0;

                    // Reset all pills styling
                    const pills = timeframeRow.querySelectorAll('.timeframe-pill');
                    pills.forEach(p => {
                        p.style.borderColor = 'rgba(45, 140, 255, 0.12)';
                        p.style.background = '#ffffff';
                        p.style.color = '#475569';
                        p.style.boxShadow = 'none';
                    });

                    // Set active pill styling
                    pill.style.borderColor = '#2D8CFF';
                    pill.style.background = 'rgba(45, 140, 255, 0.08)';
                    pill.style.color = '#2D8CFF';
                    pill.style.boxShadow = '0 3px 8px rgba(45, 140, 255, 0.08)';

                    calculateExactPrice();
                });

                timeframeRow.appendChild(pill);
            });

            // Trigger click on first card and standard timeframe pill initially
            if (serviceGrid.firstElementChild) serviceGrid.firstElementChild.click();
            if (timeframeRow.children.length >= 2) {
                timeframeRow.children[1].click(); // standard
            } else if (timeframeRow.firstElementChild) {
                timeframeRow.firstElementChild.click();
            }
        };

        const generateInvoicePDF = (category, service, timeline, price, callback) => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Colors: Sleek Brand Navy (#0f172a) and Accent Blue (#2D8CFF)
            const navy = [15, 23, 42];
            const blue = [45, 140, 255];
            const lightGrey = [241, 245, 249];
            const borderGrey = [226, 232, 240];

            // 1. Top Decorative Header Bar (Accent Blue)
            doc.setFillColor(blue[0], blue[1], blue[2]);
            doc.rect(0, 0, 210, 4, 'F');

            // 2. Webtrivo Logo & Invoice Title
            doc.setTextColor(navy[0], navy[1], navy[2]);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("WEBTRIVO", 15, 22);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text("HIGH-PERFORMANCE WEB ENGINEERING", 15, 26);

            // Invoice Label (Right Aligned)
            doc.setTextColor(navy[0], navy[1], navy[2]);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("PROJECT ESTIMATE", 140, 22);

            // 3. Invoice Meta Details Box (Grey background card)
            doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
            doc.rect(15, 34, 180, 24, 'F');

            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text("Estimate No:", 20, 41);
            doc.text("Date:", 20, 47);
            doc.text("Valid Until:", 20, 53);

            const estNo = "WT-EST-" + Math.floor(Math.random() * 90000 + 10000);
            const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            const expStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

            doc.setFont("helvetica", "normal");
            doc.text(estNo, 45, 41);
            doc.text(dateStr, 45, 47);
            doc.text(expStr, 45, 53);

            // Right side of meta box: Client Details
            doc.setFont("helvetica", "bold");
            doc.text("Prepared For:", 110, 41);
            doc.setFont("helvetica", "normal");
            doc.text("Webtrivo Valued Client", 110, 47);
            doc.text("Custom Estimator Submission", 110, 53);

            // 4. Line Items Table Headers
            doc.setFillColor(navy[0], navy[1], navy[2]);
            doc.rect(15, 68, 180, 8, 'F');

            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text("Scope & Service Specification", 20, 73);
            doc.text("Qty", 120, 73);
            doc.text("Launch Priority", 140, 73);
            doc.text("Amount (INR)", 170, 73);

            // 5. Line Item Row
            doc.setFont("helvetica", "normal");
            doc.setTextColor(navy[0], navy[1], navy[2]);
            
            // Draw a subtle border under the row
            doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
            doc.line(15, 88, 195, 88);

            doc.setFont("helvetica", "bold");
            doc.text(service, 20, 82);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(7.5);
            doc.setTextColor(100, 116, 139);
            doc.text(`Category: ${category} Setup & Deployment`, 20, 85);

            doc.setFontSize(8);
            doc.setTextColor(navy[0], navy[1], navy[2]);
            doc.text("1", 122, 82);
            doc.text(timeline, 140, 82);
            doc.setFont("helvetica", "bold");
            doc.text("₹" + price.toLocaleString('en-IN'), 170, 82);

            // 6. Project Inclusions
            doc.setFillColor(250, 250, 250);
            doc.rect(15, 96, 180, 26, 'F');
            
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(blue[0], blue[1], blue[2]);
            doc.text("⚡ WEBTRIVO DEPLOYMENT STANDARDS INCLUDED:", 20, 102);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(7);
            doc.setTextColor(71, 85, 105);
            doc.text("• 100% Google PageSpeed Performance Score Guarantee", 20, 107);
            doc.text("• Full responsive dynamic scaling (optimized for iOS, Android, and Web)", 20, 111);
            doc.text("• Core Web Vitals SEO indexing readiness & clean modular semantic HTML structure", 20, 115);
            doc.text("• 30-day post-launch warranty with unlimited lifetime critical support", 20, 119);

            // 7. Total Due Box
            doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
            doc.rect(120, 130, 75, 14, 'F');

            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(navy[0], navy[1], navy[2]);
            doc.text("Guaranteed Total:", 125, 139);
            doc.setTextColor(blue[0], blue[1], blue[2]);
            doc.setFontSize(11);
            doc.text("₹" + price.toLocaleString('en-IN'), 158, 139);

            // 8. Signature / Footer area
            doc.setFontSize(7.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(navy[0], navy[1], navy[2]);
            doc.text("Authorized Webtrivo Signatory", 15, 160);

            doc.setDrawColor(200, 200, 200);
            doc.line(15, 172, 70, 172);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(6.5);
            doc.setTextColor(148, 163, 184);
            doc.text("This is an electronically generated estimate valid under Webtrivo agency licensing standards.", 15, 177);

            // Get PDF Blob and execute callback
            const pdfBlob = doc.output('blob');
            callback(pdfBlob);
        };

        const updateWhatsAppCTA = (exactPrice) => {
            // Simply update standard pre-fill state in case of direct manual clicks
            const categoryLabel = activeType === 'website' ? 'Landing Page' : activeType === 'shopify' ? 'Shopify Store' : 'Custom Web App';
            const messageText = `Hi Webtrivo! 🚀\n\nI just designed a custom project brief on your website estimator:\n\n• Project Category: ${categoryLabel}\n• Service Needed: ${selectedServiceText}\n• Timeline Priority: ${selectedTimeframeText}\n• My Guaranteed Price: ₹${exactPrice.toLocaleString('en-IN')}\n\nPlease get in touch to discuss details and start building! 📈`;
            
            whatsappCTA.href = `https://wa.me/919229840686?text=${encodeURIComponent(messageText)}`;
        };

        // Dynamic interactive Share Guide Drawer logic to visually instruct user on selection
        const shareGuideOverlay   = document.getElementById('shareGuideOverlay');
        const shareGuideDrawer    = document.getElementById('shareGuideDrawer');
        const shareGuideFileLabel = document.getElementById('shareGuideFileLabel');
        const launchShareBtn      = document.getElementById('launchShareBtn');

        const dismissShareGuide = () => {
            if (shareGuideOverlay && shareGuideDrawer) {
                shareGuideDrawer.style.transform = 'translateY(100%)';
                shareGuideOverlay.style.opacity = '0';
                setTimeout(() => {
                    shareGuideOverlay.style.display = 'none';
                }, 350);
            }
        };

        if (shareGuideOverlay) {
            shareGuideOverlay.addEventListener('click', (e) => {
                if (e.target === shareGuideOverlay) {
                    dismissShareGuide();
                }
            });
        }

        if (whatsappCTA) {
            whatsappCTA.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update file title inside dynamic drawer
                if (shareGuideFileLabel) {
                    shareGuideFileLabel.textContent = `Webtrivo-${selectedServiceText.replace(/\s+/g, '-')}-Invoice.pdf (7.6 KB)`;
                }

                // Smooth slide up animation trigger
                if (shareGuideOverlay && shareGuideDrawer) {
                    shareGuideOverlay.style.display = 'flex';
                    shareGuideOverlay.offsetHeight; // force reflow
                    shareGuideOverlay.style.opacity = '1';
                    shareGuideDrawer.style.transform = 'translateY(0)';
                }
            });
        }

        const loadjsPDF = (callback) => {
            if (window.jspdf) {
                callback();
                return;
            }
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
            script.async = true;
            script.onload = () => {
                callback();
            };
            script.onerror = () => {
                console.error("Failed to load jsPDF library");
            };
            document.head.appendChild(script);
        };

        if (launchShareBtn) {
            launchShareBtn.addEventListener('click', () => {
                dismissShareGuide();
                
                const exactPrice = Math.round(selectedBasePrice * selectedMultiplier);
                const categoryLabel = activeType === 'website' ? 'Landing Page' : activeType === 'shopify' ? 'Shopify Store' : 'Custom Web App';
                
                // Show loading state
                const originalHTML = launchShareBtn.innerHTML;
                launchShareBtn.disabled = true;
                launchShareBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating Invoice...`;
                
                loadjsPDF(() => {
                    generateInvoicePDF(categoryLabel, selectedServiceText, selectedTimeframeText, exactPrice, (pdfBlob) => {
                        // Restore button state
                        launchShareBtn.disabled = false;
                        launchShareBtn.innerHTML = originalHTML;

                        const filename = `Webtrivo-${selectedServiceText.replace(/\s+/g, '-')}-Invoice.pdf`;
                        const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
                        
                        const shareText = `Hi Webtrivo! 🚀\n\nI just designed a custom project brief on your website estimator:\n\n• Project Category: ${categoryLabel}\n• Service Needed: ${selectedServiceText}\n• Timeline Priority: ${selectedTimeframeText}\n• Guaranteed Price: ₹${exactPrice.toLocaleString('en-IN')}\n\nPlease review my attached official estimate invoice! 📈`;

                        // Check if native sharing of files is supported (Web Share API Level 2)
                        if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
                            navigator.share({
                                files: [pdfFile],
                                title: 'Webtrivo Project Estimate',
                                text: shareText
                            })
                            .catch((error) => {
                                console.log('Share failed:', error);
                                // Fallback if native share fails or is canceled
                                const waUrl = `https://wa.me/919229840686?text=${encodeURIComponent(shareText)}`;
                                window.open(waUrl, '_blank');
                            });
                        } else {
                            // Desktop / Fallback mode: Direct URL pre-fill
                            const waUrl = `https://wa.me/919229840686?text=${encodeURIComponent(shareText)}`;
                            window.open(waUrl, '_blank');
                        }
                    });
                });
            });
        }

        // Toggle Pricing reveal button listener
        estCTA.addEventListener('click', () => {
            if (pricingReveal.style.display === 'none' || pricingReveal.style.display === '') {
                pricingReveal.style.display = 'flex';
                pricingReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                estCTA.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Recalculate Price`;
            } else {
                pricingReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Attach tab toggle events
        estTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                estTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeType = tab.dataset.type;
                updateEstimator();
            });
        });

        // Initialize
        updateEstimator();
    }

    // ── 8. HERO CAROUSEL AUTO-SCROLL CONTROLLER ──
    const hcCarousel = document.querySelector('.hero-carousel');

    if (hcCarousel) {
        let isAutoScrolling = true;
        let scrollInterval = null;

        // Clone the first card and append it to the end for a seamless infinite loop
        const cards = hcCarousel.querySelectorAll('.hc-card');
        if (cards.length > 0) {
            const clone = cards[0].cloneNode(true);
            hcCarousel.appendChild(clone);
        }

        const getCardWidth = () => {
            const card = hcCarousel.querySelector('.hc-card');
            return card ? card.offsetWidth + 12 : hcCarousel.offsetWidth; // card + gap
        };

        const startAutoScroll = () => {
            if (scrollInterval) clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (!isAutoScrolling) return;
                
                const cardWidth = getCardWidth();
                const originalCardsCount = cards.length; // number of cards before clone was appended
                
                // Calculate current snapped index
                let currentIndex = Math.round(hcCarousel.scrollLeft / cardWidth);
                let nextIndex = currentIndex + 1;
                
                // Scroll smoothly to nextIndex
                hcCarousel.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' });
                
                // If we just scrolled to the clone (index originalCardsCount, i.e., 4)
                if (nextIndex === originalCardsCount) {
                    // Wait for the smooth scroll animation to finish (600ms), then instantly reset to 0
                    setTimeout(() => {
                        if (isAutoScrolling) {
                            hcCarousel.scrollTo({ left: 0, behavior: 'auto' });
                        }
                    }, 600);
                }
            }, 2500);
        };

        // Pause auto-scroll on manual touch interaction, resume after delay
        let resumeTimeout = null;
        hcCarousel.addEventListener('touchstart', () => {
            isAutoScrolling = false;
            if (resumeTimeout) clearTimeout(resumeTimeout);
        }, { passive: true });

        hcCarousel.addEventListener('touchend', () => {
            resumeTimeout = setTimeout(() => {
                isAutoScrolling = true;
            }, 6000); // Wait 6 seconds after manual interaction to resume
        }, { passive: true });

        // Start initial auto scroll timer
        startAutoScroll();
    }

    /* ── 9. DYNAMIC PILL HEADER SCROLL CONTROLLER ── */
    const header = document.querySelector('.dash-header');
    if (header) {
        let isScrolled = false;
        const handleScroll = () => {
            const currentScrolled = window.scrollY > 15;
            if (currentScrolled !== isScrolled) {
                isScrolled = currentScrolled;
                if (isScrolled) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run initially in case page is loaded at a scroll position
    }

    /* ── 10. WHATSAPP CONCIERGE DRAWER INTERACTION ── */
    const floatingWABtn   = document.getElementById('floatingWABtn');
    const waDrawerOverlay = document.getElementById('waDrawerOverlay');
    const waDrawer        = document.getElementById('waDrawer');
    const waDrawerClose   = document.getElementById('waDrawerClose');
    const waTplBtns       = document.querySelectorAll('.wa-tpl-btn');

    if (floatingWABtn && waDrawer && waDrawerOverlay) {
        const openWADrawer = (e) => {
            e.preventDefault();
            waDrawerOverlay.classList.add('active');
            waDrawer.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeWADrawer = () => {
            waDrawerOverlay.classList.remove('active');
            waDrawer.classList.remove('open');
            document.body.style.overflow = '';
        };

        floatingWABtn.addEventListener('click', openWADrawer);
        waDrawerClose && waDrawerClose.addEventListener('click', closeWADrawer);
        waDrawerOverlay.addEventListener('click', closeWADrawer);

        // Bind templates
        waTplBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.dataset.msg;
                const encodedMsg = encodeURIComponent(msg);
                const waUrl = `https://wa.me/919229840686?text=${encodedMsg}`;
                window.open(waUrl, '_blank');
                closeWADrawer();
            });
        });
    }

});
