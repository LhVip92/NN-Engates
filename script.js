AOS.init({ duration: 800, once: true });

// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== Categorias (sem preços) =====
const categories = [
    { nome: 'Belina / Del Rey', icone: 'fa-car', produtos: ['Engate Fixo', 'Engate Removível', 'Gaveta'] },
    { nome: 'Fusca', icone: 'fa-car', produtos: ['Engate Fixo', 'Engate Esportivo'] },
    { nome: 'Bandeirante', icone: 'fa-car', produtos: ['Engate Fixo', 'Kit Elétrico'] },
    { nome: 'Toyota Hilux', icone: 'fa-truck', produtos: ['Engate Fixo', 'Gaveta com Regulagem', 'Proteção Para-choque'] },
    { nome: 'Toyota SW4', icone: 'fa-car', produtos: ['Engate Inox', 'Engate Ferro', 'Removível'] },
    { nome: 'Monza Tubarão', icone: 'fa-car', produtos: ['Engate Fixo', 'Engate Relíquia'] },
    { nome: 'Chevete', icone: 'fa-car', produtos: ['Engate Fixo', 'Engate Relíquia'] },
    { nome: 'Jipe (CAMBÃO)', icone: 'fa-truck', produtos: ['Cambão para Jipe', 'Engate Reforçado'] },
    { nome: 'Porsche', icone: 'fa-car', produtos: ['Engate Modelo Porsche', 'Removível'] },
    { nome: 'BMW', icone: 'fa-car', produtos: ['Engate Removível', 'Engate Fixo'] },
    { nome: 'Triton 2025', icone: 'fa-truck', produtos: ['Engate Fixo', 'Engate Removível'] },
    { nome: 'BYD (Elétrico)', icone: 'fa-car', produtos: ['Engate Removível', 'Engate Especial'] },
    { nome: 'Carroça', icone: 'fa-horse', produtos: ['Acessórios para Carroça', 'Engate Reboque'] },
    { nome: 'Carro Elétrico', icone: 'fa-car', produtos: ['Engate Removível', 'Kit Elétrico'] },
    { nome: 'RAM 2025', icone: 'fa-truck', produtos: ['Engate Fixo', 'Engate Removível'] },
    { nome: 'Creta 2025', icone: 'fa-car', produtos: ['Engate Fixo', 'Engate Removível'] },
    { nome: 'Estribo para Buggy', icone: 'fa-motorcycle', produtos: ['Estribo Simples', 'Estribo Reforçado'] },
];

// ===== Renderizar categorias =====
const grid = document.getElementById('categories-grid');
categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 50));
    card.innerHTML = `
        <i class="fas ${cat.icone}"></i>
        <h3>${cat.nome}</h3>
        <span>${cat.produtos.length} produtos</span>
    `;
    card.addEventListener('click', () => openModal(cat));
    grid.appendChild(card);
});

// ===== Modal =====
const modal = document.getElementById('category-modal');
const modalTitle = document.getElementById('modal-title');
const modalProducts = document.getElementById('modal-products');
const closeModalBtn = document.getElementById('close-modal');

function openModal(category) {
    modalTitle.textContent = category.nome;
    modalProducts.innerHTML = '';
    category.produtos.forEach(prod => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 border-b border-gray-100';
        li.innerHTML = `
            <span>${prod}</span>
            <span class="text-gray-400 text-sm">Consulte</span>
        `;
        modalProducts.appendChild(li);
    });
    const btn = document.createElement('div');
    btn.className = 'mt-6 text-center';
    btn.innerHTML = `
        <a href="https://wa.me/5585999874410?text=Olá!%20Gostaria%20de%20informações%20sobre%20engates%20para%20${encodeURIComponent(category.nome)}" 
           target="_blank" 
           class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition">
           <i class="fab fa-whatsapp mr-2"></i> Solicitar pelo WhatsApp
        </a>
    `;
    modalProducts.appendChild(btn);
    modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// ===== Destaques (sem preços) =====
const destaques = [
    { nome: 'Fusca - Engate Fixo', desc: 'Para Fusca, com registro INMETRO', img: 'img/produtos/reliquias/fusca.jpg' },
    { nome: 'Bandeirante - Kit Elétrico', desc: 'Ideal para Bandeirante, ajustável', img: 'img/produtos/reliquias/bandeirante.jpg' },
    { nome: 'Kombi - Engate Fixo', desc: 'Para Kombi, com registro INMETRO', img: 'img/produtos/reliquias/kombi.jpg' },
    { nome: 'Estribo para Buggy', desc: 'Resistente e durável, fabricado sob encomenda', img: 'img/produtos/estribos/estribo-aluminio.jpg' },
];

const destaqueGrid = document.getElementById('destaques-grid');
destaques.forEach((prod, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (i * 100));
    card.innerHTML = `
        <img src="${prod.img}" alt="${prod.nome}" class="w-full h-48 object-cover" />
        <div class="p-5">
            <h3 class="text-xl font-bold text-[#0A3D62]">${prod.nome}</h3>
            <p class="text-gray-600 text-sm mt-1">${prod.desc}</p>
            <a href="#contato" class="mt-3 inline-block bg-[#0A3D62] hover:bg-[#1E4D7B] text-white px-4 py-2 rounded-full text-sm transition">Consultar produto</a>
        </div>
    `;
    destaqueGrid.appendChild(card);
});

// ===== Formulário =====
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! Em breve entraremos em contato pelo WhatsApp.');
    this.reset();
});

// ===== Chat =====
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/chat'
    : 'https://api-nnengates.onrender.com/api/chat';

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
});
chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message-user p-3 max-w-[80%] text-sm';
    userMsg.textContent = message;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const typing = document.createElement('div');
    typing.className = 'chat-message-bot p-3 max-w-[80%] text-sm';
    typing.textContent = '...';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        const reply = data.reply || 'Desculpe, não consegui processar. Fale com um atendente pelo WhatsApp (85) 99987-4410.';
        typing.textContent = reply;
    } catch (error) {
        console.error('Erro no chat:', error);
        typing.textContent = 'Erro na conexão. Tente mais tarde ou fale pelo WhatsApp.';
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});