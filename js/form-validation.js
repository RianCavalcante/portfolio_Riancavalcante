// Form validation - Portfolio Rian Cavalcante

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');
    
    // Validação em tempo real
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());
    
    // Limpar erro ao digitar
    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
    
    // Submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simular envio (aqui você integraria com um backend)
            submitForm();
        }
    });
    
    function validateName() {
        const value = nameInput.value.trim();
        const formGroup = nameInput.closest('.form-group');
        const errorElement = document.getElementById('nameError');
        
        if (value === '') {
            showError(formGroup, errorElement, 'Por favor, informe seu nome');
            return false;
        }
        
        if (value.length < 3) {
            showError(formGroup, errorElement, 'Nome deve ter pelo menos 3 caracteres');
            return false;
        }
        
        showSuccess(formGroup);
        return true;
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const formGroup = emailInput.closest('.form-group');
        const errorElement = document.getElementById('emailError');
        
        if (value === '') {
            showError(formGroup, errorElement, 'Por favor, informe seu e-mail');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(formGroup, errorElement, 'Por favor, informe um e-mail válido');
            return false;
        }
        
        showSuccess(formGroup);
        return true;
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        const formGroup = messageInput.closest('.form-group');
        const errorElement = document.getElementById('messageError');
        
        if (value === '') {
            showError(formGroup, errorElement, 'Por favor, escreva uma mensagem');
            return false;
        }
        
        if (value.length < 10) {
            showError(formGroup, errorElement, 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
        
        showSuccess(formGroup);
        return true;
    }
    
    function showError(formGroup, errorElement, message) {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        errorElement.textContent = message;
    }
    
    function showSuccess(formGroup) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.remove('success');
    }
    
    function submitForm() {
        // Desabilitar botão durante envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Coletar dados do formulário
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: messageInput.value.trim()
        };
        
        // Simular envio (substituir por integração real)
        setTimeout(() => {
            // Criar link mailto como fallback
            const mailtoLink = `mailto:riancavalcante505@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contato do Portfólio')}&body=${encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`)}`;
            
            // Abrir cliente de e-mail
            window.location.href = mailtoLink;
            
            // Mostrar mensagem de sucesso
            formMessage.textContent = 'Abrindo seu cliente de e-mail... Se não abrir automaticamente, envie para riancavalcante505@gmail.com';
            formMessage.className = 'form-message success';
            
            // Limpar formulário
            form.reset();
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
            
            // Reabilitar botão
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Esconder mensagem após 10 segundos
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 10000);
        }, 1000);
    }
});
