// Banco de dados de respostas da IA
    // Compar
const iaDatabase = {
    // Salários e informações do Paraná
    'salário paraná': '🌲 No Paraná, o salário médio na agricultura é de R$ 3.850,00. Profissionais iniciantes ganham cerca de R$ 2.200,00, enquanto seniores podem chegar a R$ 6.500,00. O estado oferece excelente equilíbrio entre salário e qualidade de vida!',
    
    'salário pr': '🌲 Paraná: Salário médio R$ 3.850,00 | Iniciante: R$ 2.200,00 | Pleno: R$ 3.850,00 | Sênior: R$ 6.500,00',
    
    'quanto ganha no paraná': '💰 Média salarial PR: R$ 3.850,00. Faixa completa: Iniciante (R$ 2.200) → Pleno (R$ 3.850) → Sênior (R$ 6.500)',
    
    'salário inicial paraná': '🌱 No Paraná, um profissional iniciante na agricultura ganha em média R$ 2.200,00 mensais.',
    
    'salário senior paraná': '👨‍🌾 Profissionais seniores no Paraná podem ganhar até R$ 6.500,00, dependendo da especialização e experiência.',
    
    // Salários e informações do Mato Grosso
    'salário mato grosso': '🌽 O MATO GROSSO tem os MAIORES salários do agronegócio! Média de R$ 4.950,00. Iniciantes: R$ 2.800,00 | Plenos: R$ 4.950,00 | Sêniores: R$ 8.200,00 💰',
    
    'salário mt': '🌽 MATO GROSSO: Salário médio R$ 4.950,00 (maior do Brasil!) | Iniciante: R$ 2.800 | Sênior: até R$ 8.200',
    
    'quanto ganha no mato grosso': '💵 No Mato Grosso os salários são os mais altos: média R$ 4.950, podendo chegar a R$ 8.200 para cargos de liderança.',
    
    'salário inicial mato grosso': '🌱 No Mato Grosso, iniciantes ganham R$ 2.800,00 - um dos melhores salários iniciais do país!',
    
    'salário senior mato grosso': '👑 Profissionais seniores no Mato Grosso podem ganhar até R$ 8.200,00! Líderes e especialistas ganham ainda mais.',
    
    // Comparação direta
    'qual estado paga mais': '🏆 MATO GROSSO paga mais! Média de R$ 4.950 contra R$ 3.850 do Paraná. Diferença de R$ 1.100 por mês (R$ 13.200/ano)!',
    
    'comparação salário': '📊 MATO GROSSO: R$ 4.950 | PARANÁ: R$ 3.850. MT paga 28% mais que PR na média geral.',
    
    'qual melhor salário': '🎯 MELHOR SALÁRIO: MATO GROSSO (R$ 4.950). PARANÁ também tem bons salários (R$ 3.850) com melhor qualidade de vida.',
    
    // Notas de corte
    'nota de corte paraná': '📝 PARANÁ - Notas de corte: Técnico: 600 | Superior: 650 | Especialização: 700 | Média geral: 650 pontos',
    
    'nota de corte pr': '📚 PR: Média 650 pontos. Cursos concorridos podem exigir até 700 pontos.',
    
    'nota de corte mato grosso': '🎯 MATO GROSSO - Notas de corte: Técnico: 680 | Superior: 720 | Especialização: 750 | Média geral: 720 pontos',
    
    'nota de corte mt': '📈 MT: Média 720 pontos. Mais concorrido devido aos altos salários.',
    
    'nota de corte comparação': '⚖️ Comparação: MT (720) x PR (650). Mato Grosso exige notas mais altas, mas compensa com melhores salários.',
    
    // Qualidade de vida
    'qualidade de vida paraná': '⭐ PARANÁ: 8.5/10 em qualidade de vida! Clima ameno, cidades organizadas, boa infraestrutura, saúde e educação de qualidade. É o estado MENOS SOFRIDO para trabalhar.',
    
    'qualidade de vida mato grosso': '🌟 MATO GROSSO: 7.8/10 em qualidade de vida. Clima quente, cidades em desenvolvimento, mas com ótimas oportunidades e crescimento rápido.',
    
    'menos sofrido': '😌 PARANÁ é MENOS SOFRIDO! Clima mais ameno, jornadas organizadas, infraestrutura desenvolvida. MT tem mais oportunidades mas é mais puxado.',
    
    'onde trabalhar': '🤔 Escolha baseada no seu perfil:\n\n🌲 PARANÁ: Melhor qualidade de vida, menos estresse, mais infraestrutura\n\n🌽 MATO GROSSO: Maiores salários, mais oportunidades, crescimento rápido',
    
    'qualidade de vida comparação': '📊 QUALIDADE DE VIDA:\nParaná: 8.5/10 (👍 melhor)\nMato Grosso: 7.8/10\n\nPR ganha em: clima, infraestrutura, saúde, educação\nMT ganha em: salários, oportunidades',
    
    // Vagas e oportunidades
    'vagas paraná': '📌 PARANÁ: aproximadamente 1.200 vagas/mês no setor agrícola. Mercado estável e diversificado.',
    
    'vagas mato grosso': '🚀 MATO GROSSO: mais de 2.500 vagas/mês! É o estado com MAIOR demanda por profissionais do agro.',
    
    'onde tem mais vagas': '📈 MATO GROSSO tem MAIS VAGAS: 2.500/mês contra 1.200/mês do Paraná. Mercado MT aquecido!',
    
    // Carreira e crescimento
    'crescimento profissional': '📈 CRESCIMENTO:\nMT: Rápido (muitas oportunidades, alta demanda)\nPR: Estável (carreiras sólidas, boas empresas)',
    
    'plano de carreira': '🎯 CARREIRA NO AGRO:\n\nPARANÁ: Empresas consolidadas, planos estruturados\n\nMATO GROSSO: Crescimento acelerado, muitas promoções',
    
    // Requisitos
    'precisa de curso': '📚 RECOMENDAÇÕES:\n- Curso técnico em agropecuária (600-680 pontos)\n- Superior em agronomia (650-720 pontos)\n- Especialização em agricultura de precisão (700-750 pontos)',
    
    'formação necessária': '🎓 FORMAÇÃO:\nTécnico: 2 anos (salário inicial R$ 2.200-2.800)\nSuperior: 4-5 anos (salário inicial R$ 2.800-3.500)\nEspecialização: +2 anos (salários 30% maiores)',
    
    // Dicas
    'dica carreira': '💡 DICA IA: Comece com curso técnico, ganhe experiência, depois faça superior. No MT o crescimento é mais rápido!',
    
    'melhor estado para começar': '🤔 PARA COMEÇAR:\nSe quer qualidade de vida: 🌲 PARANÁ\nSe quer ganhar mais: 🌽 MATO GROSSO\n\nAmbos são ótimos! Depende do seu objetivo.',
    
    // Informações gerais
    'media nacional': '📊 MÉDIA NACIONAL na agricultura: R$ 4.400,00. MT está acima (R$ 4.950) e PR um pouco abaixo (R$ 3.850) da média.',
    
    'setor agricola': '🌾 O setor agrícola brasileiro cresceu 45% nos últimos 5 anos. São mais de 15.000 vagas/ano com 82% de satisfação profissional!',
    
    // Respostas padrão
    'default': '🤖 Posso ajudar com informações sobre:\n\n💰 Salários (PR e MT)\n📝 Notas de corte\n🌱 Qualidade de vida\n🎯 Qual estado escolher\n📊 Comparativos\n\nO que você gostaria de saber?',
    
    'oi': 'Olá! 👋 Sou a IA da AgriConnect. Como posso ajudar você hoje?',
    
    'olá': 'Olá! 👋 Tudo bem? Estou aqui para tirar suas dúvidas sobre carreira no agronegócio!',
    
    'ajuda': '🤖 COMANDOS DISPONÍVEIS:\n- salário [estado]\n- nota de corte [estado]\n- qualidade de vida\n- vagas [estado]\n- comparação\n- menos sofrido\n- melhor estado\n- dica carreira'
};

