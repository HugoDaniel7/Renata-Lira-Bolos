// Função para redirecionar para o facebook
function redirecionarParaPagina1() {
    // Redireciona para outra página
    window.open("https://www.facebook.com/", "_blank");
}

// Função para redirecionar para o tiktok
function redirecionarParaPagina2() {
    // Redireciona para outra página
    window.open("https://www.tiktok.com/", "_blank");
}

// Função para redirecionar para o linkedin
function redirecionarParaPagina3() {
    // Redireciona para outra página
    window.open("https://www.whatsapp.com/", "_blank");
}

// Função para redirecionar para o whatsapp
function redirecionarParaPagina4() {
    // Redireciona para outra página
    window.open("https://www.instagram.com/", "_blank");
}

// Função para redirecionar para o instagram
function redirecionarParaPagina5() {
    // Redireciona para outra página
    window.open("https://www.google.com/maps?authuser=0", "_blank");
}

// Função para redirecionar para o linkedin
function redirecionarParaPagina6() {
    // Redireciona para outra página
    window.open("https://www.linkedin.com/in/fabioguimaraes1/", "_blank");
}





// Função para abrir o modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
    document.body.classList.add("modal-open");
}

// Função para fechar o modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.classList.remove("modal-open");
}





// Função para abrir o modal de carrinho
function openModal1(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.classList.add('modal-open');  // Impede o scroll do corpo
}

// Função para fechar o modal de carrinho
function closeModal1(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.classList.remove('modal-open');  // Restaura o scroll do corpo
}

// Fecha o Modal de lanches ao clicar carrinho
window.onclick = function(event) {
    const modal = document.getElementById('modal1');
    if (event.target === modal) {
        closeModal('modal'); // Fecha o modal ao clicar fora dele
    }
}




// Função para adicionar ao carrinho
function addToCart(productName, productPrice, modalId) {
    // Captura a quantidade (se existir no modal)
    const quantidadeInput = document.querySelector(`#${modalId} input[type="number"]`);
    const quantidade = quantidadeInput ? parseInt(quantidadeInput.value) || 1 : 1;
    
    // Calcula o total considerando a quantidade
    const total = productPrice * quantidade;

    // Captura o recheio selecionado (se existir)
    const recheio = document.querySelector(`#${modalId} input[name="recheio"]:checked`)?.value;

    // Captura a descrição/tema (se existir)
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // Criação do item no carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Monta o conteúdo do item no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${productName} ${quantidade > 1 ? `(x${quantidade})` : ''}</span>
        ${recheio ? `<br> Recheio: ${recheio}` : ''}
        ${description ? `<br> Tema: ${description}` : ''}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona ao carrinho
    cartItemsContainer.appendChild(item);

    // Armazena os dados do item
    if (!window.cartItems) {
        window.cartItems = [];
    }
    
    window.cartItems.push({
        productName,
        productPrice,
        quantidade,
        recheio,
        description,
        total
    });

    // Atualiza o total do carrinho
    updateCartTotal();

    // Fecha o modal
    closeModal(modalId);
}



// Função para atualizar o total do carrinho
function updateCartTotal() {
    let total = 0;
    
    // Soma todos os itens do carrinho
    if (window.cartItems && window.cartItems.length > 0) {
        total = window.cartItems.reduce((sum, item) => sum + item.total, 0);
    }

    // Atualiza o display
    document.getElementById("cart-total").textContent = `Total Do Pedido: R$ ${total.toFixed(2)}`;
}

function removeFromCart(element) {
    const item = element.parentElement;
    const itemIndex = Array.from(item.parentElement.children).indexOf(item);
    
    // Remove do array cartItems
    if (window.cartItems && window.cartItems.length > itemIndex) {
        window.cartItems.splice(itemIndex, 1);
    }
    
    // Remove do DOM
    item.remove();
    
    // Atualiza o total
    updateCartTotal();
}




// Função para limpar os campos de entrada do modal após adicionar um item
function resetModalFields() {
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
}



