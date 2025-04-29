//produtos
const produtos = [
    {
        nome: "Lacta Chocolate bombom caixa favoritos - 250 G.",
        imagem: "Img/Lacta Chocolate bombom.jpg",
        precoOriginal: 30.60,
        precoDesconto: 18.36,
        desconto: "40% OFF",
        estrelas: 5,
        marca: "Lacta",
        tipo: "Bombom",
        sabores: ["leite", "avelã"]
    },
    {
        nome: "Chocolate Stick Sonho De Valsa Caixa C/15unx25g.",
        imagem: "Img/Chocolate Stick Sonho De Valsa.jpg",
        precoOriginal: 62.49,
        precoDesconto: 49.99,
        desconto: "20% OFF",
        estrelas: 4.5,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["leite"]
    },
    {
        nome: "Display Mini Oreo Chocolate C/Baunilha 10unx35g",
        imagem: "Img/Display Mini Oreo Chocolate.jpg",
        precoOriginal: 27.49,
        precoDesconto: 24.74,
        desconto: "10% OFF",
        estrelas: 4,
        marca: "Oreo",
        tipo: "Biscoito",
        sabores: ["baunilha"]
    },
    {
        nome: "Chocolate Lacta Intense Amargo 70% Cacau 85g",
        imagem: "Img/Chocolate Lacta Intense Amargo.jpg",
        precoOriginal: 15.37,
        precoDesconto: 9.99,
        desconto: "35% OFF",
        estrelas: 3.5,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["amargo"]
    },
    {
        nome: "Ovo de Páscoa Lacta Favoritos 560g",
        imagem: "Img/OVO-LACTA-FAVORITOS-560G.jpg",
        precoOriginal: 98.31,
        precoDesconto: 85.49,
        desconto: "15% OFF",
        estrelas: 3,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["leite", "avelã"]
    },
    {
        nome: "Lacta - Chocolate Bis ao leite, 126g",
        imagem: "Img/Bis.jpg",
        precoOriginal: 16.90,
        precoDesconto: 13.00,
        desconto: "30% OFF",
        estrelas: 4.5,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["leite"]
    },
    {
        nome: "Chocolate Sonho de Valsa Pacote 1Kg",
        imagem: "Img/Chocolate Sonho de Valsa Pacote 1Kg.jpg",
        precoOriginal: 75.90,
        precoDesconto: 69.00,
        desconto: "10% OFF",
        estrelas: 4,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["leite"]
    },
    {
        nome: "Chocolate Ouro Branco Pacote 1Kg",
        imagem: "Img/Chocolate Ouro Branco Pacote 1Kg.jpg",
        precoOriginal: 59.88,
        precoDesconto: 49.90,
        desconto: "20% OFF",
        estrelas: 4.5,
        marca: "Lacta",
        tipo: "Chocolate",
        sabores: ["branco"]
    }
];

// Variáveis do carrossel
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);
    
    document.getElementById('marca').addEventListener('change', filtrarProdutos);
    document.getElementById('tipo').addEventListener('change', filtrarProdutos);
    document.getElementById('sabor').addEventListener('change', filtrarProdutos);
    
    document.getElementById('prevBtn').addEventListener('click', () => moveCarousel(-1));
    document.getElementById('nextBtn').addEventListener('click', () => moveCarousel(1));
    
    setInterval(() => {
        moveCarousel(1);
    }, 3000);
});

//filtrar produtos
function filtrarProdutos() {
    const marcaSelecionada = document.getElementById('marca').value;
    const tipoSelecionado = document.getElementById('tipo').value;
    const saborSelecionado = document.getElementById('sabor').value;
    
    const produtosFiltrados = produtos.filter(produto => {
        const marcaMatch = marcaSelecionada === "todos" || produto.marca === marcaSelecionada;
        const tipoMatch = tipoSelecionado === "todos" || produto.tipo === tipoSelecionado;
        const saborMatch = saborSelecionado === "todos" || produto.sabores.includes(saborSelecionado);
        
        return marcaMatch && tipoMatch && saborMatch;
    });
    
    renderizarProdutos(produtosFiltrados);
}

//renderizar produtos
function renderizarProdutos(produtosParaRenderizar) {
    const container = document.querySelector('.product-container');
    container.innerHTML = '';
    
    if (produtosParaRenderizar.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum produto encontrado com os filtros selecionados.</p>';
        return;
    }
    
    produtosParaRenderizar.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="discount-badge">${produto.desconto}</div>
            <img src="${produto.imagem}" alt="${produto.nome}">
            <label><strong>(${produto.marca})</strong></label>
            <h3>${produto.nome}</h3>
            <p>${'★'.repeat(Math.floor(produto.estrelas))}${'☆'.repeat(5 - Math.floor(produto.estrelas))}</p>
            <p style="text-decoration: line-through;">R$${produto.precoOriginal.toFixed(2)}</p>
            <p>R$${produto.precoDesconto.toFixed(2)}</p>
            <div>
                <button onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')})">
                    <span>Carrinho</span> <i class="fa fa-shopping-cart"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

//adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (typeof produto === 'string') {
        produto = JSON.parse(produto.replace(/&quot;/g, '"'));
    }
    
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    mostrarNotificacao(`${produto.nome} foi adicionado ao carrinho!`);
}

//notificação
function mostrarNotificacao(mensagem) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#6049a6';
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.innerHTML = mensagem;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

//carrossel
function moveCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalItems - 1; 
    } else if (currentIndex >= totalItems) {
        currentIndex = 0; 
    }
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const carouselImages = document.querySelector('.carousel-images');
    const newTransformValue = -currentIndex * 100; 
    carouselImages.style.transform = `translateX(${newTransformValue}%)`;
}
