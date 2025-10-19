/**
 * AI Projects Performance Monitor and Optimization System
 * Detecta capacidade do dispositivo e preferências do usuário para otimizar Magic UI
 */

class AIProjectsPerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];
        this.isMonitoring = false;
        this.shouldReduceEffects = false;
        this.prefersReducedMotion = false;
        this.deviceCapability = 'high';
        this.connectionSpeed = 'fast';
        
        this.init();
    }

    init() {
        this.detectReducedMotionPreference();
        this.detectDeviceCapability();
        this.detectConnectionSpeed();
        this.setupPerformanceMonitoring();
        this.setupVisibilityHandling();
        this.bindEvents();
    }

    /**
     * Detecta preferência de movimento reduzido
     */
    detectReducedMotionPreference() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.prefersReducedMotion = mediaQuery.matches;
        
        // Escuta mudanças na preferência
        mediaQuery.addEventListener('change', (e) => {
            this.prefersReducedMotion = e.matches;
            this.updateEffectsBasedOnPreferences();
        });
        
        console.log('Reduced motion preference:', this.prefersReducedMotion);
    }

    /**
     * Detecta capacidade do dispositivo
     */
    detectDeviceCapability() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        // Fatores para determinar capacidade
        const factors = {
            cores: navigator.hardwareConcurrency || 2,
            memory: navigator.deviceMemory || 2,
            webgl: !!gl,
            touchDevice: 'ontouchstart' in window,
            pixelRatio: window.devicePixelRatio || 1
        };

        // Calcula score de capacidade
        let score = 0;
        score += Math.min(factors.cores / 4, 1) * 30; // Max 30 pontos para cores
        score += Math.min(factors.memory / 4, 1) * 25; // Max 25 pontos para memória
        score += factors.webgl ? 20 : 0; // 20 pontos para WebGL
        score += factors.touchDevice ? -10 : 0; // -10 para dispositivos touch
        score += factors.pixelRatio > 2 ? -5 : 0; // -5 para telas de alta densidade

        // Determina categoria
        if (score >= 60) {
            this.deviceCapability = 'high';
        } else if (score >= 35) {
            this.deviceCapability = 'medium';
        } else {
            this.deviceCapability = 'low';
        }

        console.log('Device capability:', this.deviceCapability, 'Score:', score, 'Factors:', factors);
    }

    /**
     * Detecta velocidade da conexão
     */
    detectConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            
            switch (effectiveType) {
                case 'slow-2g':
                case '2g':
                    this.connectionSpeed = 'slow';
                    break;
                case '3g':
                    this.connectionSpeed = 'medium';
                    break;
                case '4g':
                default:
                    this.connectionSpeed = 'fast';
                    break;
            }
            
            // Escuta mudanças na conexão
            connection.addEventListener('change', () => {
                this.detectConnectionSpeed();
                this.updateEffectsBasedOnConnection();
            });
        }
        
        console.log('Connection speed:', this.connectionSpeed);
    }

    /**
     * Configura monitoramento de FPS
     */
    setupPerformanceMonitoring() {
        const measureFPS = (currentTime) => {
            if (!this.isMonitoring) return;
            
            this.frameCount++;
            const deltaTime = currentTime - this.lastTime;
            
            if (deltaTime >= 1000) { // Mede a cada segundo
                this.fps = Math.round((this.frameCount * 1000) / deltaTime);
                this.fpsHistory.push(this.fps);
                
                // Mantém apenas os últimos 10 valores
                if (this.fpsHistory.length > 10) {
                    this.fpsHistory.shift();
                }
                
                // Calcula FPS médio
                const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
                
                // Determina se deve reduzir efeitos
                const previousShouldReduce = this.shouldReduceEffects;
                this.shouldReduceEffects = avgFPS < 30;
                
                if (previousShouldReduce !== this.shouldReduceEffects) {
                    this.updateEffectsBasedOnPerformance();
                }
                
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        // Inicia monitoramento quando há animações ativas
        this.startMonitoring = () => {
            if (!this.isMonitoring) {
                this.isMonitoring = true;
                this.lastTime = performance.now();
                requestAnimationFrame(measureFPS);
            }
        };
        
        this.stopMonitoring = () => {
            this.isMonitoring = false;
        };
    }

    /**
     * Configura handling de visibilidade da página
     */
    setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopMonitoring();
                this.pauseAllAnimations();
            } else {
                this.resumeAllAnimations();
                // Reinicia monitoramento após um delay
                setTimeout(() => this.startMonitoring(), 1000);
            }
        });
    }

    /**
     * Vincula eventos de interação
     */
    bindEvents() {
        // Inicia monitoramento quando usuário interage com a seção
        const aiSection = document.querySelector('.ai-projects-section');
        if (aiSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startMonitoring();
                    } else {
                        this.stopMonitoring();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(aiSection);
        }
    }

    /**
     * Atualiza efeitos baseado nas preferências
     */
    updateEffectsBasedOnPreferences() {
        const body = document.body;
        
        if (this.prefersReducedMotion) {
            body.classList.add('ai-reduced-motion');
            this.disableHeavyAnimations();
        } else {
            body.classList.remove('ai-reduced-motion');
            this.enableAnimationsBasedOnCapability();
        }
    }

    /**
     * Atualiza efeitos baseado na performance
     */
    updateEffectsBasedOnPerformance() {
        console.log('Performance update - Should reduce effects:', this.shouldReduceEffects, 'FPS:', this.fps);
        
        if (this.shouldReduceEffects) {
            this.reduceEffectsForPerformance();
        } else {
            this.enableAnimationsBasedOnCapability();
        }
    }

    /**
     * Atualiza efeitos baseado na conexão
     */
    updateEffectsBasedOnConnection() {
        if (this.connectionSpeed === 'slow') {
            this.delayNonCriticalEffects();
        }
    }

    /**
     * Desabilita animações pesadas
     */
    disableHeavyAnimations() {
        const elements = document.querySelectorAll('.particles, .meteors, .magic-card');
        elements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Adiciona classe para CSS
        document.body.classList.add('ai-performance-reduced');
    }

    /**
     * Reduz efeitos para melhorar performance
     */
    reduceEffectsForPerformance() {
        // Reduz número de partículas
        const particles = document.querySelector('.particles');
        if (particles && particles.updateParticleCount) {
            particles.updateParticleCount(Math.floor(particles.particleCount * 0.3));
        }
        
        // Reduz meteoros
        const meteors = document.querySelector('.meteors');
        if (meteors && meteors.updateMeteorCount) {
            meteors.updateMeteorCount(Math.floor(meteors.meteorCount * 0.5));
        }
        
        // Simplifica animações de texto
        const textAnimations = document.querySelectorAll('.aurora-text, .animated-gradient-text');
        textAnimations.forEach(el => {
            el.style.animationDuration = '0.1s';
        });
        
        document.body.classList.add('ai-performance-reduced');
    }

    /**
     * Habilita animações baseado na capacidade
     */
    enableAnimationsBasedOnCapability() {
        if (this.prefersReducedMotion) return;
        
        document.body.classList.remove('ai-performance-reduced');
        
        const config = this.getEffectsConfig();
        
        // Configura partículas
        const particles = document.querySelector('.particles');
        if (particles && particles.updateConfig) {
            particles.updateConfig(config.particles);
        }
        
        // Configura meteoros
        const meteors = document.querySelector('.meteors');
        if (meteors && meteors.updateConfig) {
            meteors.updateConfig(config.meteors);
        }
        
        // Restaura animações de texto
        const textAnimations = document.querySelectorAll('.aurora-text, .animated-gradient-text');
        textAnimations.forEach(el => {
            el.style.animationDuration = '';
        });
    }

    /**
     * Retorna configuração de efeitos baseada na capacidade
     */
    getEffectsConfig() {
        const configs = {
            high: {
                particles: { count: 40, size: 0.4, speed: 1 },
                meteors: { count: 8, speed: 1 },
                animations: { duration: 'normal' }
            },
            medium: {
                particles: { count: 25, size: 0.3, speed: 0.7 },
                meteors: { count: 5, speed: 0.8 },
                animations: { duration: 'fast' }
            },
            low: {
                particles: { count: 15, size: 0.2, speed: 0.5 },
                meteors: { count: 3, speed: 0.6 },
                animations: { duration: 'fast' }
            }
        };
        
        return configs[this.deviceCapability] || configs.medium;
    }

    /**
     * Atrasa efeitos não críticos
     */
    delayNonCriticalEffects() {
        setTimeout(() => {
            const nonCritical = document.querySelectorAll('.particles, .meteors');
            nonCritical.forEach(el => {
                el.style.display = '';
            });
        }, 2000);
    }

    /**
     * Pausa todas as animações
     */
    pauseAllAnimations() {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    /**
     * Resume todas as animações
     */
    resumeAllAnimations() {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    /**
     * Retorna estado atual do sistema
     */
    getStatus() {
        return {
            fps: this.fps,
            shouldReduceEffects: this.shouldReduceEffects,
            prefersReducedMotion: this.prefersReducedMotion,
            deviceCapability: this.deviceCapability,
            connectionSpeed: this.connectionSpeed,
            isMonitoring: this.isMonitoring
        };
    }

    /**
     * Força atualização de todos os efeitos
     */
    forceUpdate() {
        this.updateEffectsBasedOnPreferences();
        this.updateEffectsBasedOnPerformance();
        this.updateEffectsBasedOnConnection();
    }
}

// Instância global do monitor de performance
window.aiPerformanceMonitor = new AIProjectsPerformanceMonitor();

// Utilitários para componentes Magic UI
window.AIProjectsUtils = {
    /**
     * Verifica se deve usar versão simplificada do componente
     */
    shouldUseSimplifiedVersion() {
        const monitor = window.aiPerformanceMonitor;
        return monitor.prefersReducedMotion || 
               monitor.shouldReduceEffects || 
               monitor.deviceCapability === 'low';
    },

    /**
     * Retorna configuração otimizada para componente
     */
    getOptimizedConfig(componentType) {
        const monitor = window.aiPerformanceMonitor;
        const config = monitor.getEffectsConfig();
        
        switch (componentType) {
            case 'particles':
                return config.particles;
            case 'meteors':
                return config.meteors;
            case 'animations':
                return config.animations;
            default:
                return {};
        }
    },

    /**
     * Executa callback quando performance permite
     */
    whenPerformanceAllows(callback, fallback = null) {
        const monitor = window.aiPerformanceMonitor;
        
        if (monitor.shouldReduceEffects || monitor.prefersReducedMotion) {
            if (fallback) fallback();
        } else {
            callback();
        }
    },

    /**
     * Debounce para otimizar eventos frequentes
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
    },

    /**
     * Throttle para limitar execução de funções
     */
    throttle(func, limit) {
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
};

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIProjectsPerformanceMonitor, AIProjectsUtils: window.AIProjectsUtils };
}