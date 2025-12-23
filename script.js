/* ===================================
   QUIT FAP PAL - Complete JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // LOADING SCREEN
    // ===================================
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 1800);
    });
    
    // Fallback: hide loading screen after 3 seconds max
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 3000);
    
    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    const scrollProgress = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // ===================================
    // NAVBAR
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (backToTop) {
            if (currentScroll > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }, { passive: true });
    
    // Back to top click handler
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
    
    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ===================================
    // FAQ ACCORDION
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const isExpanded = item.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded);
            });
        }
    });
    
    // ===================================
    // CONTACT FORM WITH TOAST
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    // Create toast element
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = 'toast ' + type + ' show';
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    showToast('✓ Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed');
                }
            } catch (error) {
                showToast('⚠ Something went wrong. Please try again.', 'error');
            }
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    }
    
    // ===================================
    // CURSOR GLOW EFFECT (Desktop only)
    // ===================================
    if (window.innerWidth > 1024) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .testimonial-card, .privacy-card, .faq-question, .plan-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
        });
        
        document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
    }
    
    // ===================================
    // BUTTON RIPPLE EFFECT
    // ===================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0}}';
    document.head.appendChild(style);
    
    // ===================================
    // PARALLAX EFFECTS
    // ===================================
    const heroMascot = document.querySelector('.hero-mascot-floating');
    const heroPhone = document.querySelector('.phone-mockup');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            if (heroMascot) {
                heroMascot.style.transform = `translateY(${scrolled * 0.15}px) rotate(${-2 + scrolled * 0.01}deg)`;
            }
            if (heroPhone) {
                heroPhone.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }
    }, { passive: true });
    
    // ===================================
    // NUMBER COUNTER ANIMATION
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    }
    
    // Animate counters when they come into view
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ===================================
    // ESCAPE KEY HANDLERS
    // ===================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Close any open FAQ items
            faqItems.forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // ===================================
    // CLICK OUTSIDE TO CLOSE
    // ===================================
    document.addEventListener('click', function(e) {
        // Close mobile menu
        if (navLinks && navToggle) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // ===================================
    // VIDEO AUTOPLAY FIX
    // ===================================
    document.querySelectorAll('video[autoplay]').forEach(video => {
        video.play().catch(() => {
            const playOnScroll = () => {
                video.play();
                window.removeEventListener('scroll', playOnScroll);
            };
            window.addEventListener('scroll', playOnScroll, { once: true, passive: true });
        });
    });
    
    // ===================================
    // LAZY LOAD IMAGES
    // ===================================
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // ===================================
    // TESTIMONIALS AUTO-HIGHLIGHT
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 0) {
        setInterval(() => {
            testimonialCards.forEach(card => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
            testimonialCards[currentTestimonial].style.transform = 'translateY(-8px)';
            testimonialCards[currentTestimonial].style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.12)';
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        }, 4000);
    }
    
    // ===================================
    // PLAN CARDS HOVER EFFECT
    // ===================================
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            planCards.forEach(c => c.style.transform = '');
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    console.log('%c🔥 Quit Fap Pal', 'font-size:24px;font-weight:bold;color:#9333EA');
    console.log('%cBuilding strength, one day at a time.', 'font-size:14px;color:#666');
    console.log('%cInterested in the code? Check out: github.com/MisterAllHands/quitfappal', 'font-size:12px;color:#999');
    
});
