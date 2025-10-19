// Enhanced Features - Portfolio Rian Cavalcante

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SCROLL PROGRESS INDICATOR
    // ========================================
    
    function updateScrollProgress() {
        const navbar = document.querySelector('.navbar');
        let progressBar = document.querySelector('.navbar__progress');
        
        if (!progressBar && navbar) {
            progressBar = document.createElement('div');
            progressBar.className = 'navbar__progress';
            navbar.appendChild(progressBar);
        }
        
        if (progressBar) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    
    // ========================================
    // TYPING EFFECT FOR HERO ROLE
    // ========================================
    
    function typingEffect() {
        const roleElement = document.querySelector('.hero__role');
        if (!roleElement) return;
        
        const originalText = roleElement.textContent;
        const texts = [
            'Desenvolvedor de Automação com IA',
            'Especialista em Python',
            'Criador de Soluções Inteligentes',
            'Desenvolvedor Full Stack'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                roleElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before next text
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing effect after 1 second
        setTimeout(type, 1000);
    }
    
    // Uncomment to enable typing effect
    // typingEffect();
    
    // ========================================
    // SCROLL DOWN INDICATOR
    // ========================================
    
    function addScrollIndicator() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const scrollIndicator = document.createElement('a');
        scrollIndicator.href = '#projetos-ia';
        scrollIndicator.className = 'hero__scroll-indicator';
        scrollIndicator.setAttribute('aria-label', 'Rolar para projetos');
        
        scrollIndicator.innerHTML = `
            <span class="hero__scroll-text">Role</span>
            <div class="hero__scroll-icon"></div>
        `;
        
        hero.appendChild(scrollIndicator);
        
        // Smooth scroll on click
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.8';
            }
        });
    }
    
    addScrollIndicator();
    
    // ========================================
    // MOBILE MENU BACKDROP
    // ========================================
    
    function addMenuBackdrop() {
        const navbar = document.querySelector('.navbar');
        const menu = document.querySelector('.navbar__menu');
        const toggle = document.querySelector('.navbar__toggle');
        
        if (!navbar || !menu || !toggle) return;
        
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'navbar__backdrop';
        document.body.appendChild(backdrop);
        
        // Toggle backdrop with menu
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            backdrop.classList.toggle('active', !isExpanded);
        });
        
        // Close menu when clicking backdrop
        backdrop.addEventListener('click', function() {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    addMenuBackdrop();
    
    // ========================================
    // PROJECT CARD BADGES
    // ========================================
    
    function addProjectBadges() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Add "Featured" badge to first card
            if (index === 0) {
                const badge = document.createElement('div');
                badge.className = 'project-card__badge project-card__badge--featured';
                badge.textContent = 'Destaque';
                card.appendChild(badge);
            }
            
            // Add "New" badge to second card
            if (index === 1) {
                const badge = document.createElement('div');
                badge.className = 'project-card__badge project-card__badge--new';
                badge.textContent = 'Novo';
                card.appendChild(badge);
            }
        });
    }
    
    addProjectBadges();
    
    // ========================================
    // ANIMATED COUNTER
    // ========================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = element.dataset.suffix || '';
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }
    
    // Observe counters and animate when visible
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('[data-counter]').forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // ========================================
    // ENHANCED FORM VALIDATION
    // ========================================
    
    function enhanceFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (this.value.length > 0) {
                    formGroup.classList.add('has-value');
                } else {
                    formGroup.classList.remove('has-value');
                }
            });
        });
    }
    
    enhanceFormValidation();
    
    // ========================================
    // PARALLAX EFFECT
    // ========================================
    
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(window.scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    parallaxEffect();
    
    // ========================================
    // LAZY LOAD IMAGES WITH BLUR EFFECT
    // ========================================
    
    function lazyLoadWithBlur() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add blur effect while loading
                        img.style.filter = 'blur(10px)';
                        img.style.transition = 'filter 0.5s';
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        img.addEventListener('load', function() {
                            this.style.filter = 'blur(0)';
                            this.classList.add('loaded');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    lazyLoadWithBlur();
    
    // ========================================
    // COPY TO CLIPBOARD
    // ========================================
    
    function addCopyToClipboard() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const email = this.href.replace('mailto:', '');
                
                // Try to copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        // Show success message
                        const message = document.createElement('div');
                        message.textContent = 'E-mail copiado!';
                        message.style.cssText = `
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: var(--color-success);
                            color: white;
                            padding: 12px 24px;
                            border-radius: 8px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                            z-index: 10000;
                            animation: slideInUp 0.3s ease-out;
                        `;
                        document.body.appendChild(message);
                        
                        setTimeout(() => {
                            message.style.animation = 'slideOutDown 0.3s ease-out';
                            setTimeout(() => message.remove(), 300);
                        }, 2000);
                    });
                }
            });
        });
    }
    
    addCopyToClipboard();
    
    // ========================================
    // PERFORMANCE MONITORING (DEV ONLY)
    // ========================================
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('⚡ Page Load Time:', pageLoadTime + 'ms');
            }, 0);
        });
    }
    
    // ========================================
    // EASTER EGG (opcional)
    // ========================================
    
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiPattern.join('')) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// MAGIC UI PARTICLES EFFECT
// ========================================

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Delay aleatório
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        container.appendChild(particle);
    }
}

// ========================================
// MAGIC CARD MOUSE TRACKING
// ========================================

function initMagicCards() {
    const magicCards = document.querySelectorAll('.magic-card');
    
    magicCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });
}

// Inicializar efeitos Magic UI
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initMagicCards();
});