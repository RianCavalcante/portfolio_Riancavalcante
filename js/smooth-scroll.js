// Smooth scroll functionality - Portfolio Rian Cavalcante

document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os links de navegação
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scroll para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const menu = document.querySelector('.navbar__menu');
                const toggle = document.querySelector('.navbar__toggle');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Indicador de seção ativa ao scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Adicionar classe ao navbar quando scrollar
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveLink();
        handleNavbarScroll();
    });
    
    // Chamar uma vez ao carregar
    updateActiveLink();
    handleNavbarScroll();
});