// Função para encontrar a melhor resposta
function findBestResponse(pergunta) {
    pergunta = pergunta.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s]/g, ''); // Remove pontuação
    
    // Palavras-chave para匹配
    const keywords = {
        'salario': ['salário', 'salario', 'quanto ganha', 'remuneracao', 'renda', 'ganha'],
        'parana': ['parana', 'pr', 'paraná'],
        'matogrosso': ['mato grosso', 'mt', 'matogrosso'],
        'nota': ['nota', 'corte', 'pontos', 'enem', 'vestibular'],
        'qualidade': ['qualidade', 'vida', 'bem-estar', 'bem estar'],
        'sofrido': ['sofrido', 'cansativo', 'difícil', 'difícil'],
        'vaga': ['vaga', 'oportunidade', 'emprego', 'trabalho'],
        'comparacao': ['comparação', 'comparacao', 'vs', 'versus', 'x'],
        'carreira': ['carreira', 'profissional', 'crescer', 'crescimento'],
        'curso': ['curso', 'faculdade', 'universidade', 'estudar']
    };
    
    // Tenta匹配respostas exatas primeiro
    for (let key in iaDatabase) {
        if (pergunta.includes(key)) {
            return iaDatabase[key];
        }
    }
    
    // Tenta匹配por palavras-chave
    if (pergunta.includes('salario') || pergunta.includes('quanto')) {
        if (pergunta.includes('parana') || pergunta.includes('pr')) {
            return iaDatabase['salário paraná'];
        }
        if (pergunta.includes('mato grosso') || pergunta.includes('mt')) {
            return iaDatabase['salário mato grosso'];
        }
        if (pergunta.includes('compar') || pergunta.includes('vs')) {
            return iaDatabase['comparação salário'];
        }
        return iaDatabase['qual estado paga mais'];
    }
    
    if (pergunta.includes('nota') || pergunta.includes('corte')) {
        if (pergunta.includes('parana') || pergunta.includes('pr')) {
            return iaDatabase['nota de corte paraná'];
        }
        if (pergunta.includes('mato grosso') || pergunta.includes('mt')) {
            return iaDatabase['nota de corte mato grosso'];
        }
        return iaDatabase['nota de corte comparação'];
    }
    
    if (pergunta.includes('qualidade') || pergunta.includes('vida')) {
        return iaDatabase['qualidade de vida comparada'];
    }
    
    if (pergunta.includes('sofrido') || pergunta.includes('menos')) {
        return iaDatabase['menos sofrido'];
    }
    
    if (pergunta.includes('vaga') || pergunta.includes('oportunidade')) {
        if (pergunta.includes('parana') || pergunta.includes('pr')) {
            return iaDatabase['vagas paraná'];
        }
        if (pergunta.includes('mato grosso') || pergunta.includes('mt')) {
            return iaDatabase['vagas mato grosso'];
        }
        return iaDatabase['onde tem mais vagas'];
    }
    
    if (pergunta.includes('melhor') || pergunta.includes('recomenda')) {
        if (pergunta.includes('estado') || pergunta.includes('trabalhar')) {
            return iaDatabase['onde trabalhar'];
        }
        if (pergunta.includes('salario') || pergunta.includes('paga')) {
            return iaDatabase['qual melhor salário'];
        }
    }
    
    if (pergunta.includes('curso') || pergunta.includes('faculdade')) {
        return iaDatabase['precisa de curso'];
    }
    
    if (pergunta.includes('carreira') || pergunta.includes('crescer')) {
        return iaDatabase['dica carreira'];
    }
    
    if (pergunta.includes('oi') || pergunta.includes('ola')) {
        return iaDatabase['oi'];
    }
    
    if (pergunta.includes('ajuda') || pergunta.includes('comandos')) {
        return iaDatabase['ajuda'];
    }
    
    return iaDatabase['default'];
}

