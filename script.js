// Função para redirecionar para o facebook
function redirecionarParaPagina1() {
    // Redireciona para outra página
    window.open("https://www.facebook.com/share/18b8XP5bY6/", "_blank");
}

function redirecionarParaPagina3() {
    // Redireciona para outra página
    window.open("https://wa.me/5521980882615", "_blank");
}

// Função para redirecionar para o whatsapp
function redirecionarParaPagina4() {
    // Redireciona para outra página
    window.open("https://www.instagram.com/renatalirabolos?igsh=MXg2dzUwMmI3bGJ3aw==", "_blank");
}

// Função para redirecionar para o instagram
function redirecionarParaPagina5() {
    // Redireciona para outra página
    window.open("https://maps.app.goo.gl/3gXX4un4dZAwni8ZA", "_blank");
}

function redirecionarParaPagina6() {
    // Redireciona para o Instagram da WebXS
    window.open("https://www.instagram.com/webxs_ofc?igsh=MTd4Z2Y5aTA0ZGNhag==", "_blank");
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


function addToCart(productName, productPrice, modalId) {
    // 1. Obter referência do modal
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal com ID ${modalId} não encontrado`);
        return;
    }

    // 2. Validação dos campos obrigatórios
    const validation = {
        topo: {
            element: modal.querySelector('input[name="topo"]:checked'),
            message: "Selecione o topo do bolo"
        },
        recheio: {
            elements: modal.querySelectorAll('input[name="recheio"]:checked'),
            min: 1,
            max: 2,
            message: "Selecione entre 1 e 2 recheios"
        },
        tema: {
            value: modal.querySelector('input[name="description"]')?.value.trim(),
            message: "Digite o tema do bolo"
        }
    };

    // Verificar campos obrigatórios
    const errors = [];

    if (!validation.topo.element) {
        errors.push(validation.topo.message);
        highlightError([...modal.querySelectorAll('.modal-options h3')].find(h3 => h3.textContent.toLowerCase().includes("topo")));
    }

    if (
        validation.recheio.elements.length < validation.recheio.min || 
        validation.recheio.elements.length > validation.recheio.max
    ) {
        errors.push(validation.recheio.message);
        highlightError([...modal.querySelectorAll('.modal-options h3')].find(h3 => h3.textContent.toLowerCase().includes("recheio")));
    }

    if (!validation.tema.value) {
        errors.push(validation.tema.message);
        highlightError([...modal.querySelectorAll('.modal-options h3')].find(h3 => h3.textContent.toLowerCase().includes("tema")));
    }

    // Mostrar erros se existirem
    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Preenchimento obrigatório',
            html: `
                <p>Você precisa preencher os seguintes campos:</p>
                <ul style="text-align:left">
                    ${errors.map(err => `<li>⚠️ ${err}</li>`).join('')}
                </ul>
            `,
            confirmButtonColor: '#d33'
        });
        return;
    }

    // 3. Coletar dados do formulário
    const getValue = (selector) => modal.querySelector(selector)?.value;
    const getCheckedValue = (name) => modal.querySelector(`input[name="${name}"]:checked`)?.value;
    const getCheckedValues = (name) => Array.from(modal.querySelectorAll(`input[name="${name}"]:checked`))
                                         .map(el => el.value);

    const quantidade = parseInt(getValue('input[type="number"]')) || 1;
    const recheios = getCheckedValues('recheio');
    const topo = getCheckedValue('topo');
    const description = getValue('input[name="description"]')?.trim();

    // 4. Calcular preço
    const opcoesComMetadePreco = [
        "50 Docinhos de Beijinho",
        "50 Docinhos de Brigadeiro",
        "25 Docinhos de Beijinho e 25 Docinhos de Brigadeiro"
    ];

    let total = productPrice;
    
    // Aplicar desconto se for uma das opções especiais
    if (recheios.some(recheio => opcoesComMetadePreco.includes(recheio))) {
        total = productPrice / 2;
    }

    // Adicionar valor extra para topo 3D
    if (topo.includes("3D")) {
        total += 20.00;
    }

    // Calcular total considerando quantidade
    total *= quantidade;

    // 5. Criar item do carrinho
    const cartItem = {
        productName,
        productPrice,
        quantidade,
        recheios,
        recheioFormatado: recheios.join(" + "),
        topo,
        description,
        total
    };

    // 6. Adicionar ao carrinho
    addItemToCartUI(cartItem);
    saveToCartData(cartItem);
    updateCartDisplay();

    // 7. Feedback e limpeza
    showSuccessMessage();
    closeModal(modalId);
    resetModalFields(modal);

    // Mostrar mensagem abaixo do botão "Adicionar ao Carrinho"
    const addButton = modal.querySelector('button.adicionar-ao-carrinho'); // Ajuste o seletor conforme seu HTML
    if (addButton) {
        let msg = document.createElement('div');
        msg.className = 'cart-feedback';
        msg.style.marginTop = '10px';
        msg.style.backgroundColor = '#e0ffe0';
        msg.style.padding = '10px';
        msg.style.borderRadius = '5px';
        msg.style.color = '#2e7d32';
        msg.innerHTML = `
            <strong>Adicionado ao carrinho:</strong><br>
            Produto: ${productName}<br>
            Topo: ${topo}<br>
            Recheios: ${recheios.join(" + ")}<br>
            Tema: ${description}
        `;
        addButton.parentNode.insertBefore(msg, addButton.nextSibling);

        setTimeout(() => msg.remove(), 5000); // Remove após 5 segundos
    }
}

// Funções auxiliares
function highlightError(element) {
    if (element) {
        element.style.color = 'red';
        element.style.fontWeight = 'bold';
        setTimeout(() => {
            element.style.color = '';
            element.style.fontWeight = '';
        }, 3000);
    }
}


function addItemToCartUI(item) {
    const cartItemsContainer = document.getElementById("cart-items1");
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    
    itemElement.innerHTML = `
        <span class="remove-item" onclick="removeFromCart(this)">×</span>
        <span>${item.productName} ${item.quantidade > 1 ? `(x${item.quantidade})` : ''}</span>
        ${item.recheios.length > 0 ? `<br> Recheio: ${item.recheioFormatado}` : ''}
        ${item.topo ? `<br> Topo: ${item.topo}` : ''}
        ${item.description ? `<br> Tema: ${item.description}` : ''}
        <br> <strong class="item-price">R$ ${item.total.toFixed(2)}</strong>
    `;
    
    cartItemsContainer.appendChild(itemElement);
}

function saveToCartData(item) {
    if (!window.cartItems) window.cartItems = [];
    window.cartItems.push(item);
}

function updateCartDisplay() {
    updateCartTotal();
    updateCartCount();
}

function showSuccessMessage() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Adicionado ao carrinho!',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'custom-swal' }
    });
}

function resetModalFields(modal) {
    modal.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    modal.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.value = '';
    });
}

function updateCartCount() {
    const count = window.cartItems ? window.cartItems.reduce((sum, item) => sum + item.quantidade, 0) : 0;
    document.getElementById('cart-count').textContent = count;
    
    // Opcional: esconder o contador se estiver zero
    const cartCount = document.getElementById('cart-count');
    if (count === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}

// Modifique a função removeFromCart para atualizar o contador também
function removeFromCart(element) {
    const item = element.parentElement;
    const itemIndex = Array.from(item.parentElement.children).indexOf(item);
    
    // Remove do array cartItems
    if (window.cartItems && window.cartItems.length > itemIndex) {
        window.cartItems.splice(itemIndex, 1);
    }
    
    // Remove do DOM
    item.remove();
    
    // Atualiza o total e o contador
    updateCartTotal();
    updateCartCount();
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
    
    // Atualiza o total e o contador
    updateCartTotal();
    updateCartCount();
    
    // Mostra mensagem diferente se foi o último item
    if (window.cartItems.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Carrinho vazio!',
            text: 'O último item foi removido',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'custom-swal'
            }
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item removido do carrinho!',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'custom-swal'
            }
        });
    }
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
    const deliveryDate = document.getElementById("delivery-date").value;
    const deliveryTime = document.getElementById("delivery-time").value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!name || !phone || !address || !deliveryDate || !deliveryTime) {
        Swal.fire({
            icon: 'error',
            title: 'Campos obrigatórios',
            text: 'Por favor, preencha todos os campos obrigatórios!',
            confirmButtonColor: '#3085d6',
        });
        return;
    }

    // Verifica se há itens no carrinho
    if (!window.cartItems || window.cartItems.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrinho vazio',
            text: 'Seu carrinho está vazio! Adicione itens antes de finalizar.',
            confirmButtonColor: '#3085d6',
        });
        return;
    }

    // Formata a data para exibição
    const formattedDate = new Date(deliveryDate).toLocaleDateString('pt-BR');

    // Número da Renata Lira Bolos (fixo)
    const renataPhone = "5521980882615";

    // Criação da mensagem formatada
    let message = "*PEDIDO RENATA LIRA BOLOS* \n\n";
    message += `*Data do Pedido:* ${new Date().toLocaleString('pt-BR')}\n`;
    message += `*Data de Entrega:* ${formattedDate}\n`;
    message += `*Horário de Entrega:* ${deliveryTime}\n\n`;
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
        message += `Quantidade: ${item.quantidade}\n`;

        // Adiciona os recheios se existirem
        if (item.recheios && item.recheios.length > 0) {
            message += `Recheios: ${item.recheios.join(" + ")}\n`;
        } else if (item.recheiosSelecionados && item.recheiosSelecionados.length > 0) {
            message += `Recheios: ${item.recheiosSelecionados.join(" + ")}\n`;
        } else if (item.recheio) {
            message += `Recheio: ${item.recheio}\n`;
        }

        // Adiciona os sabores se existirem (para docinhos)
        if (item.sabores && item.sabores.length > 0) {
            message += `Sabores: ${item.sabores.join(", ")}\n`;
        }

        // Adiciona o topo se existir
        if (item.topo) {
            message += `Topo: ${item.topo}\n`;
        }

        // Adiciona o tema se existir
        if (item.description) {
            message += `Tema/Detalhes: ${item.description}\n`;
        }

        message += `Valor: R$ ${item.total.toFixed(2)}\n\n`;
        total += item.total;
    });

    message += "--------------------------------\n";
    message += `*VALOR TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    message += "Agradecemos pela sua encomenda! \n";
    message += "Seus produtos serão preparados com todo carinho!\n";
    message += "A confirmação só é realizada mediante pagamento antecipado de 50% do valor. Aceitamos as seguintes formas de pagamento: transferência, PIX ou cartão de crédito via link.";

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${renataPhone}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpa o carrinho e os campos
    document.getElementById("cart-items1").innerHTML = "";
    document.getElementById("cart-total").textContent = "Total Do Pedido: R$ 0.00";
    document.getElementById("name").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("address").value = "";
    document.getElementById("delivery-date").value = "";
    document.getElementById("delivery-time").value = "";
    window.cartItems = [];

    // Atualiza o contador para zero
    updateCartCount();
}



document.addEventListener('DOMContentLoaded', function() {
    // Configura a data mínima como hoje
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const minDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById('delivery-date').min = minDate;
    
    // Inicializa o contador do carrinho
    updateCartCount();
});

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

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button35")?.addEventListener("click", function() {
    const productName = "Bolo de Corte";
    const productPrice = 4.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button36")?.addEventListener("click", function() {
    const productName = "Smash Cake Simples";
    const productPrice = 45.00;
    addToCart(productName, productPrice);
});

