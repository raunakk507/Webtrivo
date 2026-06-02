
// ==========================================
// 1. Lenis Smooth Scrolling Engine
// ==========================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0, 0)


// ==========================================
// 2. Three.js 'White Luxury / Glass Orbs' Engine
// ==========================================
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Clear previous
    container.innerHTML = '';

    const scene = new THREE.Scene();
    // Scene background transparent to show hero-bg
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 30);
    scene.add(directionalLight);

    // Create Elegant Floating Shapes (Glass/Gold)
    const shapes = [];
    const geometry1 = new THREE.IcosahedronGeometry(2, 0); // Geometric tech vibe
    const geometry2 = new THREE.SphereGeometry(1.5, 32, 32); // Smooth glass vibe
    const geometry3 = new THREE.TorusGeometry(1.5, 0.5, 16, 100);

    // Premium Materials
    const lightBlueMaterial = new THREE.MeshStandardMaterial({
        color: 0x89CFF0,
        metalness: 0.1,
        roughness: 0.5,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.9, // glass effect
        ior: 1.5,
        thickness: 0.5,
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.3,
    });

    for(let i = 0; i < 40; i++) {
        let mesh;
        const rand = Math.random();
        if (rand < 0.4) mesh = new THREE.Mesh(geometry1, lightBlueMaterial);
        else if (rand < 0.7) mesh = new THREE.Mesh(geometry2, glassMaterial);
        else mesh = new THREE.Mesh(geometry3, whiteMaterial);

        mesh.position.x = (Math.random() - 0.5) * 200;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 100;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Custom animation speeds
        mesh.userData = {
            rx: (Math.random() - 0.5) * 0.02,
            ry: (Math.random() - 0.5) * 0.02,
            yOff: Math.random() * Math.PI * 2,
            yAmp: Math.random() * 0.1
        };

        shapes.push(mesh);
        scene.add(mesh);
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animation Loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        // Move camera slightly for parallax
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        shapes.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rx;
            mesh.rotation.y += mesh.userData.ry;
            mesh.position.y += Math.sin(time + mesh.userData.yOff) * mesh.userData.yAmp;
        });

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
initThreeJS();

// ==========================================
// 3. Original Website Logic
// ==========================================

// Initialize Lucide Icons
// lucide.createIcons();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.getElementById('closeMenu');
const menuLinks = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks) {
    // Open Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close Menu Functions
    const hideMenu = () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    if (closeMenu) {
        closeMenu.addEventListener('click', hideMenu);
    }

    // Auto-close on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', hideMenu);
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Content Fade-In
gsap.from('.hero-logo', { opacity: 0, y: -50, duration: 1, delay: 0.2 });
gsap.from('#hero-title', { opacity: 0, scale: 0.9, duration: 1, delay: 0.5 });
gsap.from('.hero-subtext', { opacity: 0, y: 20, duration: 1, delay: 0.8 });
gsap.from('.hero-tagline', { opacity: 0, letterSpacing: '1em', duration: 1.5, delay: 1 });
gsap.from('.hero-actions', { opacity: 0, y: 30, duration: 1, delay: 1.3 });

// Section Fade-In Animation
const sections = ['services', 'portfolio', 'why-us', 'stats', 'pricing', 'team', 'contact'];
sections.forEach(section => {
    const el = document.querySelector(`#${section} .section-header`);
    if (el) {
        gsap.from(el, {
            scrollTrigger: {
                trigger: `#${section}`,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    }
});

// Featured Work Reveal
gsap.from('#featured-work .container > div > div', {
    scrollTrigger: {
        trigger: '#featured-work',
        start: 'top 70%',
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.3
});

// Portfolio Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                gsap.to(card, { opacity: 1, scale: 1, display: 'block', duration: 0.4 });
            } else {
                gsap.to(card, { opacity: 0, scale: 0.8, display: 'none', duration: 0.4 });
            }
        });
    });
});

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    gsap.to(counter, {
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 80%',
        },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.out'
    });
});

// Page Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                animateHero();
            }, 800);
        }, 1500);
    }
});

// Scroll Top Logic
window.addEventListener('scroll', () => {
    const topBtn = document.getElementById('scrollTop');
    if (topBtn) {
        if (window.scrollY > 500) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }
});

// Hero Content Animation
const animateHero = () => {
    gsap.from('.hero-logo', { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.7)" });
    gsap.from('#hero-title', { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        stagger: 0.2,
        delay: 0.3 
    });
    gsap.from('.hero-subtext, .hero-tagline', { 
        opacity: 0, 
        x: -30, 
        duration: 1, 
        delay: 0.6 
    });
    gsap.from('.hero-actions', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        delay: 1 
    });
};

// Form Submission Enhanced
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "👑 Building Your Empire...";
        btn.disabled = true;

        setTimeout(() => {
            alert('Success! Our team will contact you within 24 hours to discuss your project.');
            btn.innerText = originalText;
            btn.disabled = false;
            e.target.reset();
        }, 2000);
    });
}

// Premium Cursor Engine
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let cursorX = 0, cursorY = 0;
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    // Smooth interpolation for the outline
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }

    if (cursorOutline) {
        cursorOutline.style.left = `${cursorX}px`;
        cursorOutline.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animateCursor);
};
animateCursor();

// Hover Effects
const hoverables = document.querySelectorAll('a, button, .btn-3d, .service-card, .portfolio-card, .pricing-card, .team-card, .filter-btn, .logo-container');
hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (cursorOutline) cursorOutline.classList.add('cursor-hover');
        if (cursorDot) cursorDot.classList.add('cursor-hover-dot');
    });
    item.addEventListener('mouseleave', () => {
        if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
        if (cursorDot) cursorDot.classList.remove('cursor-hover-dot');
    });
});


