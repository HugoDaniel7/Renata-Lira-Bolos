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
        const itemName = button.parentElement.querySelector('h5').textContent; // Alterado para buscar o nome correto
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







// Função para mover cards e centralizar apenas em telas menores
let currentIndex = 0;

const moveCarousel = (direction) => {
    const carousel = document.getElementById('carousel');
    const cards = document.querySelectorAll('#carousel #card');
    const totalCards = cards.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalCards - 1;
    } else if (currentIndex >= totalCards) {
        currentIndex = 0;
    }

    // Verifica se a tela é menor que 768px (tamanho de tablets e celulares)
    if (window.matchMedia("(max-width: 768px)").matches) {
        const cardWidth = cards[0].offsetWidth;
        const carouselWidth = document.getElementById('carousel-container').offsetWidth;
        const offset = -currentIndex * cardWidth + (carouselWidth - cardWidth) / 2;

        carousel.style.transform = `translateX(${offset}px)`;
    } else {
        // Para telas maiores, mantém o comportamento normal (sem centralizar)
        const offset = -currentIndex * 300;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    
};





// Função para mover o carrossel 2
let currentIndex2 = 0;

const moveCarousel2 = (direction) => {
    const carousel2 = document.getElementById('carousel-2');
    const cards2 = document.querySelectorAll('#carousel-2 #card-2');
    const totalCards2 = cards2.length;

    currentIndex2 += direction;

    if (currentIndex2 < 0) {
        currentIndex2 = totalCards2 - 1;
    } else if (currentIndex2 >= totalCards2) {
        currentIndex2 = 0;
    }

    // Verifica se a tela é menor que 768px (tamanho de tablets e celulares)
    if (window.matchMedia("(max-width: 768px)").matches) {
        const cardWidth2 = cards2[0].offsetWidth;
        const carouselWidth2 = document.getElementById('carousel-container-2').offsetWidth;
        const offset2 = -currentIndex2 * cardWidth2 + (carouselWidth2 - cardWidth2) / 2;

        carousel2.style.transform = `translateX(${offset2}px)`;
    } else {
        // Para telas maiores, mantém o comportamento normal (sem centralizar)
        const offset2 = -currentIndex2 * 300;
        carousel2.style.transform = `translateX(${offset2}px)`;
    }
};






// Função para mover o Carrossel 3
let currentIndex3 = 0;

const moveCarousel3 = (direction) => {
    const carousel3 = document.getElementById('carousel-3');
    const cards3 = document.querySelectorAll('#carousel-3 #card-3');
    const totalCards3 = cards3.length;

    currentIndex3 += direction;

    if (currentIndex3 < 0) {
        currentIndex3 = totalCards3 - 1;
    } else if (currentIndex3 >= totalCards3) {
        currentIndex3 = 0;
    }

    // Verifica se a tela é menor que 768px (para celulares e tablets)
    if (window.matchMedia("(max-width: 768px)").matches) {
        const cardWidth3 = cards3[0].offsetWidth;
        const carouselWidth3 = document.getElementById('carousel-container-3').offsetWidth;
        const offset3 = -currentIndex3 * cardWidth3 + (carouselWidth3 - cardWidth3) / 2;

        carousel3.style.transform = `translateX(${offset3}px)`;
    } else {
        // Para telas maiores, mantém o comportamento normal
        const offset3 = -currentIndex3 * 300;
        carousel3.style.transform = `translateX(${offset3}px)`;
    }
};


// Função para mover o Carrossel 4
let currentIndex4 = 0;

const moveCarousel4 = (direction) => {
    const carousel4 = document.getElementById('carousel-4');
    const cards4 = document.querySelectorAll('#carousel-4 .card-4');
    const totalCards4 = cards4.length;

    currentIndex4 += direction;

    if (currentIndex4 < 0) {
        currentIndex4 = totalCards4 - 1;
    } else if (currentIndex4 >= totalCards4) {
        currentIndex4 = 0;
    }

    // Ajuste para telas menores (responsivo)
    if (window.matchMedia("(max-width: 768px)").matches) {
        const cardWidth4 = cards4[0].offsetWidth;
        const carouselWidth4 = document.getElementById('carousel-container-4').offsetWidth;
        const offset4 = -currentIndex4 * cardWidth4 + (carouselWidth4 - cardWidth4) / 2;

        carousel4.style.transform = `translateX(${offset4}px)`;
    } else {
        // Para telas maiores
        const offset4 = -currentIndex4 * 300;
        carousel4.style.transform = `translateX(${offset4}px)`;
    }
};

































// Executa a função ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    moveCarousel(0);
});


// Função genérica para redirecionamento
function redirecionar(url) {
    window.open(url, "_blank");
}

// Exemplos de uso da função genérica de redirecionamento
function redirecionarParaPagina6() {
    redirecionar("https://github.com/HugoDaniel7/AppManagerTrain-1.git");
}

function redirecionarParaPagina7() {
    redirecionar("https://www.mediafire.com/file/kl9moukuauugsej/app-debug.apk/file");
}

function redirecionarParaPagina8() {
    redirecionar("https://github.com/HugoDaniel7/Renata-Lira-Bolos.git");
}

function redirecionarParaPagina9() {
    redirecionar("https://renatalirabolos.netlify.app/");
}

function redirecionarParaPagina10() {
    redirecionar("https://github.com/HugoDaniel7/Gerador-de-Texto-com-planilhas.git");
}

function redirecionarParaPagina11() {
    redirecionar("https://gerador-de-texto-com-planilhas.netlify.app/");
}

function redirecionarParaPagina12() {
    redirecionar("https://github.com/FabioHTGuimaraes/Contagem-Regressiva-De-Namoro");
}

function redirecionarParaPagina13() {
    redirecionar("https://contagem-regressiva-de-namoro.netlify.app");
}

function redirecionarParaPagina15() {
    redirecionar("https://github.com/FabioHTGuimaraes/Gerador-QrCode");
}

function redirecionarParaPagina16() {
    redirecionar("https://geradorqrcodefg.netlify.app/");
}







document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