// Função para enviar mensagem
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    input.value = '';
    
    // Simula digitação da IA
    setTimeout(() => {
        const response = findBestResponse(message);
        addMessage(response, 'ia');
    }, 1000);
}

// Função para adicionar mensagem ao chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'ia' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Formata o texto com quebras de linha
    const formattedText = text.replace(/\n/g, '<br>');
    content.innerHTML = `<p>${formattedText}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Função para perguntas sugeridas
function askQuestion(question) {
    document.getElementById('userInput').value = question;
    sendMessage();
}

// Função para perguntar à IA sobre estado específico
function askIA(state) {
    if (state === 'parana') {
        askQuestion('Quero saber mais sobre trabalhar no Paraná');
    } else if (state === 'matogrosso') {
        askQuestion('Me fale sobre as oportunidades no Mato Grosso');
    }
}

// Função para abrir o chat (scroll até a seção IA)
function openChat() {
    document.getElementById('ia').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('userInput').focus();
    }, 1000);
}

// Função para scroll suave
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Função para lidar com tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento de clique nos botões de pergunta sugerida
    const suggestedButtons = document.querySelectorAll('.suggested-btn');
    suggestedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.textContent;
            // Mapeia texto do botão para pergunta real
            if (question.includes('💰 Salário PR')) {
                askQuestion('Qual o salário médio no Paraná?');
            } else if (question.includes('📝 Nota MT')) {
                askQuestion('Qual a nota de corte em Mato Grosso?');
            } else if (question.includes('🌿 Qualidade')) {
                askQuestion('Onde é menos sofrido trabalhar?');
            } else if (question.includes('🤔 Recomendação')) {
                askQuestion('Qual estado devo escolher?');
            }
        });
    });
    
    // Adiciona evento de clique nos itens FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const question = this.querySelector('span').textContent;
            // Mapeia FAQ para perguntas
            if (question.includes('Melhor estado para iniciar')) {
                askQuestion('Qual o melhor estado para começar na agricultura?');
            } else if (question.includes('Salário iniciante PR')) {
                askQuestion('Quanto ganha um agricultor iniciante no Paraná?');
            } else if (question.includes('Precisa de curso')) {
                askQuestion('Precisa de curso para trabalhar na agricultura?');
            } else if (question.includes('Onde tem mais vagas')) {
                askQuestion('Qual estado tem mais vagas?');
            }
        });
    });
    
    // Adiciona mensagem de boas-vindas da IA
    console.log('🤖 IA da AgriConnect carregada e pronta para ajudar!');
});

// Adiciona suporte para navegação ativa no menu
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});