// Adicionar o produto ao carrinho ao clicar no botão
document.getElementById("add-to-cart-button37")?.addEventListener("click", function() {
    const productName = "Smash Cake com Topo 3D";
    const productPrice = 55.00;
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


// Configura a data mínima como hoje
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const yyyy = today.getFullYear();
    const minDate = yyyy + '-' + mm + '-' + dd;
    
    document.getElementById('delivery-date').min = minDate;
});


document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o carrinho
    if (!window.cartItems) {
        window.cartItems = [];
    }
    
    // Atualiza o contador (isso vai mostrar se houver itens)
    updateCartCount();
    
    // Restante do seu código...
});





function addToCartDoces(productName, productPrice, modalId) {
    // Captura a quantidade selecionada
    const quantidade = document.querySelector(`#${modalId} input[name="quantidade"]:checked`).value;
    const isMeioCento = quantidade === "50";
    
    // Captura os sabores selecionados
    const sabores = [];
    document.querySelectorAll(`#${modalId} input[name="sabor"]:checked`).forEach(checkbox => {
        sabores.push(checkbox.value);
    });
    
    // Validação de sabores
    if (sabores.length === 0) {
        alert("Por favor, selecione pelo menos um sabor!");
        return;
    }
    
    if (isMeioCento && sabores.length > 2) {
        alert("Para 1/2 cento, selecione no máximo 2 sabores!");
        return;
    }
    
    if (!isMeioCento && sabores.length > 4) {
        alert("Para 1 cento, selecione no máximo 4 sabores!");
        return;
    }
    
    // Calcula o preço
    const total = isMeioCento ? productPrice / 2 : productPrice;
    
    // Mostra mensagem de confirmação
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item adicionado ao carrinho!',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'custom-swal'
        }
    });
    
    // Criação do item no carrinho
    const cartItemsContainer = document.getElementById("cart-items1");
    const item = document.createElement("div");
    item.classList.add("cart-item");
    
    const removeButton = `<span class="remove-item" onclick="removeFromCart(this)">×</span>`;
    
    // Monta o conteúdo do item no carrinho
    item.innerHTML = `
        ${removeButton}
        <span>${productName} (${quantidade} unidades)</span>
        <br> Sabores: ${sabores.join(", ")}
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
        productPrice: isMeioCento ? productPrice / 2 : productPrice,
        quantidade,
        sabores,
        total
    });
    
    // Atualiza o total do carrinho
    updateCartTotal();
    
    // Atualiza o contador do carrinho
    updateCartCount();
    
    // Fecha o modal
    closeModal(modalId);
}








// Função para pesquisar o CEP usando ViaCEP
function pesquisarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        Swal.fire({
            icon: 'error',
            title: 'CEP inválido',
            text: 'Por favor, digite um CEP válido com 8 dígitos.',
            confirmButtonColor: '#3085d6',
        });
        return;
    }
    
    // Mostra loading
    Swal.fire({
        title: 'Buscando endereço...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Faz a requisição para a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            Swal.close();
            
            if (data.erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'CEP não encontrado',
                    text: 'O CEP informado não foi encontrado. Por favor, verifique e tente novamente.',
                    confirmButtonColor: '#3085d6',
                });
                return;
            }
            
            // Monta o endereço completo com campo para número
            let enderecoCompleto = '';
            if (data.logradouro) enderecoCompleto += data.logradouro + ', Nº ';
            if (data.bairro) enderecoCompleto += ' - ' + data.bairro;
            if (data.localidade) enderecoCompleto += ' - ' + data.localidade;
            
            // Remove hífens iniciais se existirem
            enderecoCompleto = enderecoCompleto.replace(/^ - /, '').replace(/ - /g, ' - ');
            
            // Preenche o campo de endereço e permite edição
            const addressField = document.getElementById('address');
            addressField.value = enderecoCompleto;
            addressField.readOnly = false; // Permite que o usuário edite para adicionar o número
            
            // Foca no campo de endereço após o "Nº " para facilitar o preenchimento
            setTimeout(() => {
                const posicaoNumero = addressField.value.indexOf('Nº ') + 3;
                addressField.setSelectionRange(posicaoNumero, posicaoNumero);
                addressField.focus();
            }, 100);
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Erro na consulta',
                text: 'Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.',
                confirmButtonColor: '#3085d6',
            });
        });
}