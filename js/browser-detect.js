// Browser Detection and Compatibility Check - Portfolio Rian Cavalcante

(function() {
    'use strict';
    
    // Detectar navegador
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = 0;
        
        // Chrome
        if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
            browserName = 'Chrome';
            browserVersion = parseInt(userAgent.match(/Chrome\/(\d+)/)[1]);
        }
        // Edge (Chromium)
        else if (userAgent.indexOf('Edg') > -1) {
            browserName = 'Edge';
            browserVersion = parseInt(userAgent.match(/Edg\/(\d+)/)[1]);
        }
        // Firefox
        else if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = parseInt(userAgent.match(/Firefox\/(\d+)/)[1]);
        }
        // Safari
        else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
            browserName = 'Safari';
            const match = userAgent.match(/Version\/(\d+)/);
            browserVersion = match ? parseInt(match[1]) : 0;
        }
        // Internet Explorer
        else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
            browserName = 'IE';
            browserVersion = 11;
        }
        
        return { name: browserName, version: browserVersion };
    }
    
    // Verificar features necessárias
    function checkFeatures() {
        const features = {
            cssVariables: CSS.supports('--css', 'variables'),
            cssGrid: CSS.supports('display', 'grid'),
            flexbox: CSS.supports('display', 'flex'),
            intersectionObserver: 'IntersectionObserver' in window,
            es6: (function() {
                try {
                    eval('const test = () => {};');
                    return true;
                } catch (e) {
                    return false;
                }
            })()
        };
        
        return features;
    }
    
    // Mostrar aviso se navegador não suportado
    function showBrowserWarning(browser) {
        // Apenas mostrar aviso para IE
        if (browser.name === 'IE') {
            const warning = document.createElement('div');
            warning.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #f44336;
                color: white;
                padding: 15px;
                text-align: center;
                z-index: 9999;
                font-family: sans-serif;
            `;
            warning.innerHTML = `
                <strong>Navegador não suportado</strong><br>
                Para melhor experiência, use Chrome, Firefox, Safari ou Edge.
                <button onclick="this.parentElement.remove()" style="margin-left: 10px; padding: 5px 10px; cursor: pointer;">
                    Fechar
                </button>
            `;
            document.body.insertBefore(warning, document.body.firstChild);
        }
    }
    
    // Log de informações (apenas em desenvolvimento)
    function logBrowserInfo(browser, features) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.group('🌐 Browser Information');
            console.log('Browser:', browser.name, browser.version);
            console.log('Features:', features);
            console.groupEnd();
        }
    }
    
    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const browser = detectBrowser();
        const features = checkFeatures();
        
        // Adicionar classe ao body com nome do navegador
        document.body.classList.add('browser-' + browser.name.toLowerCase());
        
        // Mostrar aviso se necessário
        showBrowserWarning(browser);
        
        // Log de informações
        logBrowserInfo(browser, features);
        
        // Adicionar classes de feature detection
        if (!features.cssGrid) {
            document.body.classList.add('no-cssgrid');
        }
        if (!features.intersectionObserver) {
            document.body.classList.add('no-intersectionobserver');
        }
    }
})();
