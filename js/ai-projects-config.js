/**
 * Configuração centralizada para componentes Magic UI da seção AI Projects
 * Define configurações padrão, temas e comportamentos dos componentes
 */

window.AIProjectsConfig = {
    // Configurações gerais
    general: {
        version: '1.0.0',
        debug: false,
        enableAnalytics: true,
        fallbackMode: false
    },

    // Configurações de tema e cores
    theme: {
        colors: {
            primary: '#9E7AFF',
            secondary: '#FE8BBB',
            accent: '#00D4FF',
            background: 'rgba(15, 23, 42, 0.95)',
            surface: 'rgba(30, 41, 59, 0.8)',
            text: {
                primary: '#ffffff',
                secondary: 'rgba(255, 255, 255, 0.8)',
                muted: 'rgba(255, 255, 255, 0.6)'
            },
            neon: {
                primary: '#ff00aa',
                secondary: '#00FFF1'
            },
            gradients: {
                main: 'linear-gradient(135deg, #9E7AFF 0%, #FE8BBB 100%)',
                accent: 'linear-gradient(45deg, #00D4FF 0%, #9E7AFF 100%)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)'
            }
        },
        
        // Configurações de animação
        animations: {
            duration: {
                fast: 300,
                normal: 800,
                slow: 1200
            },
            easing: {
                default: 'cubic-bezier(0.4, 0, 0.2, 1)',
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            stagger: 100
        },

        // Configurações responsivas
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1280
        }
    },

    // Configurações específicas por componente
    components: {
        // Configurações para Particles
        particles: {
            default: {
                quantity: 40,
                staticity: 50,
                ease: 50,
                size: 0.4,
                color: '#9E7AFF',
                vx: 0,
                vy: 0,
                refresh: false
            },
            performance: {
                high: {
                    quantity: 40,
                    size: 0.4,
                    ease: 50
                },
                medium: {
                    quantity: 25,
                    size: 0.3,
                    ease: 40
                },
                low: {
                    quantity: 15,
                    size: 0.2,
                    ease: 30
                }
            },
            mobile: {
                quantity: 20,
                size: 0.3,
                ease: 40
            }
        },

        // Configurações para Meteors
        meteors: {
            default: {
                number: 8,
                minDelay: 0.2,
                maxDelay: 1.2,
                minDuration: 2,
                maxDuration: 10,
                angle: 215
            },
            performance: {
                high: { number: 8 },
                medium: { number: 5 },
                low: { number: 3 }
            },
            mobile: {
                number: 3,
                minDuration: 3,
                maxDuration: 8
            }
        },

        // Configurações para MagicCard
        magicCard: {
            default: {
                gradientSize: 200,
                gradientColor: '#262626',
                gradientOpacity: 0.8,
                gradientFrom: '#9E7AFF',
                gradientTo: '#FE8BBB'
            },
            hover: {
                duration: 200,
                scale: 1.02,
                translateY: -5
            }
        },

        // Configurações para BorderBeam
        borderBeam: {
            default: {
                size: 50,
                duration: 6,
                delay: 0,
                colorFrom: '#9E7AFF',
                colorTo: '#FE8BBB',
                borderWidth: 2
            },
            performance: {
                high: { duration: 6 },
                medium: { duration: 4 },
                low: { duration: 2 }
            }
        },

        // Configurações para NeonGradientCard
        neonGradientCard: {
            default: {
                borderSize: 2,
                borderRadius: 20,
                neonColors: {
                    firstColor: '#ff00aa',
                    secondColor: '#00FFF1'
                }
            }
        },

        // Configurações para componentes de texto
        textAnimations: {
            auroraText: {
                colors: ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
                speed: 1
            },
            animatedGradientText: {
                speed: 1,
                colorFrom: '#9E7AFF',
                colorTo: '#FE8BBB'
            },
            numberTicker: {
                duration: 2000,
                delay: 500
            },
            textAnimate: {
                animation: 'blurInUp',
                duration: 0.8,
                staggerDelay: 0.1
            },
            animatedShinyText: {
                shimmerWidth: 100
            }
        },

        // Configurações para botões interativos
        interactiveButtons: {
            coolMode: {
                particle: '✨',
                particleCount: 15,
                speedHorz: 10,
                speedUp: 25
            },
            shimmerButton: {
                duration: 2000,
                colors: {
                    from: '#9E7AFF',
                    to: '#FE8BBB'
                }
            }
        }
    },

    // Configurações de performance
    performance: {
        // Thresholds para ajuste automático
        thresholds: {
            fps: {
                good: 55,
                acceptable: 30,
                poor: 20
            },
            memory: {
                high: 8,
                medium: 4,
                low: 2
            }
        },

        // Configurações de otimização
        optimization: {
            enableLazyLoading: true,
            enableIntersectionObserver: true,
            enableRequestIdleCallback: true,
            debounceDelay: 100,
            throttleDelay: 16
        },

        // Configurações de fallback
        fallback: {
            disableAnimations: false,
            simplifyEffects: true,
            reduceParticles: true,
            disableHeavyComponents: false
        }
    },

    // Configurações de acessibilidade
    accessibility: {
        respectReducedMotion: true,
        provideFallbacks: true,
        enableKeyboardNavigation: true,
        enableScreenReaderSupport: true,
        highContrastMode: false,
        focusManagement: {
            enableFocusTrapping: false,
            enableFocusOutlines: true,
            skipLinks: true
        }
    },

    // Configurações de dados dos projetos
    projectsData: {
        aiProjects: [
            {
                id: 'chatbot-inteligente',
                title: 'Assistente Virtual Inteligente',
                description: 'Chatbot avançado com GPT-4 que entende contexto, aprende com conversas e automatiza atendimento 24/7.',
                technologies: ['Python', 'GPT-4', 'NLP', 'FastAPI', 'LangChain'],
                stats: {
                    efficiency: '90%',
                    availability: '24/7',
                    accuracy: '95%'
                },
                badge: '🚀 IA Conversacional',
                featured: true,
                category: 'ai'
            },
            {
                id: 'analise-preditiva',
                title: 'Análise Preditiva Inteligente',
                description: 'Modelos de ML que preveem tendências, identificam padrões ocultos e antecipam comportamentos.',
                technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'XGBoost'],
                stats: {
                    accuracy: '85%',
                    speed: '10x',
                    throughput: '100k+'
                },
                badge: '📈 Machine Learning',
                featured: true,
                category: 'ml'
            },
            {
                id: 'automacao-rpa',
                title: 'Automação Inteligente RPA',
                description: 'RPA com IA que aprende e se adapta. Automatiza processos complexos com visão computacional.',
                technologies: ['Python', 'OpenCV', 'RPA', 'Computer Vision', 'OCR'],
                stats: {
                    efficiency: '300%',
                    errors: '0',
                    operation: '24/7'
                },
                badge: '⚡ Automação IA',
                featured: true,
                category: 'automation'
            }
        ],

        statistics: {
            totalProjects: 15,
            technologiesUsed: 25,
            yearsExperience: 5,
            clientsSatisfied: 50,
            automationHours: 10000,
            aiModelsDeployed: 30
        }
    },

    // Utilitários e helpers
    utils: {
        // Função para obter configuração baseada na performance
        getPerformanceConfig(componentType, deviceCapability = 'medium') {
            const component = this.components[componentType];
            if (!component) return {};

            const performanceConfig = component.performance?.[deviceCapability];
            return { ...component.default, ...performanceConfig };
        },

        // Função para obter configuração responsiva
        getResponsiveConfig(componentType, screenWidth) {
            const component = this.components[componentType];
            if (!component) return {};

            if (screenWidth <= this.theme.breakpoints.mobile) {
                return { ...component.default, ...component.mobile };
            }

            return component.default;
        },

        // Função para verificar suporte a recursos
        checkFeatureSupport() {
            return {
                webgl: !!window.WebGLRenderingContext,
                intersectionObserver: 'IntersectionObserver' in window,
                requestIdleCallback: 'requestIdleCallback' in window,
                performanceObserver: 'PerformanceObserver' in window,
                deviceMemory: 'deviceMemory' in navigator,
                hardwareConcurrency: 'hardwareConcurrency' in navigator
            };
        },

        // Função para debug
        debug(message, data = null) {
            if (this.general.debug) {
                console.log(`[AI Projects] ${message}`, data);
            }
        },

        // Função para logging de performance
        logPerformance(metric, value) {
            if (this.general.enableAnalytics) {
                console.log(`[Performance] ${metric}: ${value}`);
            }
        }
    }
};

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    // Detecta capacidades do dispositivo
    const features = window.AIProjectsConfig.utils.checkFeatureSupport();
    window.AIProjectsConfig.utils.debug('Feature support detected:', features);

    // Configura modo de fallback se necessário
    if (!features.webgl || !features.intersectionObserver) {
        window.AIProjectsConfig.general.fallbackMode = true;
        window.AIProjectsConfig.utils.debug('Fallback mode enabled');
    }

    // Aplica configurações de acessibilidade
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        window.AIProjectsConfig.accessibility.respectReducedMotion = true;
        window.AIProjectsConfig.performance.fallback.disableAnimations = true;
        window.AIProjectsConfig.utils.debug('Reduced motion preference detected');
    }

    // Detecta high contrast mode
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    if (prefersHighContrast) {
        window.AIProjectsConfig.accessibility.highContrastMode = true;
        document.body.classList.add('high-contrast');
        window.AIProjectsConfig.utils.debug('High contrast mode enabled');
    }

    window.AIProjectsConfig.utils.debug('AI Projects configuration initialized');
});

// Exporta configuração para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.AIProjectsConfig;
}