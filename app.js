// ===== DOM Elements =====
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const fadeElements = document.querySelectorAll('.fade-in');
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// ===== Sidebar Collapse =====
collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// ===== Mobile Menu Toggle =====
function createMobileToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '☰';
    toggle.setAttribute('aria-label', 'Toggle menu');
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        toggle.innerHTML = sidebar.classList.contains('mobile-open') ? '✕' : '☰';
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target) &&
            sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            toggle.innerHTML = '☰';
        }
    });
}

// Initialize mobile toggle
createMobileToggle();

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-open');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileToggle) {
                    mobileToggle.innerHTML = '☰';
                }
            }

            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Menu Highlight on Scroll =====
function highlightActiveSection() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== Fade-in Animation on Scroll =====
function handleFadeIn() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== Gallery Modal =====
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-src');
        modalImage.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Scroll Event Listener =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        highlightActiveSection();
        handleFadeIn();
    });
});

// ===== Initial Load =====
window.addEventListener('load', () => {
    // Trigger fade-in for visible elements
    handleFadeIn();
    
    // Highlight initial active section
    highlightActiveSection();
});

// ===== Handle Window Resize =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-open');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.innerHTML = '☰';
            }
        }
    }, 250);
});

// ===== Loading Animation =====
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Service Cards Click Effect =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});

// ===== Feature Cards Hover Effect Enhancement =====
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ===== Contact Buttons Analytics (Optional) =====
const contactButtons = document.querySelectorAll('.btn-whatsapp, .btn-phone');
contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Contact button clicked:', button.textContent.trim());
    });
});

// ===== Performance Optimization: Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close modal with Escape
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Prevent Default for Demo Links =====
// Note: Remove this in production if you have actual demo links
console.log('🚀 Bengkel Aprax Website Loaded Successfully!');
console.log('📍 Location: QVMX+528, Baros-Cikadu, Sagaranten, Sukabumi');