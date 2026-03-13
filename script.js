// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

let currentTab = 'soja';
let currentRating = 5;
let currentState = 'mt';

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // State buttons
    document.querySelectorAll('.state-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentState = this.dataset.state;
        });
    });

    // Star ratings
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating || Array.from(this.parentElement.children).indexOf(this) + 1;
            updateStarDisplay(rating);
        });
    });

    document.querySelectorAll('.rating').forEach(rating => {
        rating.addEventListener('mouseleave', function() {
            updateStarDisplay(currentRating);
        });
    });
}

function setRating(rating) {
    currentRating = rating;
    updateStarDisplay(rating);
}

function updateStarDisplay(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ============================================
// NAVEGAÇÃO
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function switchTab(tab) {
    currentTab = tab;
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update chart data based on tab
    updatePriceChart();
}

// ============================================
// GRÁFICOS
// ============================================

let priceChart, salaryChart, productionChart, mtPieChart, prPieChart;

function initCharts() {
    initPriceChart();
    initSalaryChart();
    initProductionChart();
    initPieCharts();
}

function initPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    const data = {
        soja: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [102.15, 104.80, 107.19],
            prPrices: [112.50, 114.30, 117.00]
        },
        milho: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [68.50, 70.20, 72.15],
            prPrices: [71.80, 73.50, 75.20]
        },
        trigo: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [85.30, 87.60, 89.50],
            prPrices: [88.90, 91.20, 93.80]
        },
        algodao: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [450.20, 465.80, 485.50],
            prPrices: [475.60, 492.30, 512.80]
        }
    };

    const currentData = data[currentTab];

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: currentData.labels,
            datasets: [
                {
                    label: 'Mato Grosso',
                    data: currentData.mtPrices,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Paraná',
                    data: currentData.prPrices,
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#f97316',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function updatePriceChart() {
    if (!priceChart) return;

    const data = {
        soja: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [102.15, 104.80, 107.19],
            prPrices: [112.50, 114.30, 117.00]
        },
        milho: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [68.50, 70.20, 72.15],
            prPrices: [71.80, 73.50, 75.20]
        },
        trigo: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [85.30, 87.60, 89.50],
            prPrices: [88.90, 91.20, 93.80]
        },
        algodao: {
            labels: ['Dez/2025', 'Jan/2026', 'Fev/2026'],
            mtPrices: [450.20, 465.80, 485.50],
            prPrices: [475.60, 492.30, 512.80]
        }
    };

    const currentData = data[currentTab];
    priceChart.data.labels = currentData.labels;
    priceChart.data.datasets[0].data = currentData.mtPrices;
    priceChart.data.datasets[1].data = currentData.prPrices;
    priceChart.update();
}

function initSalaryChart() {
    const ctx = document.getElementById('salaryChart');
    if (!ctx) return;

    salaryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Trabalhador Rural', 'Operador de Máquinas', 'Técnico Agrícola'],
            datasets: [
                {
                    label: 'Mato Grosso',
                    data: [2473, 3200, 3500],
                    backgroundColor: '#3b82f6',
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Paraná',
                    data: [3428, 3800, 4200],
                    backgroundColor: '#f97316',
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function initProductionChart() {
    const ctx = document.getElementById('productionChart');
    if (!ctx) return;

    productionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Soja', 'Milho', 'Trigo', 'Algodão'],
            datasets: [
                {
                    label: 'Mato Grosso',
                    data: [42.5, 3.8, 0.8, 1.4],
                    backgroundColor: '#3b82f6',
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Paraná',
                    data: [18.2, 2.1, 1.2, 0.8],
                    backgroundColor: '#f97316',
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: function(value) {
                            return value + 'M ton';
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function initPieCharts() {
    // MT Pie Chart
    const mtCtx = document.getElementById('mtPieChart');
    if (mtCtx) {
        mtPieChart = new Chart(mtCtx, {
            type: 'doughnut',
            data: {
                labels: ['Soja', 'Milho', 'Trigo', 'Algodão'],
                datasets: [{
                    data: [42.5, 3.8, 0.8, 1.4],
                    backgroundColor: ['#3b82f6', '#f97316', '#8b5cf6', '#ec4899'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11 },
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // PR Pie Chart
    const prCtx = document.getElementById('prPieChart');
    if (prCtx) {
        prPieChart = new Chart(prCtx, {
            type: 'doughnut',
            data: {
                labels: ['Soja', 'Milho', 'Trigo', 'Algodão'],
                datasets: [{
                    data: [18.2, 2.1, 1.2, 0.8],
                    backgroundColor: ['#3b82f6', '#f97316', '#8b5cf6', '#ec4899'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11 },
                            padding: 15
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// COMENTÁRIOS
// ============================================

function submitComment() {
    const textarea = document.querySelector('.comment-input');
    const content = textarea.value.trim();

    if (!content) {
        alert('Por favor, escreva um comentário');
        return;
    }

    // Create new comment element
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <div class="comment-header">
            <p class="comment-author">Você</p>
            <div class="comment-meta">
                <span class="badge badge-${currentState}">${
                    currentState === 'mt' ? 'Mato Grosso' : 
                    currentState === 'pr' ? 'Paraná' : 'Geral'
                }</span>
                <span class="comment-date">Agora</span>
            </div>
        </div>
        <div class="comment-rating">${'★'.repeat(currentRating)}</div>
        <p class="comment-text">${escapeHtml(content)}</p>
    `;

    // Insert at the beginning of comments list
    const commentsList = document.querySelector('.comments-list');
    commentsList.insertBefore(comment, commentsList.firstChild);

    // Clear form
    textarea.value = '';
    currentRating = 5;
    updateStarDisplay(5);

    // Show success message
    alert('Comentário adicionado com sucesso!');
}

// ============================================
// ASSISTENTE IA
// ============================================

function askAI() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();

    if (!message) {
        alert('Por favor, escreva uma pergunta');
        return;
    }

    // Simulate AI response
    const responses = {
        'preço': 'O preço da soja em Mato Grosso é R$ 107,19 por saca, enquanto no Paraná é R$ 117,00. O Paraná tem preços ligeiramente mais altos, mas ambos os estados seguem a mesma tendência de alta.',
        'produção': 'Mato Grosso produz 48,5 milhões de toneladas na safra 2025/26, enquanto o Paraná produz 22,3 milhões. MT produz 2.17x mais que o Paraná, principalmente em soja e milho.',
        'salário': 'O salário médio de um trabalhador rural em Mato Grosso é R$ 2.473, enquanto no Paraná é R$ 3.428. O Paraná oferece 38,6% mais de remuneração média.',
        'default': 'Obrigado pela pergunta! Estou aqui para ajudar com informações sobre dados agrícolas, preços de commodities, produção e salários entre Mato Grosso e Paraná. Qual é sua dúvida específica?'
    };

    let response = responses.default;
    
    const messageLower = message.toLowerCase();
    if (messageLower.includes('preço') || messageLower.includes('soja') || messageLower.includes('milho')) {
        response = responses.preço;
    } else if (messageLower.includes('produção') || messageLower.includes('tonelada')) {
        response = responses.produção;
    } else if (messageLower.includes('salário') || messageLower.includes('remuneração')) {
        response = responses.salário;
    }

    // Display response
    const responseDiv = document.getElementById('aiResponse');
    responseDiv.textContent = response;
    responseDiv.style.display = 'block';

    // Clear input
    input.value = '';

    // Scroll to response
    responseDiv.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// UTILIDADES
// ============================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
