// main.js - Animations GSAP, Scroll fluide (Lenis) et logiques UI

// ============================================================
// API - Chargement dynamique des données depuis le Backend
// ============================================================
const API_URL = 'http://127.0.0.1:8001/api';

async function loadPortfolioData() {
    try {
        // Charger toutes les données en parallèle pour la rapidité
        const [profileRes, projectsRes, skillsRes, postersRes] = await Promise.all([
            fetch(`${API_URL}/profile/`),
            fetch(`${API_URL}/projects/`),
            fetch(`${API_URL}/skills/`),
            fetch(`${API_URL}/posters/`),
        ]);

        const [profiles, projects, skills, posters] = await Promise.all([
            profileRes.json(),
            projectsRes.json(),
            skillsRes.json(),
            postersRes.json(),
        ]);

        // --- Profil / À Propos ---
        if (profiles.length > 0) {
            const profile = profiles[0];
            const p1 = document.getElementById('about-p1');
            const p2 = document.getElementById('about-p2');
            const cvLink = document.querySelector('a[download]');

            if (profile.about_text) {
                const parts = profile.about_text.split('\n\n');
                if (p1 && parts[0]) p1.textContent = parts[0];
                if (p2 && parts[1]) p2.textContent = parts[1];
            }
            if (cvLink && profile.cv_url) {
                cvLink.href = profile.cv_url;
            }
        }

        // --- Compétences ---
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid && skills.length > 0) {
            skillsGrid.innerHTML = skills.map(cat => `
                <div class="skill-category fade-up">
                    <h3>${cat.name}</h3>
                    <div class="skill-pills">
                        ${cat.skills.map(s => `<span class="skill-pill">${s.name}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        // --- Projets ---
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (portfolioGrid && projects.length > 0) {
            portfolioGrid.innerHTML = projects.map(p => `
                <div class="portfolio-card portfolio-item">
                    <div class="portfolio-img-container">
                        ${p.client_project ? '<div class="portfolio-badge">Projet client</div>' : ''}
                        <img src="${p.image_url}" alt="${p.title}" class="portfolio-img">
                    </div>
                    <div class="portfolio-info">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <div style="margin-bottom: 1.2rem;">
                            ${p.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join(' ')}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // --- Posters ---
        const postersGrid = document.getElementById('posters-grid');
        if (postersGrid && posters.length > 0) {
            postersGrid.innerHTML = posters.map(p => `
                <div class="poster-item fade-up">
                    <img src="${p.image_url}" alt="${p.title}" class="poster-img">
                </div>
            `).join('');
        }

    } catch (err) {
        // Fallback silencieux : si l'API est hors ligne, on affiche rien
        // (les sections restent vides mais le site reste fonctionnel)
        console.warn('API non disponible, données statiques utilisées.', err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    
    // Charger les données depuis l'API AVANT les animations GSAP
    await loadPortfolioData();


    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // ----------------------------------------------------
    // 1. Initialisation de Lenis (Smooth Scroll)
    // ----------------------------------------------------
    let lenis;
    if (!prefersReducedMotion) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }


    // ----------------------------------------------------
    // 2. Menu Mobile (Hamburger & Accessibilité)
    // ----------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link, .nav-links .btn-primary');

    function toggleMobileMenu() {
        if (!mobileMenuBtn || !navLinks) return;
        
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        const isExpanded = mobileMenuBtn.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        
        if (lenis) {
            if (isExpanded) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (mobileMenuBtn.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuBtn.classList.contains('active')) {
                toggleMobileMenu();
                mobileMenuBtn.focus();
            }
        });
    }

    // ----------------------------------------------------
    // 3. Mise à jour de l'année du Copyright & Formulaire
    // ----------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('[type="submit"]');
            formStatus.style.color = "var(--color-text-main)";
            formStatus.textContent = "Envoi en cours...";
            submitBtn.disabled = true;

            const name    = document.getElementById('name').value;
            const email   = document.getElementById('email').value;
            const phone   = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const content = document.getElementById('message').value;

            // Envoi simultané : Django API + Formspree
            const FORMSPREE_URL = 'https://formspree.io/f/maqrlzbo';

            const djangoPayload = fetch(`${API_URL}/messages/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, content })
            });

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('message', content);
            const formspreePayload = fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            try {
                // On attend les deux en parallèle
                const [djangoRes] = await Promise.all([djangoPayload, formspreePayload]);

                if (djangoRes.ok) {
                    formStatus.style.color = "var(--color-accent)";
                    formStatus.textContent = "✓ Message envoyé avec succès ! Je vous réponds très vite.";
                    contactForm.reset();
                    setTimeout(() => formStatus.textContent = "", 5000);
                } else {
                    formStatus.style.color = "red";
                    formStatus.textContent = "Erreur lors de l'envoi. Réessayez.";
                }
            } catch (error) {
                formStatus.style.color = "red";
                formStatus.textContent = "Erreur de connexion. Le serveur est peut-être hors ligne.";
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    // ----------------------------------------------------
    // 4. Curseur Personnalisé
    // ----------------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    if (!isTouchDevice && cursor && !prefersReducedMotion) {
        document.body.classList.add('has-custom-cursor');
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, .portfolio-card, a, button, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }


    // ----------------------------------------------------
    // 5. Animations GSAP Générales & Effet Hero Reveal
    // ----------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    if (!prefersReducedMotion) {
        const heroTl = gsap.timeline();
        const heroTitle = document.querySelector('.hero-title');
        
        if (heroTitle && !isMobile) {
            const text1 = "Construire l'avenir tech du";
            const text2 = "Sénégal";
            
            const splitToWordsAndChars = (text) => text.split(' ').map(word => 
                `<span class="word" style="white-space: nowrap; display: inline-block;">${word.split('').map(char => `<span class="char">${char}</span>`).join('')}</span>`
            ).join(' ');
            
            const splitText1 = splitToWordsAndChars(text1);
            const splitText2 = splitToWordsAndChars(text2);
            
            heroTitle.innerHTML = `${splitText1} <span class="highlight-text" style="display: inline-block;">${splitText2}</span>`;
            
            gsap.set('.hero-title .char', { opacity: 0, y: 50, rotationZ: 10 });
            
            heroTl.to('.hero-title .char', {
                opacity: 1,
                y: 0,
                rotationZ: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.5)",
                delay: 0.2
            })
            .to(".section-hero .fade-up", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.4");
            
        } else {
            if(heroTitle) heroTitle.classList.add('fade-up');
            heroTl.to(".section-hero .fade-up", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.2
            });
        }

        // Reveal Portfolio
        const portfolioCards = gsap.utils.toArray('.portfolio-item');
        portfolioCards.forEach(card => {
            const imgContainer = card.querySelector('.portfolio-img-container');
            const info = card.querySelector('.portfolio-info');
            
            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            cardTl.fromTo(imgContainer, 
                { clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: "power4.inOut" }
            )
            .fromTo(info,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );
        });

        // Éléments génériques fade-up
        gsap.utils.toArray('section').forEach(section => {
            if(section.id === 'portfolio' || section.id === 'hero') return;
            
            const fadeElements = section.querySelectorAll('.fade-up');
            if(fadeElements.length > 0) {
                gsap.to(fadeElements, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                });
            }
        });

        gsap.utils.toArray('.reveal-text').forEach(title => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    } else {
        // En mode reduced motion, s'assurer que tout est visible
        document.querySelectorAll('.fade-up, .reveal-text, .portfolio-info').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
        document.querySelectorAll('.portfolio-img-container').forEach(el => {
            el.style.clipPath = 'none';
        });
    }


    // ----------------------------------------------------
    // 6. Terminal Typewriter Effect
    // ----------------------------------------------------
    const terminalContent = document.getElementById('terminal-content');
    const commands = [
        { cmd: "django-admin startproject pas_digital", res: "✓ Project initialized successfully", class: "cmd-success" },
        { cmd: "flutter build apk --release", res: "✓ Built build/app/outputs/flutter-apk/app-release.apk", class: "cmd-success" },
        { cmd: "npm run deploy:impact", res: "Deploying to production... Done! 🚀", class: "cmd-success" }
    ];

    if (terminalContent) {
        if (prefersReducedMotion) {
            // Affiche directement tout sans animation
            terminalContent.innerHTML = commands.map(c => `
                <div class="cmd-line"><span class="cmd-path">$</span> <span class="cmd-text">${c.cmd}</span></div>
                <div class="${c.class}">${c.res}</div>
            `).join('');
        } else {
            let cmdIndex = 0;
            let charIndex = 0;
            let isTyping = false;
            let historyHTML = "";

            function typeCommand() {
                if (cmdIndex >= commands.length) {
                    // Loop the animation
                    setTimeout(() => {
                        cmdIndex = 0;
                        historyHTML = "";
                        terminalContent.innerHTML = "";
                        typeCommand();
                    }, 3000);
                    return;
                }

                const currentCmd = commands[cmdIndex].cmd;

                if (!isTyping) {
                    isTyping = true;
                    charIndex = 0;
                }

                if (charIndex <= currentCmd.length) {
                    const currentText = currentCmd.substring(0, charIndex);
                    terminalContent.innerHTML = historyHTML + `<div class="cmd-line"><span class="cmd-path">$</span> <span class="cmd-text">${currentText}</span></div>`;
                    charIndex++;
                    setTimeout(typeCommand, 50); // Typing speed
                } else {
                    // Commande tapée, afficher le résultat
                    historyHTML += `
                        <div class="cmd-line"><span class="cmd-path">$</span> <span class="cmd-text">${currentCmd}</span></div>
                        <div class="${commands[cmdIndex].class}">${commands[cmdIndex].res}</div><br/>
                    `;
                    terminalContent.innerHTML = historyHTML;
                    isTyping = false;
                    cmdIndex++;
                    setTimeout(typeCommand, 1500); // Pause before next command
                }
            }

            // Start typing effect when section is in view
            const terminalObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    typeCommand();
                    terminalObserver.disconnect();
                }
            });
            terminalObserver.observe(document.querySelector('.terminal-widget'));
        }
    }


    // ----------------------------------------------------
    // 7. Configuration Three.js avec IntersectionObserver
    // ----------------------------------------------------
    if (typeof THREE !== 'undefined' && !isMobile && !prefersReducedMotion) {
        
        let isHeroVisible = false;
        let isAboutVisible = false;

        const observerOptions = { root: null, threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target.id === 'hero') {
                    isHeroVisible = entry.isIntersecting;
                }
                if (entry.target.id === 'about') {
                    isAboutVisible = entry.isIntersecting;
                }
            });
        }, observerOptions);

        observer.observe(document.getElementById('hero'));
        observer.observe(document.getElementById('about'));

        // -------- HERO 3D (Réseau Filaire / Wireframe Network) --------
        const canvasHero = document.getElementById('canvas3d');
        let rendererHero, sceneHero, cameraHero, pointsHero, linesHero;
        
        if (canvasHero) {
            rendererHero = new THREE.WebGLRenderer({ canvas: canvasHero, alpha: true, antialias: true });
            rendererHero.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            rendererHero.setSize(window.innerWidth, window.innerHeight);

            sceneHero = new THREE.Scene();
            cameraHero = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            cameraHero.position.z = 60;

            const particlesCount = 100;
            const posArray = new Float32Array(particlesCount * 3);
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 120;
            }

            const geometryNetwork = new THREE.BufferGeometry();
            geometryNetwork.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const materialNetwork = new THREE.PointsMaterial({
                size: 1.2,
                color: 0xe0b533, // Accent color
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending
            });
            pointsHero = new THREE.Points(geometryNetwork, materialNetwork);
            sceneHero.add(pointsHero);

            // Connect lines
            const linesGeo = new THREE.BufferGeometry();
            const linePositions = [];
            for (let i = 0; i < particlesCount; i++) {
                const x1 = posArray[i * 3];
                const y1 = posArray[i * 3 + 1];
                const z1 = posArray[i * 3 + 2];
                for (let j = i + 1; j < particlesCount; j++) {
                    const x2 = posArray[j * 3];
                    const y2 = posArray[j * 3 + 1];
                    const z2 = posArray[j * 3 + 2];
                    const dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2);
                    if (dist < 25) { // Threshold for connection
                        linePositions.push(x1, y1, z1, x2, y2, z2);
                    }
                }
            }
            linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            
            const materialLine = new THREE.LineBasicMaterial({
                color: 0x144ec4, // Primary color
                transparent: true,
                opacity: 0.15
            });
            linesHero = new THREE.LineSegments(linesGeo, materialLine);
            sceneHero.add(linesHero);
        }

        // -------- ABOUT : Laptop 3D flottant --------
        const canvasAbout = document.getElementById('canvas-about');
        const aboutContainer = document.querySelector('.about-3d-container');
        
        let rendererAbout, sceneAbout, cameraAbout, laptopGroup;
        if (canvasAbout && aboutContainer) {
            rendererAbout = new THREE.WebGLRenderer({ canvas: canvasAbout, alpha: true, antialias: true });
            rendererAbout.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            rendererAbout.setSize(aboutContainer.clientWidth, aboutContainer.clientHeight);

            sceneAbout = new THREE.Scene();
            cameraAbout = new THREE.PerspectiveCamera(45, aboutContainer.clientWidth / aboutContainer.clientHeight, 0.1, 100);
            cameraAbout.position.z = 25;
            cameraAbout.position.x = -8; // Shift to the left slightly so it fits next to text

            laptopGroup = new THREE.Group();

            // Base
            const baseGeo = new THREE.BoxGeometry(12, 0.5, 8);
            const matDark = new THREE.MeshBasicMaterial({ color: 0x0f172a }); // Light bg color
            const matScreen = new THREE.MeshBasicMaterial({ color: 0x144ec4, transparent: true, opacity: 0.8 }); // Primary blue
            
            // Add subtle wireframe to make it look "techy"
            const wireframeMat = new THREE.LineBasicMaterial({ color: 0x2462e3, transparent: true, opacity: 0.3 });
            
            const base = new THREE.Mesh(baseGeo, matDark);
            const baseWire = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), wireframeMat);
            base.add(baseWire);
            laptopGroup.add(base);

            // Screen
            const screenGeo = new THREE.BoxGeometry(12, 8, 0.4);
            const screen = new THREE.Mesh(screenGeo, matDark);
            const screenWire = new THREE.LineSegments(new THREE.EdgesGeometry(screenGeo), wireframeMat);
            screen.add(screenWire);
            
            screen.position.y = 4;
            screen.position.z = -4 + 0.2;
            screen.rotation.x = -0.2; // Slightly angled back
            
            // Inner glowing screen
            const innerScreenGeo = new THREE.PlaneGeometry(11.2, 7.2);
            const innerScreen = new THREE.Mesh(innerScreenGeo, matScreen);
            innerScreen.position.z = 0.21;
            screen.add(innerScreen);

            laptopGroup.add(screen);

            laptopGroup.rotation.y = -0.4;
            laptopGroup.rotation.x = 0.1;
            
            sceneAbout.add(laptopGroup);
        }

        // -------- ABOUT : Parallax photo --------
        const photoComposition = document.getElementById('about-photo-composition');
        const photoBadges = document.querySelectorAll('.tech-badge');
        let aboutParallaxX = 0, aboutParallaxY = 0;

        if (photoComposition && !isMobile) {
            document.addEventListener('mousemove', (e) => {
                const rect = photoComposition.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                aboutParallaxX = (e.clientX - cx) / rect.width;
                aboutParallaxY = (e.clientY - cy) / rect.height;

                const photoCircle = photoComposition.querySelector('.about-photo-circle');
                if (photoCircle) {
                    photoCircle.style.transform = `translate(${aboutParallaxX * -6}px, ${aboutParallaxY * -6}px)`;
                }

                photoBadges.forEach((badge, i) => {
                    const factor = 4 + i * 1.5;
                    badge.style.transform = `translate(${aboutParallaxX * factor}px, ${aboutParallaxY * factor}px)`;
                });
            });
        }

        // -------- RESIZE --------
        window.addEventListener('resize', () => {
            if (cameraHero && rendererHero) {
                cameraHero.aspect = window.innerWidth / window.innerHeight;
                cameraHero.updateProjectionMatrix();
                rendererHero.setSize(window.innerWidth, window.innerHeight);
            }
            if (cameraAbout && rendererAbout && aboutContainer) {
                cameraAbout.aspect = aboutContainer.clientWidth / aboutContainer.clientHeight;
                cameraAbout.updateProjectionMatrix();
                rendererAbout.setSize(aboutContainer.clientWidth, aboutContainer.clientHeight);
            }
        });

        const clock = new THREE.Clock();
        
        function animateFrame() {
            requestAnimationFrame(animateFrame);
            const elapsedTime = clock.getElapsedTime();
            
            // Custom Cursor Anim
            if (!isTouchDevice && cursor && !prefersReducedMotion) {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
            }

            // Render Hero (Wireframe Network) only if visible
            if (isHeroVisible && rendererHero && pointsHero) {
                pointsHero.rotation.y = elapsedTime * 0.05;
                linesHero.rotation.y = elapsedTime * 0.05;
                
                // Subtle interactive rotation based on mouse
                const targetRotX = (mouseY / window.innerHeight - 0.5) * 0.2;
                const targetRotY = (mouseX / window.innerWidth - 0.5) * 0.2;
                pointsHero.rotation.x += 0.05 * (targetRotX - pointsHero.rotation.x);
                linesHero.rotation.x += 0.05 * (targetRotX - linesHero.rotation.x);
                
                rendererHero.render(sceneHero, cameraHero);
            }

            // Render About (Laptop) only if visible
            if (isAboutVisible && rendererAbout && laptopGroup) {
                // Floating effect
                laptopGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.8;
                // Slowly rotating
                laptopGroup.rotation.y = -0.4 + Math.sin(elapsedTime * 0.5) * 0.1;
                
                rendererAbout.render(sceneAbout, cameraAbout);
            }
        }
        
        // Démarrage de la boucle globale optimisée
        animateFrame();
    }
});
