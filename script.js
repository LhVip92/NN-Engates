/* ===== Inicialização AOS (com proteção) ===== */
if (window.AOS) {
    AOS.init({
        duration: 800,
        once: true
    });
}

/* ===== Menu mobile ===== */
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* ===== Categorias (sem preços) ===== */
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

const grid = document.getElementById('categories-grid');
categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 50));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Ver produtos para ' + cat.nome);
    card.innerHTML = `
        <i class="fas ${cat.icone}" aria-hidden="true"></i>
        <h3>${cat.nome}</h3>
        <span>${cat.produtos.length} produtos</span>
    `;
    card.addEventListener('click', () => openModal(cat));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(cat);
        }
    });
    grid.appendChild(card);
});

/* ===== Modal (com gerenciamento de foco) ===== */
const modal = document.getElementById('category-modal');
const modalTitle = document.getElementById('modal-title');
const modalProducts = document.getElementById('modal-products');
const closeModalBtn = document.getElementById('close-modal');

let lastFocusedElement = null;

function openModal(category) {
    lastFocusedElement = document.activeElement;

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
    const msg = `Olá! Vim pelo site da N&N Engates e gostaria de informações sobre engates para ${category.nome}. Meu veículo é:`;
    btn.innerHTML = `
        <a href="https://wa.me/5585999874410?text=${encodeURIComponent(msg)}"
           target="_blank"
           rel="noopener noreferrer"
           class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition">
           <i class="fab fa-whatsapp mr-2" aria-hidden="true"></i> Solicitar pelo WhatsApp
        </a>
    `;
    modalProducts.appendChild(btn);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    closeModalBtn.focus();
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

/* ===== Destaques (sem preços) ===== */
const destaques = [
    { nome: 'Fusca - Engate Fixo', desc: 'Para Fusca, com registro INMETRO', img: 'img/produtos/reliquias/fusca.jpg' },
    { nome: 'Bandeirante - Kit Elétrico', desc: 'Ideal para Bandeirante, ajustável', img: 'img/produtos/reliquias/bandeirante.jpg' },
    { nome: 'Kombi - Engate Fixo', desc: 'Para Kombi, com registro INMETRO', img: 'img/produtos/reliquias/kombi.jpg' },
    { nome: 'Estribo para Buggy', desc: 'Resistente e durável, fabricado sob encomenda', img: 'img/produtos/estribos/estribo-aluminio.jpg' },
];

const destaqueGrid = document.getElementById('destaques-grid');
destaques.forEach((prod, i) => {
    const msg = `Olá! Vim pelo site da N&N Engates e gostaria de consultar o produto: ${prod.nome}. Meu veículo é:`;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (i * 100));
    card.innerHTML = `
        <div class="w-full h-48 bg-gray-100 overflow-hidden">
            <img src="${prod.img}" alt="${prod.nome}" class="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
        </div>
        <div class="p-5">
            <h3 class="text-xl font-bold text-[#0A3D62]">${prod.nome}</h3>
            <p class="text-gray-600 text-sm mt-1">${prod.desc}</p>
            <a href="https://wa.me/5585999874410?text=${encodeURIComponent(msg)}"
               target="_blank"
               rel="noopener noreferrer"
               class="mt-3 inline-block bg-[#0A3D62] hover:bg-[#1E4D7B] text-white px-4 py-2 rounded-full text-sm transition">Consultar produto</a>
        </div>
    `;
    destaqueGrid.appendChild(card);
});

/* ===== Formulário de contato → WhatsApp ===== */
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const nome = document.getElementById('contact-name').value.trim();
    const telefone = document.getElementById('contact-phone').value.trim();
    const veiculo = document.getElementById('contact-vehicle').value.trim();
    const mensagem = document.getElementById('contact-message').value.trim();

    if (!nome || !telefone) {
        alert('Por favor, preencha nome e WhatsApp.');
        return;
    }

    const texto = `Olá! Vim pelo site da N&N Engates.

Nome: ${nome}
WhatsApp: ${telefone}
Veículo / Modelo / Ano: ${veiculo || 'Não informado'}
Necessidade: ${mensagem || 'Não informada'}

Gostaria de solicitar um orçamento.`;

    const url = 'https://wa.me/5585999874410?text=' + encodeURIComponent(texto);

    const whatsappLink = document.createElement('a');
    whatsappLink.href = url;
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    document.body.appendChild(whatsappLink);
    whatsappLink.click();
    whatsappLink.remove();

    contactForm.reset();
});

/* ===== Chat ===== */
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/api/chat'
    : 'https://nn-engates.onrender.com/api/chat';

let chatLoading = false;

function openChat() {
    chatBox.classList.add('active');
    chatBox.setAttribute('aria-hidden', 'false');
    chatToggle.setAttribute('aria-expanded', 'true');
}
function closeChat() {
    chatBox.classList.remove('active');
    chatBox.setAttribute('aria-hidden', 'true');
    chatToggle.setAttribute('aria-expanded', 'false');
}

chatToggle.addEventListener('click', () => {
    if (chatBox.classList.contains('active')) closeChat();
    else openChat();
});
chatClose.addEventListener('click', closeChat);

function appendMessage(text, role) {
    const div = document.createElement('div');
    div.className = (role === 'user' ? 'chat-message-user' : 'chat-message-bot') + ' p-3 max-w-[80%] text-sm';
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

async function sendMessage() {
    if (chatLoading) return;
    const message = chatInput.value.trim();
    if (!message) return;
    if (message.length > 500) {
        appendMessage('Sua mensagem é muito longa. Por favor, reduza para até 500 caracteres.', 'bot');
        return;
    }

    chatLoading = true;
    chatSend.disabled = true;
    chatSend.classList.add('opacity-50', 'cursor-not-allowed');

    appendMessage(message, 'user');
    chatInput.value = '';

    const typing = appendMessage('...', 'bot');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Falha na resposta do servidor');
        }

        const data = await response.json();
        const reply = (data && data.reply) ? data.reply : 'Desculpe, não consegui processar sua mensagem. Fale com um atendente pelo WhatsApp (85) 99987-4410.';
        typing.textContent = reply;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            typing.textContent = 'O servidor demorou para responder. Tente novamente ou fale pelo WhatsApp (85) 99987-4410.';
        } else {
            typing.textContent = 'Não consegui responder agora. Fale com a equipe pelo WhatsApp (85) 99987-4410.';
        }
    } finally {
        chatLoading = false;
        chatSend.disabled = false;
        chatSend.classList.remove('opacity-50', 'cursor-not-allowed');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

/* ===== Escape fecha menu, modal e chat ===== */
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (mobileMenu.classList.contains('open')) closeMenu();
    if (!modal.classList.contains('hidden')) closeModal();
    if (chatBox.classList.contains('active')) closeChat();
});