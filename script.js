// ===================================
// PROFESSIONAL PORTFOLIO JAVASCRIPT
// By Anand Kumar
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initParticles();
    initAccordion();
    initDownloadResume();
    initCertificateCarousel();
    initContactCards();
    initProjectImages();
    initContactForm();
    initScrollAnimations();
});

// ===================================
// 1. MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// ===================================
// 2. SMOOTH SCROLL FOR NAVIGATION
// ===================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 3. NAVBAR SCROLL EFFECT
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// 4. ANIMATED PARTICLES BACKGROUND
// ===================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// 5. ACCORDION FOR ABOUT SECTION
// ===================================
function initAccordion() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        
        header.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all other items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===================================
// 6. DOWNLOAD RESUME BUTTON
// ===================================
function initDownloadResume() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create download link
            const link = document.createElement('a');
            link.href = 'Anand_Kumar_Diploma_EE(IC)_Resume.pdf'; // Your PDF file path
            link.download = 'Anand Kumar Resume.pdf';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="btn-icon">✓</span> Downloaded!';
            this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    }
}

// ===================================
// 7. CERTIFICATE CAROUSEL (MANUAL ONLY)
// ===================================
function initCertificateCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const totalSlides = certificateCards.length;
    
    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Manual controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        });
    });
    
    // Certificate zoom modal
    const certificateImages = document.querySelectorAll('.certificate-img');
    const zoomButtons = document.querySelectorAll('.zoom-certificate-btn');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="certificate-modal-close">❌</div>
        <img class="certificate-modal-content" src="" alt="Certificate">
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('.certificate-modal-content');
    const closeBtn = modal.querySelector('.certificate-modal-close');
    
    // Open modal on image click
    certificateImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Open modal on button click
    zoomButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = 'flex';
            modalImg.src = certificateImages[index].src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// ===================================
// 8. CONTACT CARDS CLICK HANDLERS
// ===================================
function initContactCards() {
    // Email Card
    const emailCard = document.querySelector('.email-card');
    if (emailCard) {
        emailCard.addEventListener('click', function() {
            window.location.href = 'mailto:anandkrpra3244@gmail.com?subject=Portfolio Inquiry&body=Hi Anand, I found your portfolio and would like to connect...';
        });
    }
    
    // Phone Card
    const phoneCard = document.querySelector('.phone-card');
    if (phoneCard) {
        phoneCard.addEventListener('click', function() {
            window.location.href = 'tel:+916394676408';
        });
    }
    
    // Instagram Card
    const instagramCard = document.querySelector('.instagram-card');
    if (instagramCard) {
        instagramCard.addEventListener('click', function() {
            window.open('https://instagram.com/being_anand_18', '_blank');
        });
    }
    
    // LinkedIn Card
    const linkedinCard = document.querySelector('.linkedin-card');
    if (linkedinCard) {
        linkedinCard.addEventListener('click', function() {
            window.open('https://linkedin.com/in/anandkumarofficial/', '_blank');
        });
    }
}

// ===================================
// 6. PROJECT IMAGE MODAL
// ===================================
function initProjectImages() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    
    // Add click handlers to all project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Add click handlers to view buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const img = this.closest('.project-card').querySelector('.project-image img');
            modal.style.display = 'flex';
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===================================
// 7. CONTACT FORM SUBMISSION
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form?.querySelector('.submit-btn');
    
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Reset after submission (Formspree handles the actual submission)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 3000);
        });
    }
}

// ===================================
// 9. SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `all 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===================================
// 10. UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// ===================================
// 11. PROFILE IMAGE SUBTLE ANIMATION
// ===================================
function initProfileAnimation() {
    const profileImg = document.querySelector('.profile-image');
    if (profileImg) {
        setInterval(() => {
            profileImg.style.transform = 'scale(1.02)';
            setTimeout(() => {
                profileImg.style.transform = 'scale(1)';
            }, 1000);
        }, 5000);
    }
}
initProfileAnimation();

// ===================================
// 12. EASTER EGG - CONSOLE MESSAGE
// ===================================
console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║      🚀 ANAND KUMAR - PROFESSIONAL PORTFOLIO      ║
║                                                   ║
║  📧 Email: anandkrpra3244@gmail.com              ║
║  💼 LinkedIn: anandkumarofficial                  ║
║  📷 Instagram: being_anand_18                     ║
║  🏢 Company: BrightAds Marketing Agency          ║
║                                                   ║
║  💻 Built with: HTML5, CSS3 & JavaScript         ║
║  🎨 Design: Modern Professional Theme            ║
║  🔤 Fonts: Playfair Display + Montserrat         ║
║                                                   ║
║      Thanks for checking out the code! 😊        ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
`);

// ===================================
// 13. ACTIVE LINK HIGHLIGHTING
// ===================================
function initActiveLinkHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', debounce(function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}
initActiveLinkHighlight();

// ===================================
// 14. FORM VALIDATION ENHANCEMENT
// ===================================
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }
        });
    });
}
enhanceFormValidation();

// ===================================
// 15. PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images when they come into view
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
initLazyLoading();

// Optimize animations for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
}

// ===================================
// END OF SCRIPT
// ===================================

