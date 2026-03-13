// ============================================
// CONFIGURAÇÃO E VARIÁVEIS GLOBAIS
// ============================================

const API_BASE_URL = 'https://api.manus.im'; // Altere para sua API real
const SYSTEM_PROMPT = `Você é um assistente especializado em informações sobre os estados brasileiros de Mato Grosso e Paraná.

Dados sobre Mato Grosso:
- População: ~3,6 milhões
- Área: 903.357 km²
- PIB: R$ 273 bilhões (2º maior do Brasil)
- Crescimento esperado: 4,1% em 2025
- Biomas: Amazônia (53,5%), Cerrado, Pantanal
- Clima: Tropical e subtropical
- Agricultura: Maior produtor agrícola do Brasil (15,4% da produção nacional)
- Principais culturas: Soja, milho, algodão, café, cana-de-açúcar
- Produção de grãos: 30,3% da produção nacional

Dados sobre Paraná:
- População: ~11,4 milhões (5º estado mais populoso)
- Área: 199.307 km²
- PIB: R$ 718,9 bilhões (5º maior do Brasil)
- Crescimento: 63% em 6 anos
- Bioma principal: Mata Atlântica
- Clima: Subtropical úmido
- Agricultura: 2º maior produtor de grãos do Brasil
- Principais culturas: Cana-de-açúcar (38,59 milhões de toneladas), soja (21,55 milhões), milho (17,88 milhões)
- Exportações: Soja, carnes, fumo
- Atrações: Cataratas do Iguazu

Responda perguntas sobre esses estados de forma clara, informativa e comparativa quando apropriado. Cite dados específicos quando disponível.`;

let messageHistory = [];


document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadChatHistory();
});


function initializeEventListeners() {
    // Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}


function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-tab') === tabName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function scrollToChat() {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('chatInput').focus();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';

    // Add to history
    messageHistory.push({
        role: 'user',
        content: message
    });

    // Show loading indicator
    showLoadingIndicator();

    // Send to API or use local response
    getAIResponse(message).then(response => {
        removeLoadingIndicator();
        addMessageToChat(response, 'assistant');
        
        // Add to history
        messageHistory.push({
            role: 'assistant',
            content: response
        });

        // Save chat history
        saveChatHistory();
    }).catch(error => {
        removeLoadingIndicator();
        console.error('Error:', error);
        addMessageToChat(
            'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
            'assistant'
        );
    });
}

function addMessageToChat(message, role) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const messageP = document.createElement('p');
    messageP.textContent = message;

    messageDiv.appendChild(messageP);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoadingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant-message';
    loadingDiv.id = 'loading-indicator';

    const loadingP = document.createElement('p');
    loadingP.textContent = '⏳ Processando...';

    loadingDiv.appendChild(loadingP);
    chatMessages.appendChild(loadingDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}



async function getAIResponse(question) {
    // Opção 1: Se você tiver uma API real, descomente e configure
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                history: messageHistory
            })
        });

        if (!response.ok) {
            throw new Error('API Error');
        }

        const data = await response.json();
        return data.answer || 'Desculpe, não consegui processar sua pergunta.';
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
    */

    // Opção 2: Usar respostas locais baseadas em palavras-chave
    return getLocalResponse(question);
}

