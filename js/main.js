// Main JavaScript - Portfolio Rian Cavalcante

document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburguer toggle
    const menuToggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            menu.classList.toggle('active');
            
            // Update aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Prevenir scroll do body quando menu está aberto
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
        });
    }
});

// Lazy loading para imagens dos projetos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Se a imagem tem data-src, carregar
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Adicionar classe de carregado
                    img.classList.add('loaded');
                    
                    // Parar de observar esta imagem
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observar todas as imagens com loading="lazy"
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Animações ao scroll
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Opcional: parar de observar após animar
                    // animateObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos com classe animate-on-scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            animateObserver.observe(el);
        });
    } else {
        // Fallback: mostrar todos os elementos imediatamente
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            el.style.opacity = '1';
        });
    }
});

// Animação de fade-in para seções ao scroll
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll', 'animate-fade-in-up', 'animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observar todas as seções
        const sections = document.querySelectorAll('section:not(#hero)');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Observar cards de projeto com stagger
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll', 'animate-fade-in-up', `stagger-${(index % 3) + 1}`);
            sectionObserver.observe(card);
        });
        
        // Observar cards de serviço com stagger
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll', 'animate-scale-in', `stagger-${(index % 4) + 1}`);
            sectionObserver.observe(card);
        });
        
        // Observar cards sobre mim
        const aboutCards = document.querySelectorAll('.about__card');
        aboutCards.forEach((card, index) => {
            const animClass = index === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right';
            card.classList.add('animate-on-scroll', animClass);
            sectionObserver.observe(card);
        });
    }
});

// Efeito de hover suave nos links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a:not(.navbar__link)');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Adicionar efeito de ripple nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .social-link, .contact__link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Contador animado para números (se houver)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Parallax suave no hero
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// Adicionar classe ao body quando scroll
document.addEventListener('DOMContentLoaded', function() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        // Detectar direção do scroll
        if (currentScroll > lastScroll) {
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
        } else {
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
        }
        
        lastScroll = currentScroll;
    });
});
