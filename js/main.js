/* ==========================================
   wolfSec Portfolio — Core Scripts
   Author: Md. Golam Rasul
   ========================================== */

(function () {
    'use strict';

    // ========================
    // BOOT SEQUENCE
    // ========================
    const bootLines = [
        '[*] Initializing wolfSec kernel...',
        '[+] Loading security modules........OK',
        '[+] Mounting /dev/portfolio.........OK',
        '[+] Checking firewall rules.........ACTIVE',
        '[+] Scanning for threats............CLEAR',
        '[+] Loading encryption keys.........OK',
        '[+] Verifying identity..............AUTHENTICATED',
        '[*] System ready.',
        '',
        '    ██╗    ██╗ ██████╗ ██╗     ███████╗',
        '    ██║    ██║██╔═══██╗██║     ██╔════╝',
        '    ██║ █╗ ██║██║   ██║██║     █████╗  ',
        '    ██║███╗██║██║   ██║██║     ██╔══╝  ',
        '    ╚███╔███╔╝╚██████╔╝███████╗██║     ',
        '     ╚══╝╚══╝  ╚═════╝ ╚══════╝╚═╝    ',
        '                         S E C          ',
        '',
        '[*] Welcome, visitor. Access granted.'
    ];

    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    let bootIndex = 0;
    let charIndex = 0;

    function typeBoot() {
        if (bootIndex < bootLines.length) {
            const line = bootLines[bootIndex];
            if (charIndex < line.length) {
                bootText.textContent += line[charIndex];
                charIndex++;
                const speed = line.startsWith('    ') ? 8 : (Math.random() * 15 + 5);
                setTimeout(typeBoot, speed);
            } else {
                bootText.textContent += '\n';
                bootIndex++;
                charIndex = 0;
                const delay = bootIndex === bootLines.length - 1 ? 500 : (Math.random() * 100 + 30);
                setTimeout(typeBoot, delay);
            }
        } else {
            setTimeout(() => {
                bootScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                startAnimations();
            }, 800);
        }
    }

    document.body.style.overflow = 'hidden';
    setTimeout(typeBoot, 500);

    // ========================
    // MATRIX RAIN
    // ========================
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,./<>?アイウエオカキクケコサシスセソ';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });

    // ========================
    // CUSTOM CURSOR
    // ========================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX - 17.5 + 'px';
            cursorRing.style.top = ringY - 17.5 + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .cert-card, .info-card, .nav-toggle');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // ========================
    // TYPEWRITER EFFECT
    // ========================
    const typewriterTexts = [
        'Offensive Security Researcher',
        'Penetration Tester',
        'Bug Bounty Hunter',
        'SOC Analyst',
        'CTF Player @ Team-Bitsec'
    ];

    let textIndex = 0;
    let txtCharIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    function typeWriter() {
        if (!typewriterEl) return;

        const currentText = typewriterTexts[textIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentText.substring(0, txtCharIndex - 1);
            txtCharIndex--;
        } else {
            typewriterEl.textContent = currentText.substring(0, txtCharIndex + 1);
            txtCharIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && txtCharIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && txtCharIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            speed = 400;
        }

        setTimeout(typeWriter, speed);
    }

    // ========================
    // NAVBAR
    // ========================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ========================
    // SCROLL ANIMATIONS
    // ========================
    function handleScrollAnimations() {
        const animElements = document.querySelectorAll(
            '.timeline-item, .skill-card, .project-card, .cert-card, .training-card, .fade-in-line, .info-card'
        );

        animElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });

        // Skill bar animation
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const card = bar.closest('.skill-card');
            if (card && card.classList.contains('visible')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);

    // ========================
    // COUNTER ANIMATION
    // ========================
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 50);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 50);
        });
    }

    // ========================
    // CONTACT FORM
    // ========================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#00cc6a';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ========================
    // START AFTER BOOT
    // ========================
    function startAnimations() {
        typeWriter();
        animateCounters();
        handleScrollAnimations();

        // Stagger info cards animation
        document.querySelectorAll('.info-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 150);
        });
    }

    // ========================
    // SMOOTH SCROLL for anchor links
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================
    // KONAMI CODE EASTER EGG
    // ========================
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ========================
    // PARALLAX on hero section
    // ========================
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    });

})();