function getLocalResponse(question) {
    const lowerQuestion = question.toLowerCase();

    // Respostas sobre PIB
    if (lowerQuestion.includes('pib') || lowerQuestion.includes('produto interno bruto')) {
        if (lowerQuestion.includes('mato grosso') || lowerQuestion.includes('mt')) {
            return 'Mato Grosso tem um PIB de R$ 273 bilhões, sendo o 2º maior do Brasil. O estado apresenta crescimento esperado de 4,1% em 2025, com participação de 2,5% do PIB brasileiro.';
        } else if (lowerQuestion.includes('paraná') || lowerQuestion.includes('pr')) {
            return 'O Paraná possui um PIB de R$ 718,9 bilhões, sendo o 5º maior do Brasil. O estado apresentou crescimento de 63% nos últimos 6 anos, com economia diversificada em serviços, indústria e agricultura.';
        }
    }

    // Respostas sobre população
    if (lowerQuestion.includes('população') || lowerQuestion.includes('habitantes')) {
        if (lowerQuestion.includes('mato grosso') || lowerQuestion.includes('mt')) {
            return 'Mato Grosso tem uma população de aproximadamente 3,6 milhões de habitantes, com densidade demográfica baixa de cerca de 4 hab/km².';
        } else if (lowerQuestion.includes('paraná') || lowerQuestion.includes('pr')) {
            return 'O Paraná tem uma população de aproximadamente 11,4 milhões de habitantes, sendo o 5º estado mais populoso do Brasil, com densidade demográfica alta de cerca de 57 hab/km².';
        }
    }

    // Respostas sobre agricultura
    if (lowerQuestion.includes('agricultura') || lowerQuestion.includes('culturas') || lowerQuestion.includes('produção agrícola')) {
        if (lowerQuestion.includes('mato grosso') || lowerQuestion.includes('mt')) {
            return 'Mato Grosso é o maior produtor agrícola do Brasil, responsável por 15,4% da produção nacional. As principais culturas são soja, milho, algodão, café e cana-de-açúcar. O estado produz 30,3% dos grãos do Brasil.';
        } else if (lowerQuestion.includes('paraná') || lowerQuestion.includes('pr')) {
            return 'O Paraná é o 2º maior produtor de grãos do Brasil. As principais culturas são cana-de-açúcar (38,59 milhões de toneladas), soja (21,55 milhões), milho (17,88 milhões), além de trigo, feijão e café.';
        }
    }

    // Respostas sobre geografia
    if (lowerQuestion.includes('geografia') || lowerQuestion.includes('bioma') || lowerQuestion.includes('clima')) {
        if (lowerQuestion.includes('mato grosso') || lowerQuestion.includes('mt')) {
            return 'Mato Grosso possui três biomas principais: Amazônia (53,5%), Cerrado e Pantanal. O clima é tropical e subtropical, com verões entre 33-36°C. O Pantanal é a maior planície alagada do mundo.';
        } else if (lowerQuestion.includes('paraná') || lowerQuestion.includes('pr')) {
            return 'O Paraná é caracterizado principalmente pela Mata Atlântica, uma das mais ricas em biodiversidade do mundo. O clima é subtropical úmido com invernos bem definidos. O estado abriga as famosas Cataratas do Iguazu.';
        }
    }

    // Respostas sobre comparação
    if (lowerQuestion.includes('comparar') || lowerQuestion.includes('diferença') || lowerQuestion.includes('qual é maior')) {
        if ((lowerQuestion.includes('pib') || lowerQuestion.includes('economia')) && 
            (lowerQuestion.includes('mato grosso') && lowerQuestion.includes('paraná'))) {
            return 'O Paraná tem um PIB maior (R$ 718,9 bi vs R$ 273 bi), mas Mato Grosso é o maior produtor agrícola. Paraná tem economia mais diversificada, enquanto Mato Grosso é focado em agropecuária.';
        }
        if ((lowerQuestion.includes('população') || lowerQuestion.includes('habitantes')) && 
            (lowerQuestion.includes('mato grosso') && lowerQuestion.includes('paraná'))) {
            return 'O Paraná tem população muito maior (11,4 mi vs 3,6 mi). Apesar de ter área menor, o Paraná é mais densamente povoado (57 hab/km² vs 4 hab/km²).';
        }
    }

    // Resposta padrão
    return 'Desculpe, não tenho informações específicas sobre isso. Você pode fazer perguntas sobre economia, população, agricultura, geografia ou clima de Mato Grosso e Paraná.';
}

function saveChatHistory() {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            messageHistory = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
}

function clearChatHistory() {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.innerHTML = `
            <div class="message assistant-message">
                <p>Olá! Sou um assistente de IA especializado em informações sobre Mato Grosso e Paraná. Como posso ajudá-lo?</p>
            </div>
        `;
    }
}


function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Detectar preferência de tema do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Usuário prefere tema escuro
    // Você pode adicionar suporte a tema escuro aqui
}

// Monitorar mudanças de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Atualizar tema quando o sistema muda
});