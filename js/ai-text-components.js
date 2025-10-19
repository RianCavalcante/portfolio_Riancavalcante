/**
 * AI Projects Text Components
 * Implementação otimizada dos componentes de texto animado do Magic UI
 * Inclui AuroraText, AnimatedGradientText, NumberTicker e outros
 */

/**
 * AuroraText Component - Texto com efeito aurora animado
 */
class AIAuroraText {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent || element.innerText;
        this.isActive = false;
        this.animationId = null;
        
        this.config = {
            colors: ['#FF0080', '#7928CA', '#0070F3', '#38bdf8', '#9E7AFF', '#FE8BBB'],
            speed: 1,
            enableFallback: true,
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
        this.createAuroraEffect();
        this.setupIntersectionObserver();
        this.start();
    }

    createAuroraEffect() {
        // Limpa conteúdo existente
        this.element.innerHTML = '';
        
        // Cria container para o efeito
        const container = document.createElement('span');
        container.className = 'ai-aurora-container';
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        
        // Cria texto visível
        const visibleText = document.createElement('span');
        visibleText.className = 'ai-aurora-text';
        visibleText.textContent = this.originalText;
        visibleText.style.cssText = `
            background: linear-gradient(135deg, ${this.config.colors.join(', ')}, ${this.config.colors[0]});
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ai-aurora-animation ${10 / this.config.speed}s ease infinite;
            position: relative;
            z-index: 1;
        `;
        
        // Cria texto para screen readers
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = this.originalText;
        
        container.appendChild(srText);
        container.appendChild(visibleText);
        this.element.appendChild(container);
        
        this.textElement = visibleText;
    }

    createFallback() {
        this.element.style.cssText = `
            background: linear-gradient(135deg, #9E7AFF, #FE8BBB);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: #9E7AFF;
        `;
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
        }
    }

    start() {
        if (!this.isActive && this.textElement) {
            this.isActive = true;
            this.textElement.style.animationPlayState = 'running';
        }
    }

    pause() {
        if (this.isActive && this.textElement) {
            this.isActive = false;
            this.textElement.style.animationPlayState = 'paused';
        }
    }

    updateColors(colors) {
        this.config.colors = colors;
        if (this.textElement) {
            this.textElement.style.background = `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`;
        }
    }

    destroy() {
        this.pause();
        this.element.innerHTML = this.originalText;
    }
}

/**
 * AnimatedGradientText Component - Texto com gradiente animado
 */
class AIAnimatedGradientText {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent || element.innerText;
        
        this.config = {
            speed: 1,
            colorFrom: '#9E7AFF',
            colorTo: '#FE8BBB',
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
        this.element.style.cssText = `
            background: linear-gradient(45deg, ${this.config.colorFrom}, ${this.config.colorTo}, ${this.config.colorFrom});
            background-size: ${this.config.speed * 300}% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ai-gradient-animation 3s ease infinite;
        `;
    }

    createFallback() {
        this.element.style.cssText = `
            background: linear-gradient(45deg, ${this.config.colorFrom}, ${this.config.colorTo});
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: ${this.config.colorFrom};
        `;
    }

    updateColors(colorFrom, colorTo) {
        this.config.colorFrom = colorFrom;
        this.config.colorTo = colorTo;
        this.init();
    }
}

/**
 * NumberTicker Component - Números animados
 */
class AINumberTicker {
    constructor(element, options = {}) {
        this.element = element;
        this.targetValue = parseInt(element.textContent) || 0;
        this.currentValue = 0;
        this.isAnimating = false;
        
        this.config = {
            duration: 2000,
            delay: 0,
            startValue: 0,
            suffix: '',
            prefix: '',
            decimalPlaces: 0,
            ...options
        };

        this.init();
    }

    init() {
        this.element.textContent = this.formatNumber(this.config.startValue);
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isAnimating) {
                        setTimeout(() => this.animate(), this.config.delay);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(this.element);
        } else {
            // Fallback para navegadores sem suporte
            setTimeout(() => this.animate(), this.config.delay + 1000);
        }
    }

    animate() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const startTime = performance.now();
        const startValue = this.currentValue;
        const difference = this.targetValue - startValue;
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.config.duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentValue = startValue + (difference * easeOut);
            this.element.textContent = this.formatNumber(this.currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this.currentValue = this.targetValue;
                this.element.textContent = this.formatNumber(this.targetValue);
                this.isAnimating = false;
            }
        };
        
        requestAnimationFrame(step);
    }

    formatNumber(value) {
        const formatted = value.toFixed(this.config.decimalPlaces);
        return `${this.config.prefix}${formatted}${this.config.suffix}`;
    }

    updateTarget(newTarget) {
        this.targetValue = newTarget;
        if (!this.isAnimating) {
            this.animate();
        }
    }
}

