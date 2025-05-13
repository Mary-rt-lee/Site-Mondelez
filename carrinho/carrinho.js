// Increment quantity
function incrementar(id) {
    const input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
    atualizarResumo();
    atualizarCarrinhoLocalStorage();
}

// Decrement quantity
function decrementar(id) {
    const input = document.getElementById(id);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        atualizarResumo();
        atualizarCarrinhoLocalStorage();
    }
}

// Update summary
function atualizarResumo() {
    let totalItens = 0;
    let totalPreco = 0;
    
    document.querySelectorAll('.cart-item-card').forEach(item => {
        const input = item.querySelector('input[type="number"]');
        const precoSpan = item.querySelector('.preco');
        
        if (input && precoSpan) {
            const precoUnitario = parseFloat(precoSpan.dataset.preco);
            const quantidade = parseInt(input.value);
            const precoTotalItem = precoUnitario * quantidade;
            
            precoSpan.textContent = precoTotalItem.toFixed(2).replace('.', ',');
            totalItens += quantidade;
            totalPreco += precoTotalItem;
        }
    });

    document.getElementById('totalItens').textContent = totalItens;
    document.getElementById('totalPreco').textContent = totalPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('totalFinal').textContent = totalPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    verificarCarrinhoVazio();
}

// Check if cart is empty
function verificarCarrinhoVazio() {
    const produtos = document.querySelectorAll('.cart-item-card');
    const carrinhoSection = document.querySelector('.cart-items-section');
    let mensagemVazio = document.getElementById('mensagem-vazio');

    if (produtos.length === 0) {
        if (!mensagemVazio) {
            mensagemVazio = document.createElement('div');
            mensagemVazio.id = 'mensagem-vazio';
            mensagemVazio.innerHTML = `
                <div class="vazio-conteudo">
                    <div class="emoji-vazio">😔</div>
                    <p class="texto-vazio">Seu carrinho está vazio<br>Que tal adicionar alguns produtos incríveis?</p>
                    <a href="../Comprar/Comprar.html" class="btn-continuar-comprando">Continuar Comprando</a>

                </div>
            `;
            carrinhoSection.appendChild(mensagemVazio);
        }
    } else {
        if (mensagemVazio) {
            mensagemVazio.remove();
        }
    }
}

// Remove item from cart
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = document.querySelectorAll('.cart-item-card')[index];
    
    item.classList.add('fade-out');
    setTimeout(() => {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        item.remove();
        atualizarResumo();
        verificarCarrinhoVazio();
    }, 500);
}

// Clear entire cart
function limparCarrinho() {
    document.querySelectorAll('.cart-item-card').forEach(item => {
        item.classList.add('fade-out');
        setTimeout(() => {
            item.remove();
        }, 500);
    });
    
    localStorage.removeItem('carrinho');
    atualizarResumo();
    verificarCarrinhoVazio();
}

