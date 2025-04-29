// Incrementa quantidade
function incrementar(id) {
    const input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
    atualizarResumo();
}

// Decrementa quantidade
function decrementar(id) {
    const input = document.getElementById(id);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        atualizarResumo();
    }
}

// Atualiza o resumo
function atualizarResumo() {
    let totalItens = 0;
    let totalPreco = 0;
    document.querySelectorAll('.cart-item-card').forEach(item => {
        const input = item.querySelector('input[type="number"]');
        const precoSpan = item.querySelector('.preco');
        const precoUnitario = parseFloat(precoSpan.dataset.preco);
        const quantidade = parseInt(input.value);

        const precoTotalItem = precoUnitario * quantidade;
        precoSpan.textContent = precoTotalItem.toFixed(2).replace('.', ',');

        totalItens += quantidade;
        totalPreco += precoTotalItem;
    });

    document.getElementById('totalItens').textContent = totalItens;
    document.getElementById('totalPreco').textContent = totalPreco.toFixed(2).replace('.', ',');
    document.getElementById('totalFinal').textContent = totalPreco.toFixed(2).replace('.', ',');

    verificarCarrinhoVazio(); // <- Adicionado aqui
}

// Verifica se o carrinho está vazio
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
                    <a href="Loja" class="btn-continuar-comprando">Continuar Comprando</a>
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
// Configura os botões de excluir
function configurarBotoesExcluir() {
    document.querySelectorAll('.btn-text').forEach(botao => {
        if (botao.textContent.trim() === 'Excluir') {
            botao.onclick = () => {
                const item = botao.closest('.cart-item-card');
                item.classList.add('fade-out');
                setTimeout(() => {
                    item.remove();
                    atualizarResumo();
                    verificarCarrinhoVazio(); // <- Colocado aqui
                }, 500); // Atraso para dar tempo da animação acontecer
            };
        }
    });
}


// Configura os botões de salvar
function configurarBotoesSalvar() {
    document.querySelectorAll('.btn-text').forEach(botao => {
        if (botao.textContent.trim() === 'Salvar') {
            botao.onclick = () => {
                alert('Produto salvo nos favoritos!');
            };
        }
    });
}

// Função para adicionar produto
function adicionarProduto(nome, preco, imagem) {
    const cartItems = document.querySelector('.cart-items-section');
    const produtosAtuais = document.querySelectorAll('.cart-item-card');

    // Verifica se já existe o produto no carrinho
    let produtoExistente = null;
    produtosAtuais.forEach(produto => {
        const nomeProduto = produto.querySelector('.item-name strong').textContent;
        if (nomeProduto === nome) {
            produtoExistente = produto;
        }
    });

    if (produtoExistente) {
        // Se já existir, apenas aumenta a quantidade
        const input = produtoExistente.querySelector('input[type="number"]');
        input.value = parseInt(input.value) + 1;
        atualizarResumo();
    } else {
        // Se não existir, cria um novo card
        const novoId = `quantidade${Date.now()}`;

        const card = document.createElement('div');
        card.className = 'cart-item-card fade-in';
        card.innerHTML = `
            <img src="${imagem}" alt="${nome}" class="product-image">
            <div class="item-details">
                <p class="item-name"><strong>${nome}</strong></p>
                <div class="item-actions">
                    <button class="btn-text">Excluir</button>
                    <button class="btn-text">Salvar</button>
                    <a href="#" class="btn-text">Comprar agora</a>
                </div>
            </div>
            <div class="item-price-quantity">
                <p class="item-price">R$ <span class="preco" data-preco="${parseFloat(preco.replace(',', '.'))}">${preco}</span></p>
                <div class="quantity-controls">
                    <button class="btn-quantity" onclick="decrementar('${novoId}')">-</button>
                    <input type="number" id="${novoId}" value="1" min="1" onchange="atualizarResumo()">
                    <button class="btn-quantity" onclick="incrementar('${novoId}')">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(card);
        configurarBotoesExcluir();
        configurarBotoesSalvar();
        atualizarResumo();
    }
}

// Botões de "Adicionar ao Carrinho"
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
            }, 500); // Deixa a animação aparecer
        });
    });
}


// Botão "Finalizar Compra"
function configurarBotaoFinalizar() {
    const botaoFinalizar = document.querySelector('.btn-finalize');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', () => {
            alert('Compra finalizada com sucesso!');
            location.reload();
        });
    }
}

// Botão "Desmarcar Todos"
function configurarBotaoDesmarcarTudo() {
    const botaoDesmarcar = document.getElementById('desmarcar-tudo');
    if (botaoDesmarcar) {
        botaoDesmarcar.addEventListener('click', () => {
            document.querySelectorAll('.cart-item-card').forEach(item => {
                item.classList.add('fade-out');
                setTimeout(() => {
                    item.remove();
                    atualizarResumo();
                    verificarCarrinhoVazio(); // <- Também aqui
                }, 500); // Tempo da animação
            });
        });
    }
}


// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    configurarBotoesExcluir();
    configurarBotoesSalvar();
    configurarAdicionarAoCarrinho();
    configurarBotaoFinalizar();
    configurarBotaoDesmarcarTudo();
    atualizarResumo();
});