// Função para finalizar a compra e enviar para o WhatsApp
// Função para finalizar a compra e enviar para o WhatsApp
function finalizePurchase() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("celular").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!name || !phone || !address) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Verifica se há itens no carrinho
    if (!window.cartItems || window.cartItems.length === 0) {
        alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
        return;
    }

    // Número da Renata Lira Bolos (fixo)
    const renataPhone = "5521980882615";

    // Criação da mensagem formatada
    let message = "*PEDIDO RENATA LIRA BOLOS* \n\n";
    message += `*Data:* ${new Date().toLocaleString()}\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Telefone:* ${phone}\n`;
    message += `*Endereço:* ${address}\n`;
    message += `*Pagamento:* ${payment}\n\n`;
    message += "--------------------------------\n";
    message += "*ITENS DO PEDIDO:*\n\n";

    // Adiciona os itens do carrinho
    let total = 0;
    window.cartItems.forEach((item, index) => {
        message += `*${index + 1}. ${item.productName}*\n`;
        if (item.quantidade > 1) message += `🔢 Quantidade: ${item.quantidade}\n`;
        if (item.recheio) message += `Recheio: ${item.recheio}\n`;
        if (item.description) message += `Tema/Detalhes: ${item.description}\n`;
        message += `Valor: R$ ${item.total.toFixed(2)}\n\n`;
        total += item.total;
    });

    message += "--------------------------------\n";
    message += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n\n`;
    message += "Muito obrigado pelo pedido! \n";
    message += "Seu pedido será preparado com todo carinho!\n";
    message += "Qualquer dúvida, estamos à disposição! ";

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${renataPhone}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpa o carrinho
    document.getElementById("cart-items1").innerHTML = "";
    document.getElementById("cart-total").textContent = "Total Do Pedido: R$ 0.00";
    document.getElementById("name").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("address").value = "";
    window.cartItems = [];
}




// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button1").addEventListener("click", function() {
    const productName = "Bolo 15 fatias";
    const productPrice = 110.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button2").addEventListener("click", function() {
    const productName = "Bolo 20 fatias";
    const productPrice = 150.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button3").addEventListener("click", function() {
    const productName = "Bolo 30 fatias";
    const productPrice = 170.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button4").addEventListener("click", function() {
    const productName = "Combo Love Cheddar Bacon";
    const productPrice = 99.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button5").addEventListener("click", function() {
    const productName = "Bolo 40 fatias";
    const productPrice = 190.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button6").addEventListener("click", function() {
    const productName = "Bolo 50 fatias";
    const productPrice = 210.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button7").addEventListener("click", function() {
    const productName = "Bolo 70 fatias";
    const productPrice = 280.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button8").addEventListener("click", function() {
    const productName = "Docinhos Tradicionais";
    const productPrice = 100.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button9").addEventListener("click", function() {
    const productName = "Docinhos Gourmet";
    const productPrice = 130.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button10").addEventListener("click", function() {
    const productName = "Algodão";
    const productPrice = 2.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button11").addEventListener("click", function() {
    const productName = "Maça Do Amor";
    const productPrice = 2.50;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button12").addEventListener("click", function() {
    const productName = "Pirulito";
    const productPrice = 3.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button13").addEventListener("click", function() {
    const productName = "Pipoca";
    const productPrice = 3.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button14").addEventListener("click", function() {
    const productName = "Cupcake De Chantilly";
    const productPrice = 5.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button15").addEventListener("click", function() {
    const productName = "Donuts";
    const productPrice = 1.50;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button16").addEventListener("click", function() {
    const productName = "Donuts";
    const productPrice = 1.50;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button17").addEventListener("click", function() {
    const productName = "Pirulito de Pasta Americana";
    const productPrice = 5.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button18").addEventListener("click", function() {
    const productName = "Cupcake";
    const productPrice = 8.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button19").addEventListener("click", function() {
    const productName = "Bolo no palito (papel)";
    const productPrice = 8.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button20").addEventListener("click", function() {
    const productName = "Bolo do palito Pasta americana (simples)";
    const productPrice = 10.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button21").addEventListener("click", function() {
    const productName = "Bolo no palito pasta americana (personagens)";
    const productPrice = 12.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button22").addEventListener("click", function() {
    const productName = "Cone trufado";
    const productPrice = 10.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button23").addEventListener("click", function() {
    const productName = "Trufa";
    const productPrice = 4.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button24").addEventListener("click", function() {
    const productName = "Alfajor";
    const productPrice = 5.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button25").addEventListener("click", function() {
    const productName = "Chocomaça";
    const productPrice = 12.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button26").addEventListener("click", function() {
    const productName = "Verrines";
    const productPrice = 6.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button27").addEventListener("click", function() {
    const productName = "Taça luxuosa";
    const productPrice = 12.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button28").addEventListener("click", function() {
    const productName = "Kit mêsversario luxo";
    const productPrice = 200.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button29").addEventListener("click", function() {
    const productName = "Kit festa Premium";
    const productPrice = 290.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button30").addEventListener("click", function() {
    const productName = "Kit doces luxo";
    const productPrice = 490.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button31").addEventListener("click", function() {
    const productName = "Kit 1";
    const productPrice = 100.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button32").addEventListener("click", function() {
    const productName = "Kit 2";
    const productPrice = 120.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button33").addEventListener("click", function() {
    const productName = "Kit 3";
    const productPrice = 140.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button34").addEventListener("click", function() {
    const productName = "Kit 4";
    const productPrice = 160.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button35").addEventListener("click", function() {
    const productName = "Kit 5";
    const productPrice = 180.00;
    addToCart(productName, productPrice);
});

// Função para fechar o modal e restaurar o scroll
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";

    // Garante que o body possa rolar novamente
    document.body.style.overflow = "auto";

    // Garante que a página mantenha o foco correto
    setTimeout(() => {
        document.body.focus();
    }, 100);
}





function atualizarPreco(precoUnitario, quantidadeId, totalId) {
    const quantidade = document.getElementById(quantidadeId).value;
    const total = precoUnitario * quantidade;
    document.getElementById(totalId).textContent = total.toFixed(2);
}