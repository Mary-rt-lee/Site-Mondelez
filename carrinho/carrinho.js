function incrementar(id) {
    let input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
    atualizarResumo();
}

function decrementar(id) {
    let input = document.getElementById(id);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        atualizarResumo();
    }
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    location.reload();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    location.reload();
}

function atualizarResumo() {
    let totalItens = 0;
    let totalPreco = 0;
    const itens = document.querySelectorAll(".cart-item-card");
    
    itens.forEach((item) => {
        let input = item.querySelector("input[type='number']");
        let precoSpan = item.querySelector(".preco");
        if (input && precoSpan) {
            let quantidade = parseInt(input.value);
            let precoUnitario = parseFloat(precoSpan.dataset.preco);
            totalItens += quantidade;
            totalPreco += quantidade * precoUnitario;
        }
    });
    
    document.getElementById("totalItens").textContent = totalItens;
    document.getElementById("totalPreco").textContent = totalPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById("totalFinal").textContent = totalPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

document.addEventListener('DOMContentLoaded', function() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartItemsSection = document.querySelector('.cart-items-section');
    const cartHeader = document.querySelector('.cart-header');
    
    document.getElementById('limparCarrinho').addEventListener('click', limparCarrinho);

    const defaultItems = document.querySelectorAll('.cart-item-card');
    defaultItems.forEach(item => item.remove());

    if (carrinho.length === 0) {
        const emptyCart = document.createElement('div');
        emptyCart.classList.add('empty-cart');
        emptyCart.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartItemsSection.insertBefore(emptyCart, cartHeader.nextSibling);
    } else {
        carrinho.forEach((produto, index) => {
            const produtoPadronizado = {
                nome: produto.nome || "Produto sem nome",
                imagem: produto.imagem || "Img/sem-imagem.jpg",
                precoDesconto: produto.precoDesconto || 0,
                ...produto
            };

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item-card');
            cartItem.innerHTML = `
                <img src="${produtoPadronizado.imagem}" alt="${produtoPadronizado.nome}" class="product-image">
                <div class="item-details">
                    <p class="item-name"><strong>${produtoPadronizado.nome}</strong></p>
                    <div class="item-actions">
                        <button class="btn-text" onclick="removerItem(${index})">Excluir</button>
                        <button class="btn-text">Salvar</button>
                        <a href="#" class="btn-text">Comprar agora</a>
                    </div>
                </div>
                <div class="item-price-quantity">
                    <p class="item-price">R$ <span class="preco" data-preco="${produtoPadronizado.precoDesconto}">${produtoPadronizado.precoDesconto.toFixed(2).replace('.', ',')}</span></p>
                    <div class="quantity-controls">
                        <button class="btn-quantity" onclick="decrementar('quantidade${index}')">-</button>
                        <input type="number" id="quantidade${index}" value="1" min="1" onchange="atualizarResumo()">
                        <button class="btn-quantity" onclick="incrementar('quantidade${index}')">+</button>
                    </div>
                </div>
            `;
            cartItemsSection.appendChild(cartItem);
        });
        atualizarResumo();
    }
});