/**
 * TextAnimate Component - Texto com animações variadas
 */
class AITextAnimate {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent || element.innerText;
        this.words = this.originalText.split(' ');
        
        this.config = {
            animation: 'blurInUp',
            duration: 0.8,
            staggerDelay: 0.1,
            startOnView: true,
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
        this.createAnimatedText();
        if (this.config.startOnView) {
            this.setupIntersectionObserver();
        } else {
            this.animate();
        }
    }

    createAnimatedText() {
        this.element.innerHTML = '';
        this.element.style.overflow = 'hidden';
        
        this.words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                filter: blur(10px);
                transition: all ${this.config.duration}s ease;
                margin-right: 0.25em;
            `;
            
            this.element.appendChild(span);
        });
    }

    createFallback() {
        this.element.style.opacity = '1';
        this.element.style.transform = 'none';
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate();
                        observer.unobserve(this.element);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(this.element);
        }
    }

    animate() {
        const spans = this.element.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                span.style.filter = 'blur(0)';
            }, index * this.config.staggerDelay * 1000);
        });
    }
}

/**
 * AnimatedShinyText Component - Texto com efeito shimmer
 */
class AIAnimatedShinyText {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent || element.innerText;
        
        this.config = {
            shimmerWidth: 100,
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
        this.element.style.cssText = `
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.1) 25%, 
                rgba(255, 255, 255, 0.2) 50%, 
                rgba(255, 255, 255, 0.1) 75%);
            background-size: ${this.config.shimmerWidth}px 100%;
            background-position: 0 0;
            background-repeat: no-repeat;
            background-clip: text;
            -webkit-background-clip: text;
            animation: ai-shimmer-animation 2s ease infinite;
            color: rgba(255, 255, 255, 0.8);
        `;
    }

    createFallback() {
        this.element.style.color = 'rgba(255, 255, 255, 0.8)';
    }
}

// Função utilitária para inicializar componentes automaticamente
function initializeAITextComponents() {
    // Aurora Text
    document.querySelectorAll('.ai-aurora-text-auto').forEach(element => {
        if (!element.auroraInstance) {
            element.auroraInstance = new AIAuroraText(element);
        }
    });

    // Animated Gradient Text
    document.querySelectorAll('.ai-gradient-text-auto').forEach(element => {
        if (!element.gradientInstance) {
            element.gradientInstance = new AIAnimatedGradientText(element);
        }
    });

    // Number Ticker
    document.querySelectorAll('.ai-number-ticker-auto').forEach(element => {
        if (!element.tickerInstance) {
            const config = {
                duration: parseInt(element.dataset.duration) || 2000,
                delay: parseInt(element.dataset.delay) || 0,
                suffix: element.dataset.suffix || '',
                prefix: element.dataset.prefix || ''
            };
            element.tickerInstance = new AINumberTicker(element, config);
        }
    });

    // Text Animate
    document.querySelectorAll('.ai-text-animate-auto').forEach(element => {
        if (!element.animateInstance) {
            const config = {
                animation: element.dataset.animation || 'blurInUp',
                duration: parseFloat(element.dataset.duration) || 0.8,
                staggerDelay: parseFloat(element.dataset.stagger) || 0.1
            };
            element.animateInstance = new AITextAnimate(element, config);
        }
    });

    // Shiny Text
    document.querySelectorAll('.ai-shiny-text-auto').forEach(element => {
        if (!element.shinyInstance) {
            element.shinyInstance = new AIAnimatedShinyText(element);
        }
    });
}

// Exporta classes para uso global
window.AIAuroraText = AIAuroraText;
window.AIAnimatedGradientText = AIAnimatedGradientText;
window.AINumberTicker = AINumberTicker;
window.AITextAnimate = AITextAnimate;
window.AIAnimatedShinyText = AIAnimatedShinyText;

// Auto-inicialização
document.addEventListener('DOMContentLoaded', initializeAITextComponents);

// Re-inicializa quando novo conteúdo é adicionado
if (window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                setTimeout(initializeAITextComponents, 100);
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
        AIAuroraText,
        AIAnimatedGradientText,
        AINumberTicker,
        AITextAnimate,
        AIAnimatedShinyText,
        initializeAITextComponents
    };
}