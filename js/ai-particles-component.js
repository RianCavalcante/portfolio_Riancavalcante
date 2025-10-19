/**
 * AI Projects Particles Component
 * Implementação otimizada do componente Particles do Magic UI para a seção de IA
 * Baseado no componente original com otimizações específicas para performance
 */

class AIParticles {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = null;
        this.context = null;
        this.circles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvasSize = { w: 0, h: 0 };
        this.dpr = window.devicePixelRatio || 1;
        this.rafID = null;
        this.resizeTimeout = null;
        this.isActive = false;
        this.isVisible = false;
        
        // Configurações padrão otimizadas para IA
        this.config = {
            quantity: 30,
            staticity: 50,
            ease: 50,
            size: 0.4,
            color: '#9E7AFF',
            vx: 0,
            vy: 0,
            refresh: false,
            enableMouse: true,
            enableAutoReduction: true,
            ...options
        };

        // Obtém configurações do sistema de performance
        this.performanceConfig = this.getPerformanceConfig();
        this.applyPerformanceConfig();
        
        this.init();
    }

    /**
     * Obtém configuração baseada na performance do dispositivo
     */
    getPerformanceConfig() {
        if (window.aiPerformanceMonitor) {
            const status = window.aiPerformanceMonitor.getStatus();
            const capability = status.deviceCapability;
            
            if (window.AIProjectsConfig) {
                return window.AIProjectsConfig.utils.getPerformanceConfig('particles', capability);
            }
        }
        
        return this.config;
    }

    /**
     * Aplica configurações de performance
     */
    applyPerformanceConfig() {
        Object.assign(this.config, this.performanceConfig);
        
        // Reduz partículas em dispositivos móveis
        if (window.innerWidth <= 768) {
            this.config.quantity = Math.floor(this.config.quantity * 0.6);
        }
        
        // Respeita preferência de movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.config.quantity = Math.floor(this.config.quantity * 0.3);
            this.config.ease = 10;
        }
    }

    /**
     * Inicializa o componente
     */
    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.initParticles();
        
        // Inicia animação apenas se visível
        if (this.isVisible) {
            this.start();
        }
    }

    /**
     * Cria o canvas
     */
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'ai-particles-canvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.context = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.resizeCanvas();
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Mouse movement
        if (this.config.enableMouse) {
            this.container.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
            this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
        }

        // Resize handling com debounce
        const handleResize = this.debounce(() => {
            this.resizeCanvas();
        }, 200);
        
        window.addEventListener('resize', handleResize, { passive: true });

        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (this.isVisible) {
                this.resume();
            }
        });

        // Performance monitoring
        if (window.aiPerformanceMonitor) {
            // Escuta mudanças de performance
            const checkPerformance = () => {
                const status = window.aiPerformanceMonitor.getStatus();
                if (status.shouldReduceEffects && this.config.enableAutoReduction) {
                    this.reduceParticles();
                }
            };
            
            setInterval(checkPerformance, 2000);
        }
    }

    /**
     * Configura Intersection Observer para otimização
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.isVisible = entry.isIntersecting;
                    
                    if (this.isVisible) {
                        this.start();
                    } else {
                        this.pause();
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            observer.observe(this.container);
        } else {
            // Fallback para navegadores sem suporte
            this.isVisible = true;
        }
    }

    /**
     * Redimensiona o canvas
     */
    resizeCanvas() {
        if (!this.canvas || !this.context) return;
        
        const rect = this.container.getBoundingClientRect();
        this.canvasSize.w = rect.width;
        this.canvasSize.h = rect.height;

        this.canvas.width = this.canvasSize.w * this.dpr;
        this.canvas.height = this.canvasSize.h * this.dpr;
        this.canvas.style.width = `${this.canvasSize.w}px`;
        this.canvas.style.height = `${this.canvasSize.h}px`;
        
        this.context.scale(this.dpr, this.dpr);
        
        // Reinicializa partículas após resize
        this.initParticles();
    }

    /**
     * Inicializa as partículas
     */
    initParticles() {
        this.circles = [];
        
        for (let i = 0; i < this.config.quantity; i++) {
            this.circles.push(this.createParticle());
        }
    }

    /**
     * Cria uma partícula individual
     */
    createParticle() {
        return {
            x: Math.random() * this.canvasSize.w,
            y: Math.random() * this.canvasSize.h,
            translateX: 0,
            translateY: 0,
            size: Math.random() * 2 + this.config.size,
            alpha: 0,
            targetAlpha: Math.random() * 0.6 + 0.1,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            magnetism: 0.1 + Math.random() * 4
        };
    }

    /**
     * Converte cor hex para RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [158, 122, 255]; // Fallback para cor padrão
    }

    /**
     * Desenha uma partícula
     */
    drawParticle(particle) {
        if (!this.context) return;
        
        const { x, y, translateX, translateY, size, alpha } = particle;
        const rgb = this.hexToRgb(this.config.color);
        
        this.context.save();
        this.context.translate(translateX, translateY);
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI);
        this.context.fillStyle = `rgba(${rgb.join(', ')}, ${alpha})`;
        this.context.fill();
        this.context.restore();
    }

    /**
     * Limpa o canvas
     */
    clearCanvas() {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    }

    /**
     * Calcula distância da borda mais próxima
     */
    getDistanceFromEdge(particle) {
        const edges = [
            particle.x + particle.translateX - particle.size, // esquerda
            this.canvasSize.w - particle.x - particle.translateX - particle.size, // direita
            particle.y + particle.translateY - particle.size, // topo
            this.canvasSize.h - particle.y - particle.translateY - particle.size // baixo
        ];
        
        return Math.min(...edges);
    }

    /**
     * Anima as partículas
     */
    animate() {
        if (!this.isActive) return;
        
        this.clearCanvas();
        
        this.circles.forEach((particle, index) => {
            // Calcula alpha baseado na distância da borda
            const edgeDistance = this.getDistanceFromEdge(particle);
            const edgeFactor = Math.min(Math.max(edgeDistance / 20, 0), 1);
            
            if (edgeFactor > 0.8) {
                particle.alpha = Math.min(particle.alpha + 0.02, particle.targetAlpha);
            } else {
                particle.alpha = particle.targetAlpha * edgeFactor;
            }
            
            // Atualiza posição
            particle.x += particle.dx + this.config.vx;
            particle.y += particle.dy + this.config.vy;
            
            // Efeito magnético do mouse
            if (this.config.enableMouse) {
                particle.translateX += (this.mouse.x / (this.config.staticity / particle.magnetism) - particle.translateX) / this.config.ease;
                particle.translateY += (this.mouse.y / (this.config.staticity / particle.magnetism) - particle.translateY) / this.config.ease;
            }
            
            this.drawParticle(particle);
            
            // Reposiciona partículas que saíram da tela
            if (particle.x < -particle.size || 
                particle.x > this.canvasSize.w + particle.size ||
                particle.y < -particle.size || 
                particle.y > this.canvasSize.h + particle.size) {
                
                this.circles[index] = this.createParticle();
            }
        });
        
        this.rafID = requestAnimationFrame(() => this.animate());
    }

    /**
     * Manipula movimento do mouse
     */
    handleMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left - this.canvasSize.w / 2;
        this.mouse.y = event.clientY - rect.top - this.canvasSize.h / 2;
    }

    /**
     * Manipula saída do mouse
     */
    handleMouseLeave() {
        this.mouse.x = 0;
        this.mouse.y = 0;
    }

    /**
     * Inicia a animação
     */
    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    /**
     * Pausa a animação
     */
    pause() {
        this.isActive = false;
        if (this.rafID) {
            cancelAnimationFrame(this.rafID);
            this.rafID = null;
        }
    }

    /**
     * Resume a animação
     */
    resume() {
        if (this.isVisible && !this.isActive) {
            this.start();
        }
    }

    /**
     * Reduz número de partículas para melhorar performance
     */
    reduceParticles() {
        const newQuantity = Math.floor(this.config.quantity * 0.5);
        this.circles = this.circles.slice(0, newQuantity);
        this.config.quantity = newQuantity;
        
        if (window.AIProjectsConfig) {
            window.AIProjectsConfig.utils.debug('Particles reduced for performance', { newQuantity });
        }
    }

    /**
     * Atualiza configuração
     */
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        this.initParticles();
    }

    /**
     * Atualiza número de partículas
     */
    updateParticleCount(count) {
        this.config.quantity = count;
        this.initParticles();
    }

    /**
     * Destrói o componente
     */
    destroy() {
        this.pause();
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        this.container.removeEventListener('mousemove', this.handleMouseMove);
        this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    /**
     * Utilitário debounce
     */
    debounce(func, wait) {
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
}

/**
 * Componente BackgroundEffects que gerencia Particles e outros efeitos
 */
class AIBackgroundEffects {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = null;
        this.meteors = null;
        
        this.config = {
            enableParticles: true,
            enableMeteors: false, // Será habilitado na próxima tarefa
            particlesConfig: {},
            meteorsConfig: {},
            ...options
        };

        this.init();
    }

    /**
     * Inicializa os efeitos de fundo
     */
    init() {
        // Verifica se deve usar efeitos simplificados
        if (window.AIProjectsUtils && window.AIProjectsUtils.shouldUseSimplifiedVersion()) {
            this.config.enableParticles = false;
            this.config.enableMeteors = false;
            return;
        }

        this.createBackgroundContainer();
        
        if (this.config.enableParticles) {
            this.initParticles();
        }
        
        if (this.config.enableMeteors) {
            this.initMeteors();
        }
    }

    /**
     * Cria container para efeitos de fundo
     */
    createBackgroundContainer() {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'ai-projects-background';
        backgroundDiv.setAttribute('aria-hidden', 'true');
        
        this.container.insertBefore(backgroundDiv, this.container.firstChild);
        this.backgroundContainer = backgroundDiv;
    }

    /**
     * Inicializa partículas
     */
    initParticles() {
        const particlesConfig = {
            ...window.AIProjectsConfig?.components?.particles?.default,
            ...this.config.particlesConfig
        };

        this.particles = new AIParticles(this.backgroundContainer, particlesConfig);
        
        // Adiciona referência para controle externo
        this.backgroundContainer.particlesInstance = this.particles;
    }

    /**
     * Inicializa meteoros (placeholder para próxima tarefa)
     */
    initMeteors() {
        // Será implementado na tarefa 2.2
        console.log('Meteors will be implemented in task 2.2');
    }

    /**
     * Atualiza configuração dos efeitos
     */
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        if (this.particles && newConfig.particlesConfig) {
            this.particles.updateConfig(newConfig.particlesConfig);
        }
    }

    /**
     * Pausa todos os efeitos
     */
    pause() {
        if (this.particles) {
            this.particles.pause();
        }
    }

    /**
     * Resume todos os efeitos
     */
    resume() {
        if (this.particles) {
            this.particles.resume();
        }
    }

    /**
     * Destrói todos os efeitos
     */
    destroy() {
        if (this.particles) {
            this.particles.destroy();
        }
        
        if (this.backgroundContainer && this.backgroundContainer.parentNode) {
            this.backgroundContainer.parentNode.removeChild(this.backgroundContainer);
        }
    }
}

// Exporta classes para uso global
window.AIParticles = AIParticles;
window.AIBackgroundEffects = AIBackgroundEffects;

// Auto-inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const aiSection = document.querySelector('.ai-projects-section');
    if (aiSection && !aiSection.backgroundEffects) {
        // Inicializa efeitos de fundo automaticamente
        aiSection.backgroundEffects = new AIBackgroundEffects(aiSection);
        
        if (window.AIProjectsConfig) {
            window.AIProjectsConfig.utils.debug('AI Background Effects initialized automatically');
        }
    }
});

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIParticles, AIBackgroundEffects };
}