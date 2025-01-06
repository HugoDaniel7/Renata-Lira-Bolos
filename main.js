// Função para abrir o pop-up
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';
}

// Função para fechar o pop-up
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// Função para fechar o popup clicando fora dele
window.onclick = function(event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(function(popup) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// Mostra o botão quando a página for rolada para baixo
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Variáveis do carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('.cart-counter');
const cart = [];

// Adicionar itens ao carrinho
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.dataset.price);
        const itemName = button.parentElement.querySelector('h2').textContent;
        cart.push({ name: itemName, price });
        updateCart();
    });
});

// Atualizar carrinho
function updateCart() {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    cartCounter.textContent = totalItems;
    console.log(`Carrinho atualizado: ${totalItems} itens, total: R$${totalPrice.toFixed(2)}`);
}

// Exibir popup do carrinho
document.querySelector('.cart-btn').addEventListener('click', () => {
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100vw';
    popupOverlay.style.height = '100vh';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    if (cart.length > 0) {
        const itemsList = cart.map(item => `${item.name}: R$${item.price.toFixed(2)}`).join('%0A');
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

        popupOverlay.innerHTML = `
            <div style="position: relative; padding: 20px; background: #333; color: white; border-radius: 8px; width: 300px;">
                <button onclick="closePopup()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; font-weight: bold; color: white; cursor: pointer;">X</button>
                <h3>Itens na sacola</h3>
                <ul>${cart.map(item => `<li>${item.name}: R$${item.price.toFixed(2)}</li>`).join('')}</ul>
                <strong>Total: R$${totalPrice}</strong>
                <button onclick="enviarWhatsApp('${itemsList}', ${totalPrice})" style="margin-top: 20px; padding: 10px 20px; background-color: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Encomendar</button>
            </div>
        `;
    } else {
        popupOverlay.innerHTML = `
            <div style="position: relative; padding: 20px; background: #333; color: white; border-radius: 8px; width: 300px;">
                <button onclick="closePopup()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; font-weight: bold; color: white; cursor: pointer;">X</button>
                <h3>Não há itens na sacola</h3>
            </div>
        `;
    }

    document.body.appendChild(popupOverlay);
});

// Função para enviar a mensagem para o WhatsApp
function enviarWhatsApp(itemsList, totalPrice) {
    const whatsappURL = `https://api.whatsapp.com/send?1=pt_BR&phone=5521980882615&text=Olá,%20tudo%20bem?%20Fiz%20o%20pedido%20através%20do%20site,%20pode%20confirmar%20pra%20mim%20por%20favor?%0A%0AItens:%0A${itemsList}%0A%0ATotal:%20R$${totalPrice.toFixed(2)}`;
    window.open(whatsappURL, '_blank');
}

// Fechar popup
function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
        popupOverlay.remove();
    }
}
