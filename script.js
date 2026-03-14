// ============================================
// FUNCIONALIDADES INTERATIVAS
// ============================================

// Smooth scroll para links de navegação
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

// Seletor de estado nos comentários
document.querySelectorAll('.state-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Enviar comentário
document.querySelector('.submit-btn')?.addEventListener('click', function() {
    const textarea = document.querySelector('.comment-form textarea');
    const stateBtn = document.querySelector('.state-btn.active');
    
    if (textarea.value.trim()) {
        console.log('Comentário enviado:', {
            texto: textarea.value,
            estado: stateBtn.textContent
        });
        
        // Limpar formulário
        textarea.value = '';
        
        // Mostrar mensagem de sucesso
        alert('Comentário enviado com sucesso! Será revisado em breve.');
    } else {
        alert('Por favor, escreva um comentário.');
    }
});

// Enviar mensagem no chat
document.querySelector('.send-btn')?.addEventListener('click', function() {
    const input = document.querySelector('.chat-input input');
    const messagesContainer = document.querySelector('.chat-messages');
    
    if (input.value.trim()) {
        // Adicionar mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `<p>${input.value}</p>`;
        messagesContainer.appendChild(userMessage);
        
        // Limpar input
        input.value = '';
        
        // Scroll para baixo
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simular resposta da IA
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `<p>Obrigado pela pergunta! Estou analisando sua questão sobre Mato Grosso e Paraná. 🤖</p>`;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 500);
    }
});

// Permitir enviar mensagem com Enter
document.querySelector('.chat-input input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.send-btn').click();
    }
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards
document.querySelectorAll('.comparison-card, .stat-card, .dados-card, .comment-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar sticky effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Adicionar efeito de hover nos cards
document.querySelectorAll('.comparison-card, .stat-card, .dados-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Função para scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Log de inicialização
console.log('🌾 Plataforma MG vs PR carregada com sucesso!');
console.log('Bem-vindo à plataforma de comparação econômica entre Mato Grosso e Paraná.');
