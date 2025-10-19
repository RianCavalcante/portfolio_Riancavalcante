/**
 * AI Projects Meteors Component
 * Implementação otimizada do componente Meteors do Magic UI para a seção de IA
 * Efeito sutil de meteoros que complementa as partículas
 */

class AIMeteors {
    constructor(container, options = {}) {
        this.container = container;
        this.meteors = [];
        this.isActive = false;
        this.isVisible = false;
        this.animationId = null;
        
        // Configurações padrão otimizadas para sutileza
        this.config = {
            number: 5,
            minDelay: 1.0,
            maxDelay: 3.0,
            minDuration: 3,
            maxDuration: 8,
            angle: 215,
            color: '#9E7AFF',
            opacity: 0.6,
            size: 0.5,
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
                return window.AIProjectsConfig.utils.getPerformanceConfig('meteors', capability);
            }
        }
        
        return this.config;
    }

    /**
     * Aplica configurações de performance
     */
    applyPerformanceConfig() {
        Object.assign(this.config, this.performanceConfig);
        
        // Reduz meteoros em dispositivos móveis
        if (window.innerWidth <= 768) {
            this.config.number = Math.max(1, Math.floor(this.config.number * 0.6));
        }
        
        // Respeita preferência de movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.config.number = 0; // Desabilita completamente
        }
    }

    /**
     * Inicializa o componente
     */
    init() {
        if (this.config.number === 0) return;
        
        this.createMeteorContainer();
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
        this.generateMeteors();
        
        // Inicia animação apenas se visível
        if (this.isVisible) {
            this.start();
        }
    }

    /**
     * Cria container para meteoros
     */
    createMeteorContainer() {
        this.meteorContainer = document.createElement('div');
        this.meteorContainer.className = 'ai-meteors-container';
        this.meteorContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        `;
        
        this.container.appendChild(this.meteorContainer);
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
                rootMargin: '100px'
            });
            
            observer.observe(this.container);
        } else {
            this.isVisible = true;
        }
    }

    /**
     * Configura monitoramento de performance
     */
    setupPerformanceMonitoring() {
        if (window.aiPerformanceMonitor) {
            const checkPerformance = () => {
                const status = window.aiPerformanceMonitor.getStatus();
                if (status.shouldReduceEffects && this.config.enableAutoReduction) {
                    this.reduceMeteors();
                }
            };
            
            setInterval(checkPerformance, 3000);
        }

        // Pausa durante mudanças de visibilidade
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (this.isVisible) {
                this.resume();
            }
        });
    }

    /**
     * Gera meteoros iniciais
     */
    generateMeteors() {
        this.meteors = [];
        
        for (let i = 0; i < this.config.number; i++) {
            this.meteors.push(this.createMeteor(i));
        }
    }

    /**
     * Cria um meteoro individual
     */
    createMeteor(index) {
        const meteor = document.createElement('span');
        meteor.className = 'ai-meteor';
        
        // Posição inicial aleatória
        const startX = Math.random() * window.innerWidth;
        const startY = -50; // Começa acima da tela
        
        // Propriedades do meteoro
        const meteorData = {
            element: meteor,
            startX,
            startY,
            delay: Math.random() * (this.config.maxDelay - this.config.minDelay) + this.config.minDelay,
            duration: Math.random() * (this.config.maxDuration - this.config.minDuration) + this.config.minDuration,
            angle: this.config.angle + (Math.random() - 0.5) * 20, // Variação no ângulo
            size: this.config.size + Math.random() * 0.3,
            opacity: this.config.opacity * (0.7 + Math.random() * 0.3)
        };

        // Estiliza o meteoro
        this.styleMeteor(meteor, meteorData);
        
        // Adiciona ao container
        this.meteorContainer.appendChild(meteor);
        
        return meteorData;
    }

    /**
     * Aplica estilos ao meteoro
     */
    styleMeteor(element, data) {
        const tailLength = 50 + Math.random() * 30; // Comprimento da cauda variável
        
        element.style.cssText = `
            position: absolute;
            width: ${data.size}px;
            height: ${data.size}px;
            background: ${this.config.color};
            border-radius: 50%;
            opacity: 0;
            transform: rotate(${data.angle}deg);
            box-shadow: 0 0 ${data.size * 2}px ${this.config.color};
            --meteor-angle: ${data.angle}deg;
            --meteor-tail-length: ${tailLength}px;
            --meteor-opacity: ${data.opacity};
        `;
        
        // Adiciona cauda do meteoro
        const tail = document.createElement('div');
        tail.className = 'ai-meteor-tail';
        tail.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: ${tailLength}px;
            height: 1px;
            background: linear-gradient(90deg, ${this.config.color} 0%, transparent 100%);
            transform: translate(-100%, -50%);
            opacity: 0.8;
        `;
        
        element.appendChild(tail);
    }

    /**
     * Anima um meteoro
     */
    animateMeteor(meteorData) {
        const { element, startX, startY, delay, duration, angle } = meteorData;
        
        // Calcula posição final baseada no ângulo
        const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
        const radians = (angle * Math.PI) / 180;
        const endX = startX + Math.cos(radians) * distance;
        const endY = startY + Math.sin(radians) * distance;
        
        // Reseta posição inicial
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        element.style.opacity = '0';
        
        // Animação com CSS transitions
        setTimeout(() => {
            element.style.transition = `all ${duration}s linear`;
            element.style.left = `${endX}px`;
            element.style.top = `${endY}px`;
            element.style.opacity = `${meteorData.opacity}`;
            
            // Fade out no final
            setTimeout(() => {
                element.style.opacity = '0';
            }, duration * 1000 * 0.8);
            
        }, delay * 1000);
        
        // Reinicia o meteoro após completar a animação
        setTimeout(() => {
            if (this.isActive) {
                this.animateMeteor(meteorData);
            }
        }, (delay + duration + 1) * 1000);
    }

    /**
     * Inicia as animações
     */
    start() {
        if (!this.isActive && this.meteors.length > 0) {
            this.isActive = true;
            
            this.meteors.forEach((meteor, index) => {
                // Espalha o início das animações
                setTimeout(() => {
                    if (this.isActive) {
                        this.animateMeteor(meteor);
                    }
                }, index * 500);
            });
            
            if (window.AIProjectsConfig) {
                window.AIProjectsConfig.utils.debug('Meteors animation started', { count: this.meteors.length });
            }
        }
    }

    /**
     * Pausa as animações
     */
    pause() {
        this.isActive = false;
        
        this.meteors.forEach(meteor => {
            meteor.element.style.transition = 'none';
            meteor.element.style.opacity = '0';
        });
    }

    /**
     * Resume as animações
     */
    resume() {
        if (this.isVisible && !this.isActive) {
            this.start();
        }
    }

    /**
     * Reduz número de meteoros para melhorar performance
     */
    reduceMeteors() {
        const newCount = Math.max(1, Math.floor(this.config.number * 0.5));
        
        // Remove meteoros extras
        for (let i = newCount; i < this.meteors.length; i++) {
            const meteor = this.meteors[i];
            if (meteor.element && meteor.element.parentNode) {
                meteor.element.parentNode.removeChild(meteor.element);
            }
        }
        
        this.meteors = this.meteors.slice(0, newCount);
        this.config.number = newCount;
        
        if (window.AIProjectsConfig) {
            window.AIProjectsConfig.utils.debug('Meteors reduced for performance', { newCount });
        }
    }

    /**
     * Atualiza configuração
     */
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        // Regenera meteoros se necessário
        if (newConfig.number && newConfig.number !== this.meteors.length) {
            this.destroy();
            this.init();
        }
    }

    /**
     * Atualiza número de meteoros
     */
    updateMeteorCount(count) {
        this.config.number = count;
        this.destroy();
        this.init();
    }

    /**
     * Destrói o componente
     */
    destroy() {
        this.pause();
        
        if (this.meteorContainer && this.meteorContainer.parentNode) {
            this.meteorContainer.parentNode.removeChild(this.meteorContainer);
        }
        
        this.meteors = [];
    }
}

