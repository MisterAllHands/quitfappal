/* ===================================
   QUITBRUV - Website Interactions
   =================================== */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function createToast() {
    let toast = document.getElementById('toast') || document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.id = 'toast';
        toast.innerHTML = '<span class="toast-icon">✓</span><span class="toast-message"></span>';
        document.body.appendChild(toast);
    }

    return toast;
}

function showToast(toast, message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');

    if (toastMessage) {
        toastMessage.textContent = message;
    } else {
        toast.textContent = message;
    }

    if (toastIcon) {
        toastIcon.textContent = type === 'success' ? '✓' : '!';
    }

    toast.classList.remove('success', 'error', 'show');
    toast.classList.add(type, 'show');

    window.setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    const closeMenu = () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    };

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                closeMenu();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });
}

function setupFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        });
    });
}

async function submitWeb3Form(formData) {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Form submission failed');
    }

    return response;
}

function setupContactForm(toast) {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        const formData = new FormData(contactForm);
        const topic = formData.get('topic');
        const message = formData.get('message');

        if (topic) {
            formData.set('subject', `Website Contact (${topic}) - QuitBruv`);
            if (typeof message === 'string' && message.trim().length > 0) {
                formData.set('message', `Topic: ${topic}\n\n${message}`);
            }
        }

        try {
            await submitWeb3Form(formData);
            showToast(toast, 'Message sent. We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showToast(toast, 'Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function setupWaitlistForms(toast) {
    const waitlistForms = document.querySelectorAll('.waitlist-form');
    if (waitlistForms.length === 0) return;

    waitlistForms.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalText = submitBtn.innerHTML;
            const formData = new FormData(form);

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Saving...';

            try {
                await submitWeb3Form(formData);
                form.innerHTML = `
                    <div class="success-state">
                        <span class="checkmark">✓</span>
                        <strong>You're in!</strong>
                        <p>You're on the early-access list. We'll email you when TestFlight opens on Feb 20, 2026.</p>
                    </div>
                `;
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast(toast, 'Something went wrong. Please try again.', 'error');
            }
        });
    });
}

function setupLazyVideos() {
    const lazyVideos = document.querySelectorAll('video.js-lazy-video');
    if (lazyVideos.length === 0) return;

    const loadVideoSource = (video) => {
        if (video.dataset.loaded === 'true') return;

        const source = video.querySelector('source[data-src]');
        if (source) {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
        }

        video.load();
        video.dataset.loaded = 'true';
    };

    const playVideo = (video) => {
        video.play().catch(() => {
            // Autoplay can fail until user interacts; this is non-critical.
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    loadVideoSource(video);
                    playVideo(video);
                    currentObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '300px 0px',
            threshold: 0.15
        });

        lazyVideos.forEach((video) => observer.observe(video));
    } else {
        lazyVideos.forEach((video) => {
            loadVideoSource(video);
            playVideo(video);
        });
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) return;

        lazyVideos.forEach((video) => {
            if (!video.paused) {
                video.pause();
            }
        });
    });
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Ignore SW registration issues in unsupported/private contexts.
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
    setupSmoothScroll();
    setupFaq();

    const toast = createToast();
    setupContactForm(toast);
    setupWaitlistForms(toast);
    setupLazyVideos();
    registerServiceWorker();
});
