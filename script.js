// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.disease-card, .benefit-card, .requirements-list li');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Validação e envio do formulário
document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const disease = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    // Validação básica
    if (!name || !phone || !email || !disease) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Validação de telefone (formato brasileiro básico)
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Por favor, insira um telefone válido.');
        return;
    }
    
    // Simular envio do formulário
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Efeito de hover nos cards
document.querySelectorAll('.disease-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll suave para o header fixo
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Adicionar transição ao header
header.style.transition = 'transform 0.3s ease';

// Máscara para telefone
document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    e.target.value = value;
});

// Contador de caracteres para textarea
const textarea = document.querySelector('textarea');
if (textarea) {
    const maxLength = 500;
    
    // Criar contador
    const counter = document.createElement('div');
    counter.style.textAlign = 'right';
    counter.style.fontSize = '12px';
    counter.style.color = '#b4b4b4';
    counter.style.marginTop = '-15px';
    counter.style.marginBottom = '20px';
    
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    
    textarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        counter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 50) {
            counter.style.color = '#ff6b6b';
        } else {
            counter.style.color = '#b4b4b4';
        }
        
        if (remaining < 0) {
            this.value = this.value.substring(0, maxLength);
            counter.textContent = '0 caracteres restantes';
        }
    });
    
    // Inicializar contador
    textarea.dispatchEvent(new Event('input'));
}

