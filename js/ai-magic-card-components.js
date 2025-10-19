/**
 * AI Projects Magic Card Components
 * Implementação otimizada dos componentes MagicCard, BorderBeam e NeonGradientCard
 * Especificamente para cards de projetos de IA
 */

/**
 * MagicCard Component - Card com efeito spotlight que segue o mouse
 */
class AIMagicCard {
    constructor(element, options = {}) {
        this.element = element;
        this.mouseX = -200;
        this.mouseY = -200;
        this.isHovering = false;
        this.rafId = null;
        
        this.config = {
            gradientSize: 200,
            gradientColor: '#262626',
            gradientOpacity: 0.8,
            gradientFrom: '#9E7AFF',
            gradientTo: '#FE8BBB',
            enableSpotlight: true,
            enableBorder: true,
            ...options
        };

        // Verifica se deve usar versão simplificada
        if (this.shouldUseSimplifiedVersion()) {
            this.createFallback();
        } else {
            this.init();
        }
    }

    shouldUseSimplifiedVersion() {
        return window.AIProjectsUtils?.shouldUseSimplifiedVersion() || 
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
        this.setupCardStructure();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    setupCardStructure() {
        // Adiciona classes necessárias
        this.element.classList.add('ai-magic-card-container');
        
        // Cria estrutura do magic card
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'ai-magic-card-wrapper';
        
        // Move conteúdo existente para dentro do wrapper
        while (this.element.firstChild) {
            cardWrapper.appendChild(this.element.firstChild);
        }
        
        // Cria camadas do efeito
        if (this.config.enableBorder) {
            const borderLayer = document.createElement('div');
            borderLayer.className = 'ai-magic-card-border';
            this.element.appendChild(borderLayer);
        }
        
        const backgroundLayer = document.createElement('div');
        backgroundLayer.className = 'ai-magic-card-background';
        this.element.appendChild(backgroundLayer);
        
        if (this.config.enableSpotlight) {
            const spotlightLayer = document.createElement('div');
            spotlightLayer.className = 'ai-magic-card-spotlight';
            this.element.appendChild(spotlightLayer);
            this.spotlightLayer = spotlightLayer;
        }
        
        const contentLayer = document.createElement('div');
        contentLayer.className = 'ai-magic-card-content';
        contentLayer.appendChild(cardWrapper);
        this.element.appendChild(contentLayer);
        
        this.contentWrapper = cardWrapper;
    }

    setupEventListeners() {
        // Mouse events
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this), { passive: true });
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        
        // Touch events para dispositivos móveis
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Focus events para acessibilidade
        this.element.addEventListener('focusin', this.handleFocusIn.bind(this));
        this.element.addEventListener('focusout', this.handleFocusOut.bind(this));
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && this.isHovering) {
                        this.resetCard();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(this.element);
        }
    }

    handleMouseEnter(event) {
        this.isHovering = true;
        this.element.classList.add('ai-magic-card-hover');
        this.updateSpotlight(event);
    }

    handleMouseLeave() {
        this.isHovering = false;
        this.element.classList.remove('ai-magic-card-hover');
        this.resetCard();
    }

    handleMouseMove(event) {
        if (this.isHovering) {
            this.updateSpotlight(event);
        }
    }

    handleTouchStart(event) {
        this.isHovering = true;
        this.element.classList.add('ai-magic-card-hover');
        if (event.touches.length > 0) {
            this.updateSpotlightFromTouch(event.touches[0]);
        }
    }

    handleTouchEnd() {
        this.isHovering = false;
        this.element.classList.remove('ai-magic-card-hover');
        setTimeout(() => this.resetCard(), 300);
    }

    handleFocusIn() {
        this.element.classList.add('ai-magic-card-focus');
        // Simula spotlight no centro para foco por teclado
        const rect = this.element.getBoundingClientRect();
        this.mouseX = rect.width / 2;
        this.mouseY = rect.height / 2;
        this.updateSpotlightPosition();
    }

    handleFocusOut() {
        this.element.classList.remove('ai-magic-card-focus');
        this.resetCard();
    }

    updateSpotlight(event) {
        const rect = this.element.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
        this.updateSpotlightPosition();
    }

    updateSpotlightFromTouch(touch) {
        const rect = this.element.getBoundingClientRect();
        this.mouseX = touch.clientX - rect.left;
        this.mouseY = touch.clientY - rect.top;
        this.updateSpotlightPosition();
    }

    updateSpotlightPosition() {
        if (!this.spotlightLayer) return;
        
        const gradientSize = this.config.gradientSize;
        const background = `radial-gradient(${gradientSize}px circle at ${this.mouseX}px ${this.mouseY}px, ${this.config.gradientColor}, transparent 100%)`;
        
        this.spotlightLayer.style.background = background;
        this.spotlightLayer.style.opacity = this.config.gradientOpacity;
    }

    resetCard() {
        this.mouseX = -200;
        this.mouseY = -200;
        
        if (this.spotlightLayer) {
            this.spotlightLayer.style.opacity = '0';
        }
    }

    createFallback() {
        this.element.classList.add('ai-magic-card-fallback');
        this.element.style.cssText += `
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(158, 122, 255, 0.3);
            backdrop-filter: blur(10px);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;
        
        this.element.addEventListener('mouseenter', () => {
            this.element.style.transform = 'translateY(-5px)';
            this.element.style.boxShadow = '0 10px 25px rgba(158, 122, 255, 0.2)';
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translateY(0)';
            this.element.style.boxShadow = 'none';
        });
    }

    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
    }

    destroy() {
        this.resetCard();
        this.element.classList.remove('ai-magic-card-container', 'ai-magic-card-hover', 'ai-magic-card-focus');
        
        // Remove event listeners
        this.element.removeEventListener('mouseenter', this.handleMouseEnter);
        this.element.removeEventListener('mouseleave', this.handleMouseLeave);
        this.element.removeEventListener('mousemove', this.handleMouseMove);
        this.element.removeEventListener('touchstart', this.handleTouchStart);
        this.element.removeEventListener('touchend', this.handleTouchEnd);
        this.element.removeEventListener('focusin', this.handleFocusIn);
        this.element.removeEventListener('focusout', this.handleFocusOut);
    }
}

/**
 * BorderBeam Component - Borda animada que viaja ao redor do elemento
 */
class AIBorderBeam {
    constructor(element, options = {}) {
        this.element = element;
        this.beamElement = null;
        this.isActive = false;
        
        this.config = {
            size: 50,
            duration: 6,
            delay: 0,
            colorFrom: '#9E7AFF',
            colorTo: '#FE8BBB',
            borderWidth: 2,
            reverse: false,
            ...options
        };

        if (this.shouldUseSimplifiedVersion()) {
            this.createFallback();
        } else {
            this.init();
        }
    }

    shouldUseSimplifiedVersion() {
        return window.AIProjectsUtils?.shouldUseSimplifiedVersion() || 
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
        this.createBeamElement();
        this.setupIntersectionObserver();
    }

    createBeamElement() {
        // Cria container para a borda
        const borderContainer = document.createElement('div');
        borderContainer.className = 'ai-border-beam-container';
        
        // Cria elemento do beam
        this.beamElement = document.createElement('div');
        this.beamElement.className = 'ai-border-beam';
        
        // Aplica estilos
        this.beamElement.style.cssText = `
            position: absolute;
            width: ${this.config.size}px;
            height: ${this.config.size}px;
            background: linear-gradient(45deg, ${this.config.colorFrom}, ${this.config.colorTo});
            border-radius: 50%;
            opacity: 0;
            animation: ai-border-beam-animation ${this.config.duration}s linear infinite;
            animation-delay: ${this.config.delay}s;
            filter: blur(2px);
        `;
        
        borderContainer.appendChild(this.beamElement);
        
        // Adiciona ao elemento
        this.element.style.position = 'relative';
        this.element.appendChild(borderContainer);
        
        this.borderContainer = borderContainer;
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.start();
                    } else {
                        this.pause();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(this.element);
        } else {
            this.start();
        }
    }

    start() {
        if (!this.isActive && this.beamElement) {
            this.isActive = true;
            this.beamElement.style.animationPlayState = 'running';
            this.beamElement.style.opacity = '1';
        }
    }

    pause() {
        if (this.isActive && this.beamElement) {
            this.isActive = false;
            this.beamElement.style.animationPlayState = 'paused';
            this.beamElement.style.opacity = '0';
        }
    }

    createFallback() {
        this.element.style.cssText += `
            border: ${this.config.borderWidth}px solid;
            border-image: linear-gradient(45deg, ${this.config.colorFrom}, ${this.config.colorTo}) 1;
        `;
    }

    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        if (this.beamElement) {
            this.beamElement.style.background = `linear-gradient(45deg, ${this.config.colorFrom}, ${this.config.colorTo})`;
            this.beamElement.style.animationDuration = `${this.config.duration}s`;
        }
    }

    destroy() {
        this.pause();
        if (this.borderContainer && this.borderContainer.parentNode) {
            this.borderContainer.parentNode.removeChild(this.borderContainer);
        }
    }
}

/**
 * NeonGradientCard Component - Card com efeito neon animado
 */
class AINeonGradientCard {
    constructor(element, options = {}) {
        this.element = element;
        
        this.config = {
            borderSize: 2,
            borderRadius: 20,
            neonColors: {
                firstColor: '#ff00aa',
                secondColor: '#00FFF1'
            },
            ...options
        };

        if (this.shouldUseSimplifiedVersion()) {
            this.createFallback();
        } else {
            this.init();
        }
    }

    shouldUseSimplifiedVersion() {
        return window.AIProjectsUtils?.shouldUseSimplifiedVersion() || 
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
        this.setupNeonEffect();
        this.setupIntersectionObserver();
    }

    setupNeonEffect() {
        // Adiciona classes e estilos
        this.element.classList.add('ai-neon-gradient-card');
        
        // Aplica variáveis CSS
        this.element.style.setProperty('--neon-first-color', this.config.neonColors.firstColor);
        this.element.style.setProperty('--neon-second-color', this.config.neonColors.secondColor);
        this.element.style.setProperty('--border-size', `${this.config.borderSize}px`);
        this.element.style.setProperty('--border-radius', `${this.config.borderRadius}px`);
        
        // Cria elementos do efeito neon
        const neonBefore = document.createElement('div');
        neonBefore.className = 'ai-neon-before';
        
        const neonAfter = document.createElement('div');
        neonAfter.className = 'ai-neon-after';
        
        this.element.appendChild(neonBefore);
        this.element.appendChild(neonAfter);
        
        this.neonBefore = neonBefore;
        this.neonAfter = neonAfter;
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.element.classList.add('ai-neon-active');
                    } else {
                        this.element.classList.remove('ai-neon-active');
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(this.element);
        } else {
            this.element.classList.add('ai-neon-active');
        }
    }

    createFallback() {
        this.element.style.cssText += `
            border: ${this.config.borderSize}px solid ${this.config.neonColors.firstColor};
            border-radius: ${this.config.borderRadius}px;
            box-shadow: 0 0 20px ${this.config.neonColors.firstColor}40;
        `;
    }

    updateColors(firstColor, secondColor) {
        this.config.neonColors.firstColor = firstColor;
        this.config.neonColors.secondColor = secondColor;
        
        if (this.element.classList.contains('ai-neon-gradient-card')) {
            this.element.style.setProperty('--neon-first-color', firstColor);
            this.element.style.setProperty('--neon-second-color', secondColor);
        }
    }

    destroy() {
        this.element.classList.remove('ai-neon-gradient-card', 'ai-neon-active');
        
        if (this.neonBefore && this.neonBefore.parentNode) {
            this.neonBefore.parentNode.removeChild(this.neonBefore);
        }
        
        if (this.neonAfter && this.neonAfter.parentNode) {
            this.neonAfter.parentNode.removeChild(this.neonAfter);
        }
    }
}

/**
 * ProjectCard Component - Componente principal que combina todos os efeitos
 */
class AIProjectCard {
    constructor(element, options = {}) {
        this.element = element;
        this.magicCard = null;
        this.borderBeam = null;
        this.neonCard = null;
        
        this.config = {
            enableMagicCard: true,
            enableBorderBeam: true,
            enableNeonCard: false, // Apenas para cards featured
            featured: false,
            ...options
        };

        // Detecta se é um card featured
        if (this.element.classList.contains('project-card--featured') || 
            this.element.dataset.featured === 'true') {
            this.config.featured = true;
            this.config.enableNeonCard = true;
        }

        this.init();
    }

    init() {
        this.setupCardStructure();
        this.initializeEffects();
        this.setupCardInteractions();
    }

    setupCardStructure() {
        // Adiciona classes base
        this.element.classList.add('ai-project-card');
        
        if (this.config.featured) {
            this.element.classList.add('ai-project-card--featured');
        }
        
        // Garante que o card seja focusável
        if (!this.element.hasAttribute('tabindex')) {
            this.element.setAttribute('tabindex', '0');
        }
        
        // Adiciona role para acessibilidade
        this.element.setAttribute('role', 'article');
    }

    initializeEffects() {
        // Inicializa MagicCard se habilitado
        if (this.config.enableMagicCard && !this.config.enableNeonCard) {
            this.magicCard = new AIMagicCard(this.element, {
                gradientFrom: '#9E7AFF',
                gradientTo: '#FE8BBB'
            });
        }
        
        // Inicializa BorderBeam se habilitado
        if (this.config.enableBorderBeam && !this.config.enableNeonCard) {
            this.borderBeam = new AIBorderBeam(this.element, {
                duration: 8,
                delay: Math.random() * 2
            });
        }
        
        // Inicializa NeonCard para cards featured
        if (this.config.enableNeonCard && this.config.featured) {
            this.neonCard = new AINeonGradientCard(this.element, {
                neonColors: {
                    firstColor: '#ff00aa',
                    secondColor: '#00FFF1'
                }
            });
        }
    }

    setupCardInteractions() {
        // Hover effects
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('ai-project-card-hover');
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('ai-project-card-hover');
        });
        
        // Click handling
        this.element.addEventListener('click', (event) => {
            // Se clicou em um link, não faz nada
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            
            // Encontra o primeiro link no card e simula clique
            const primaryLink = this.element.querySelector('.btn-link, .project-card__actions a');
            if (primaryLink) {
                primaryLink.click();
            }
        });
        
        // Keyboard navigation
        this.element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.element.click();
            }
        });
    }

    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        if (this.magicCard) {
            this.magicCard.updateConfig(newConfig);
        }
        
        if (this.borderBeam) {
            this.borderBeam.updateConfig(newConfig);
        }
    }

    destroy() {
        if (this.magicCard) {
            this.magicCard.destroy();
        }
        
        if (this.borderBeam) {
            this.borderBeam.destroy();
        }
        
        if (this.neonCard) {
            this.neonCard.destroy();
        }
        
        this.element.classList.remove('ai-project-card', 'ai-project-card--featured', 'ai-project-card-hover');
    }
}

// Função para inicializar todos os cards automaticamente
function initializeAIProjectCards() {
    document.querySelectorAll('.project-card, .ai-project-card-auto').forEach(element => {
        if (!element.aiProjectCard) {
            element.aiProjectCard = new AIProjectCard(element);
        }
    });
}

// Exporta classes para uso global
window.AIMagicCard = AIMagicCard;
window.AIBorderBeam = AIBorderBeam;
window.AINeonGradientCard = AINeonGradientCard;
window.AIProjectCard = AIProjectCard;

// Auto-inicialização
document.addEventListener('DOMContentLoaded', initializeAIProjectCards);

// Re-inicializa quando novo conteúdo é adicionado
if (window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                setTimeout(initializeAIProjectCards, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIMagicCard,
        AIBorderBeam,
        AINeonGradientCard,
        AIProjectCard,
        initializeAIProjectCards
    };
}