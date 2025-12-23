/* ===================================
   QUIT FAP PAL - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVBAR
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ===================================
    // FAQ ACCORDION
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ===================================
    // CONTACT FORM (Using Formspree)
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success toast
                    showToast('Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Fallback: Open mailto
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                const mailtoLink = `mailto:7anon777@gmail.com?subject=${encodeURIComponent(`[QuitFapPal] ${subject}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                
                window.location.href = mailtoLink;
                showToast('Opening your email client...');
            }
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    }
    
    function showToast(message) {
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
    
    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const animatedElements = document.querySelectorAll('.feature-card, .step, .privacy-card, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ===================================
    // PARALLAX EFFECT (subtle)
    // ===================================
    const heroMascot = document.querySelector('.hero-mascot');
    
    if (heroMascot) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < 800) {
                heroMascot.style.transform = `translateY(${scrolled * 0.1}px) rotate(-2deg)`;
            }
        });
    }
    
    // ===================================
    // COUNTER ANIMATION (for stats)
    // ===================================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // TYPING EFFECT FOR HERO (optional)
    // ===================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add subtle glow animation to gradient text
        const gradientText = heroTitle.querySelector('.gradient-text');
        if (gradientText) {
            setInterval(() => {
                gradientText.style.filter = 'brightness(1.1)';
                setTimeout(() => {
                    gradientText.style.filter = 'brightness(1)';
                }, 500);
            }, 3000);
        }
    }
    
    // ===================================
    // PRELOADER (optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===================================
    // ESCAPE KEY TO CLOSE MOBILE MENU
    // ===================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // ===================================
    // CLICK OUTSIDE TO CLOSE MOBILE MENU
    // ===================================
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
});

// ===================================
// FORMSPREE ALTERNATIVE: Web3Forms (Free)
// ===================================
// If Formspree doesn't work, you can use Web3Forms
// 1. Go to https://web3forms.com
// 2. Enter your email: 7anon777@gmail.com
// 3. Get your access key
// 4. Replace the form action with:
//    https://api.web3forms.com/submit
// 5. Add hidden input: <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