function atualizarCarrinhoLocalStorage() {
    const carrinho = [];
    document.querySelectorAll('.cart-item-card').forEach((item, index) => {
        const nome = item.querySelector('.item-name strong').textContent;
        const imagem = item.querySelector('.product-image').src;
        const preco = parseFloat(item.querySelector('.preco').dataset.preco);
        const quantidade = parseInt(item.querySelector('input[type="number"]').value);
        
        carrinho.push({
            nome: nome,
            imagem: imagem,
            precoDesconto: preco,
            quantidade: quantidade
        });
    });
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarProduto(nome, preco, imagem) {
    const cartItems = document.querySelector('.cart-items-section');
    const produtosAtuais = document.querySelectorAll('.cart-item-card');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let produtoExistente = null;
    let produtoExistenteIndex = -1;
    
    produtosAtuais.forEach((produto, index) => {
        const nomeProduto = produto.querySelector('.item-name strong').textContent;
        if (nomeProduto === nome) {
            produtoExistente = produto;
            produtoExistenteIndex = index;
        }
    });

    if (produtoExistente) {
        const input = produtoExistente.querySelector('input[type="number"]');
        input.value = parseInt(input.value) + 1;
        
        if (produtoExistenteIndex !== -1 && carrinho[produtoExistenteIndex]) {
            carrinho[produtoExistenteIndex].quantidade = parseInt(input.value);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
    } else {
        const novoId = `quantidade${Date.now()}`;
        const precoNumerico = parseFloat(preco.replace(',', '.'));

        const card = document.createElement('div');
        card.className = 'cart-item-card fade-in';
        card.innerHTML = `
            <img src="${imagem}" alt="${nome}" class="product-image">
            <div class="item-details">
                <p class="item-name"><strong>${nome}</strong></p>
                <div class="item-actions">
                    <button class="btn-text" onclick="removerItem(${carrinho.length})">Excluir</button>
                    <a href="#" class="btn-text">Comprar agora</a>
                </div>
            </div>
            <div class="item-price-quantity">
                <p class="item-price">R$ <span class="preco" data-preco="${precoNumerico}">${precoNumerico.toFixed(2).replace('.', ',')}</span></p>
                <div class="quantity-controls">
                    <button class="btn-quantity" onclick="decrementar('${novoId}')">-</button>
                    <input type="number" id="${novoId}" value="1" min="1" onchange="atualizarResumo(); atualizarCarrinhoLocalStorage();">
                    <button class="btn-quantity" onclick="incrementar('${novoId}')">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(card);
        
        // Add to localStorage
        carrinho.push({
            nome: nome,
            imagem: imagem,
            precoDesconto: precoNumerico,
            quantidade: 1
        });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
    
    atualizarResumo();
}

function configurarAdicionarAoCarrinho() {
    document.querySelectorAll('.add-to-cart-btn, .botao-carrinho').forEach(botao => {
        botao.addEventListener('click', () => {
            const card = botao.closest('.recommendation-card');
            const nome = botao.getAttribute('data-name');
            const preco = botao.getAttribute('data-price');
            const imagem = card.querySelector('img').getAttribute('src');

            adicionarProduto(nome, preco, imagem);

            card.classList.add('fade-out');
            setTimeout(() => {
                card.remove();
            }, 500);
        });
    });
}

function configurarBotaoFinalizar() {
    const botaoFinalizar = document.querySelector('.btn-finalize');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', () => {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.");
                return; // cancela o redirecionamento
            }

            window.location.href = "../checkout_gp1/finalizacaodecompra.html";
        });
    }
}


function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartItemsSection = document.querySelector('.cart-items-section');
    const defaultItems = document.querySelectorAll('.cart-item-card');

    defaultItems.forEach(item => item.remove());

    if (carrinho.length === 0) {
        verificarCarrinhoVazio();
    } else {
        carrinho.forEach((produto, index) => {
            const produtoPadronizado = {
                nome: produto.nome || "Produto sem nome",
                imagem: produto.imagem || "Img/sem-imagem.jpg",
                precoDesconto: produto.precoDesconto || 0,
                quantidade: produto.quantidade || 1,
                ...produto
            };

            const novoId = `quantidade${index}`;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item-card';
            cartItem.innerHTML = `
                <img src="${produtoPadronizado.imagem}" alt="${produtoPadronizado.nome}" class="product-image">
                <div class="item-details">
                    <p class="item-name"><strong>${produtoPadronizado.nome}</strong></p>
                    <div class="item-actions">
                        <button class="btn-text" onclick="removerItem(${index})">Excluir</button>
                        <a href="../checkout_gp1/finalizacaodecompra.html" class="btn-text">Comprar agora</a>
                    </div>
                </div>
                <div class="item-price-quantity">
                    <p class="item-price">R$ <span class="preco" data-preco="${produtoPadronizado.precoDesconto}">${(produtoPadronizado.precoDesconto * produtoPadronizado.quantidade).toFixed(2).replace('.', ',')}</span></p>
                    <div class="quantity-controls">
                        <button class="btn-quantity" onclick="decrementar('${novoId}')">-</button>
                        <input type="number" id="${novoId}" value="${produtoPadronizado.quantidade}" min="1" onchange="atualizarResumo(); atualizarCarrinhoLocalStorage();">
                        <button class="btn-quantity" onclick="incrementar('${novoId}')">+</button>
                    </div>
                </div>
            `;
            cartItemsSection.appendChild(cartItem);
        });
        atualizarResumo();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
    configurarAdicionarAoCarrinho();
    configurarBotaoFinalizar();
    
    document.getElementById('limparCarrinho')?.addEventListener('click', limparCarrinho);
    document.getElementById('desmarcar-tudo')?.addEventListener('click', limparCarrinho);
});
