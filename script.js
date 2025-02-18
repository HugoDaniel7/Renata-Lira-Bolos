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
    // Captura o nome do bolo (já está sendo capturado)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo dependendo do tipo (bolo simples)
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}






// Função para adicionar ao carrinho (modal2)
function addToCartModal2(productName, productPrice, modalId) {
    // Captura o nome do bolo (nome do produto)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}










// Função para adicionar ao carrinho (modal3)
function addToCartModal3(productName, productPrice, modalId) {
    // Captura o nome do bolo (nome do produto)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}
















// Função para adicionar ao carrinho (modal4)
function addToCartModal4(productName, productPrice, modalId) {
    // Captura o nome do bolo (nome do produto)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}









// Função para adicionar ao carrinho (modal5)
function addToCartModal5(productName, productPrice, modalId) {
    // Captura o nome do bolo (nome do produto)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}







// Função para adicionar ao carrinho (modal6)
function addToCartModal6(productName, productPrice, modalId) {
    // Captura o nome do bolo (nome do produto)
    const boloNome = productName;

    // Captura o recheio selecionado (apenas um)
    const recheio = document.querySelector(`input[name="recheio"]:checked`)?.value;

    // Captura o comentário do modal específico
    const description = document.querySelector(`#${modalId} input[name="description"]`)?.value;

    // O preço já vem embutido no valor do bolo
    let total = productPrice;

    // Criação do item a ser adicionado ao carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");

    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;

    // Formatação do conteúdo
    const itemData = {
        boloNome,
        recheio,
        description,
        total,
    };

    // Exibe os dados no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${boloNome}</span>
        <br> Recheio: ${recheio || "Não selecionado"}
        <br> Comentário: ${description || "Nenhum Comentário"}
        <br> <strong class="item-price">R$ ${total.toFixed(2)}</strong>
    `;

    // Adiciona o item ao carrinho
    cartItemsContainer.appendChild(item);

    // Fecha o modal após adicionar ao carrinho
    closeModal(modalId);

    // Atualiza o total
    updateCartTotal();

    // Limpa os campos de entrada do modal para o próximo item
    resetModalFields();

    // Armazenar dados do item no carrinho (pode ser usado na finalização)
    if (!window.cartItems) {
        window.cartItems = [];
    }
    window.cartItems.push(itemData);
}








// Função para remover item do carrinho
function removeFromCart(button) {
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = button.parentElement;
    cartItemsContainer.removeChild(item);
    updateCartTotal();
}



// Função para atualizar o total do carrinho
function updateCartTotal() {
    const cartItemsContainer = document.getElementById("cart-items1");
    const cartItems = cartItemsContainer.getElementsByClassName("cart-item");

    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const price = parseFloat(cartItems[i].querySelector(".item-price").textContent.replace('R$', '').trim());
        total += price;
    }

    document.getElementById("cart-total").textContent = `Total Do Pedido: R$ ${total.toFixed(2)}`;
}




// Função para limpar os campos de entrada do modal após adicionar um item
function resetModalFields() {
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
}



// Função para finalizar a compra e enviar para o WhatsApp
function finalizePurchase() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("celular").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    if (!name || !phone || !address) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Criação do cabeçalho da mensagem
    let orderSummary = "Pedido Hamburgueria ComeCome!\n\n";
    const orderId = Date.now(); // Gerado dinamicamente
    const orderDate = new Date().toLocaleString(); // Data e hora atual
    const deliveryTime = "50 - 70 minutos"; 
    orderSummary += `Pedido: ${orderId} (${orderDate})\nTempo De Entrega: ${deliveryTime}\n------------------------------\n`;

    // Adiciona os dados do cliente
    orderSummary += `Nome: ${name}\nCelular: ${phone}\nEndereço Completo: ${address}\nForma De Pagamento: ${payment}\n------------------------------\n`;

    // Adiciona os itens do carrinho
    orderSummary += "Pedido:\n";
    let totalAmount = 0;
    window.cartItems.forEach(item => {
        orderSummary += `-> ${item.productName}\n`;

        if (item.isCombo) {
            orderSummary += `Ponto da Carne 1: ${item.pontoCarne1 || "Não selecionado"}\nPonto da Carne 2: ${item.pontoCarne2 || "Não selecionado"}\n`;
        } else if (item.isBeverage) {
            orderSummary += `Bebida: ${item.bebida1 || "Não selecionado"}\n`;
        } else {
            orderSummary += `Ponto da Carne: ${item.pontoCarne1 || "Não selecionado"}\nAdicional: ${item.adicional || "Não selecionado"}\nAcompanhamento: ${item.acompanhamento || "Não selecionado"}\nBebida: ${item.bebida || "Não selecionado"}\n`;
        }

        orderSummary += `Comentário: ${item.description || "Nenhum Comentário"}\n`;
        orderSummary += `R$ ${item.total.toFixed(2)}\n`;
        totalAmount += item.total;
    });

    // Adiciona o total e a entrega
    const deliveryFee = 4.00; // Exemplo de valor de entrega
    const finalAmount = totalAmount + deliveryFee;
    orderSummary += "------------------------------\n";
    orderSummary += `Produtos: R$${totalAmount.toFixed(2)}\nEntrega: R$${deliveryFee.toFixed(2)}\n\n`;
    orderSummary += `TOTAL: R$${finalAmount.toFixed(2)}\n\n`;

    // Mensagem de agradecimento
    orderSummary += "Obrigado pela preferência, se precisar de algo é só chamar!";

    // Envia o pedido para o WhatsApp do número fixo (55 21 96648-7406)
    const whatsappMessage = encodeURIComponent(orderSummary);
    const whatsappUrl = `https://wa.me/5521966487406?text=${whatsappMessage}`;

    // Abre a conversa no WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpar o carrinho após a finalização
    document.getElementById("cart-items1").innerHTML = "";
    updateCartTotal();
    document.getElementById("name").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("address").value = "";
}



// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button1").addEventListener("click", function() {
    const productName = "I Love Cheddar";
    const productPrice = 36.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button2").addEventListener("click", function() {
    const productName = "Fake Mequi";
    const productPrice = 42.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button3").addEventListener("click", function() {
    const productName = "Monstruoso";
    const productPrice = 48.90;
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
    const productName = "Combo Australiano Monstruoso";
    const productPrice = 89.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button6").addEventListener("click", function() {
    const productName = "Combo Fake Mequi";
    const productPrice = 89.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button7").addEventListener("click", function() {
    const productName = "Combo Clássico";
    const productPrice = 84.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button8").addEventListener("click", function() {
    const productName = "Combo Original";
    const productPrice = 84.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button9").addEventListener("click", function() {
    const productName = "Combo Monstro";
    const productPrice = 99.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button10").addEventListener("click", function() {
    const productName = "Refringente Lata";
    const productPrice = 7.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button11").addEventListener("click", function() {
    const productName = "Refrigerante Garrafa";
    const productPrice = 9.90;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button12").addEventListener("click", function() {
    const productName = "Água Mineral";
    const productPrice = 4.00;
    addToCart(productName, productPrice);
});