// Atualiza a classe AIBackgroundEffects para incluir meteoros
if (window.AIBackgroundEffects) {
    const originalInit = window.AIBackgroundEffects.prototype.initMeteors;
    
    window.AIBackgroundEffects.prototype.initMeteors = function() {
        const meteorsConfig = {
            ...window.AIProjectsConfig?.components?.meteors?.default,
            ...this.config.meteorsConfig
        };

        this.meteors = new AIMeteors(this.backgroundContainer, meteorsConfig);
        
        // Adiciona referência para controle externo
        this.backgroundContainer.meteorsInstance = this.meteors;
        
        if (window.AIProjectsConfig) {
            window.AIProjectsConfig.utils.debug('Meteors initialized', meteorsConfig);
        }
    };
    
    // Atualiza método destroy para incluir meteoros
    const originalDestroy = window.AIBackgroundEffects.prototype.destroy;
    
    window.AIBackgroundEffects.prototype.destroy = function() {
        if (this.meteors) {
            this.meteors.destroy();
        }
        
        originalDestroy.call(this);
    };
    
    // Atualiza métodos pause/resume
    const originalPause = window.AIBackgroundEffects.prototype.pause;
    const originalResume = window.AIBackgroundEffects.prototype.resume;
    
    window.AIBackgroundEffects.prototype.pause = function() {
        originalPause.call(this);
        
        if (this.meteors) {
            this.meteors.pause();
        }
    };
    
    window.AIBackgroundEffects.prototype.resume = function() {
        originalResume.call(this);
        
        if (this.meteors) {
            this.meteors.resume();
        }
    };
}

// Exporta classe para uso global
window.AIMeteors = AIMeteors;

// Auto-habilita meteoros nas instâncias existentes
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const aiSection = document.querySelector('.ai-projects-section');
        if (aiSection && aiSection.backgroundEffects) {
            // Habilita meteoros na instância existente
            aiSection.backgroundEffects.config.enableMeteors = true;
            aiSection.backgroundEffects.initMeteors();
            
            if (window.AIProjectsConfig) {
                window.AIProjectsConfig.utils.debug('Meteors enabled on existing background effects');
            }
        }
    }, 1000);
});

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIMeteors };
}