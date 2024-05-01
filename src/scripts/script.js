import './sliders'
// import './mustache.min.js' 
import mustache from 'mustache';
import petsList from './pets-list.json'

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    Blackberry: function () {
        return navigator.userAgent.match(/Blackberry/i);
    },
    IOS: function () {
        return navigator.userAgent.match(/IPhone|IPad|IPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.Blackberry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

window.onload = function () {
    // debugger
    setDefaultProducts()
    document.addEventListener("click", documentActions);
    document.addEventListener("mousedown", addJumpEffect);
    document.addEventListener("mouseup", addJumpEffect);
    document.addEventListener("touchstart", addJumpEffect);
    document.addEventListener("touchend", addJumpEffect);

    // Actions (делигирования события click)
    function documentActions(e) {
        const targerElement = e.target;
        if (targerElement.classList.contains("main-header__item") && !targerElement.classList.contains("_hover")) {
            targerElement.classList.toggle("_hover")
        }
        //Close if taped somewhere else
        if (!targerElement.classList.contains("main-header__item") && document.querySelectorAll('.main-header__item._hover').length > 0 && !targerElement.parentElement.classList.contains("burger")) {
            document.querySelectorAll(".main-header__item").forEach((element) => {
                element.classList.remove("_hover")
            })
        }
        //Leave only one active
        if (document.querySelectorAll('.main-header__item._hover').length > 0 && targerElement.classList.contains("main-header__item")) {
            document.querySelectorAll(".main-header__item").forEach((element) => {
                element.classList.remove("_hover")
            })
            targerElement.classList.toggle("_hover")
        }
        if (targerElement.classList.contains("selection-list__item") && !targerElement.classList.contains("_hover")) {
            targerElement.classList.toggle("_hover")
            getProducts(targerElement)
        }
        if (document.querySelectorAll('.selection-list__item._hover').length > 0 && targerElement.classList.contains("selection-list__item")) {
            document.querySelectorAll(".selection-list__item").forEach((element) => {
                element.classList.remove("_hover")
            })
            targerElement.classList.toggle("_hover")
        }
        if (targerElement.id == "action-minus" || targerElement.id == "action-plus") {
            updateCard(targerElement)
        }
        if (targerElement.classList.contains("section-play__item") && !targerElement.classList.contains("_big")) {
            // targerElement.classList.toggle("_active")
            showBigPhoto(targerElement)
        } else if (targerElement.closest(".section-play__item") && !targerElement.closest(".section-play__item._big")) {
            // targerElement.parentElement.classList.toggle("_active")
            showBigPhoto(targerElement.parentElement)
        }
        // if (!targerElement.classList.contains("section-play__item") || !targerElement.closest(".section-play__item")){
        //     targer
        // }
        if (targerElement.classList.contains("slider-content__body")) {
            let listItem = document.querySelector(`.selection-list__item[data-sort="${targerElement.dataset.sort}"]`)
            let listItems = document.querySelectorAll('.selection-list__item')
            listItems.forEach(listItem => listItem.classList.remove("_hover"))
            listItem.classList.toggle("_hover")
            getProducts(targerElement)

        }
        if (targerElement.closest(".footer-list__logo")) {
            addToCart(targerElement)
        }
    }

    function addJumpEffect(e) {
        let target = e.target

        if (target.closest(".footer-list__logo")) {
            target.closest(".footer-list__logo").classList.toggle("_active")
        }
    }

    let cartBtn = document.querySelector('.body-cart__btn')

    cartBtn.addEventListener("touchstart", function (e) {
        cartBtn.classList.add("_active")
    })
    cartBtn.addEventListener("touchend", function (e) {
        cartBtn.classList.remove("_active")
    })
    cartBtn.addEventListener("mousedown", function (e) {
        cartBtn.classList.add("_active")
    })
    cartBtn.addEventListener("mouseup", function (e) {
        cartBtn.classList.remove("_active")
    })

    // Header
    const burgerMenu = document.querySelector('.burger')
    const headerItems = document.querySelector('.main-header__items')
    // const bodyCart = document.querySelector('.body-cart')

    burgerMenu.addEventListener("click", function () {
        headerItems.classList.toggle("_active")
        burgerMenu.classList.toggle("_active")
    })

    const headerElement = document.querySelector('.header');

    const callback = function (etries, observer) {
        if (etries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll')
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);

    const cartHeader = document.querySelector('.cart-header')
    const bodyCart = document.querySelector('.body-cart')
    cartHeader.addEventListener("click", function (e) {
        if (e.target.classList.contains("cart-header__icon") || e.target.classList.contains("cart-header__arrow"))
            cartHeader.classList.toggle('_active')
        // bodyCart.classList.toggle('_active')
    })


    function setDefaultProducts() {
        let filterAll = document.querySelector('[data-sort="all"]')
        if (filterAll)
            filterAll.classList.add("_hover")
        fetchProducts()
    }

    //Products
    function getProducts(itemButton) {
        fetchProducts(itemButton)
    }

    async function fetchProducts(itemButton) {
        // const file = "../src/scripts/pets-list.json";
        // let response = await fetch(file, {
        //     method: "GET"
        // });
        // if (response.ok) {
        //     let result = await response.json()
        loadItems(petsList, itemButton);
    }
}

function loadItems(data, itemButton) {
    let petType;
    let petCardTemplate = document.querySelector('#list-slide__template').innerHTML
    let petsSlider = document.querySelector('.slider-list__wrapper')
    if (itemButton) {
        petType = itemButton.dataset.sort || 'all'
    } else {
        petType = 'all'
    }

    petsSlider.innerHTML = "";

    data.petsList.forEach(pet => {

        if (petType == "all") {
            let renderedHtml = mustache.render(petCardTemplate, pet);
            petsSlider.innerHTML += renderedHtml;
        }
        if (pet.type == petType) {
            let renderedHtml = mustache.render(petCardTemplate, pet);
            petsSlider.innerHTML += renderedHtml;
        }
    });
}

//Add to cart
function addToCart(button) {
    let cartStartMessage = document.querySelector('.body-cart__start-messge')
    cartStartMessage.innerHTML = ""

    let cartIcon = document.querySelector('.cart-header__icon')
    let cartQuantity = document.querySelector('.cart-header__icon span')

    if (cartQuantity) {
        cartQuantity.innerHTML++
    } else {
        cartIcon.innerHTML += "<span>1</span>"
    }

    let cardBody = button.closest(".list-slide__body");

    let cardImageCopySrc = cardBody.querySelector(".list-slide__img img").src
    let cardTitle = cardBody.querySelector(".list-slide__title").innerText
    let cardPrice = cardBody.querySelector(".footer-list__price span").innerText.replace(/\s/g, '')
    let template = document.querySelector('#card-item-template').innerHTML
    let cardId = cardBody.dataset.bodyId
    let cartMain = document.querySelector('.body-cart__main')

    let product = cartMain.querySelector(`[data-body-id="${cardId}"]`)

    if (product) {
        let productCount = product.querySelector('.item-count__number')
        let productPrice = product.querySelector('.card-item__price span')
        let productPriceValue = Number(product.querySelector('.card-item__price').dataset.price.replace(/\s/g, ''))

        product.querySelector(".item-count__number").innerHTML++
        productPrice.innerHTML = Number(productCount.innerHTML) * productPriceValue
    } else {
        let renderedHtml = mustache.render(template, {
            title: cardTitle,
            price: cardPrice,
            src: cardImageCopySrc,
            id: cardId
        });
        cartMain.innerHTML += renderedHtml;
    }

    let total = document.querySelector('.body-cart__price')
    let totalValue = document.querySelector('.body-cart__price').innerHTML
    total.innerHTML = Number(totalValue) + Number(cardPrice)

    let cartPrice = document.querySelector('.cart-header__text')

    if (cartPrice.querySelector("span")) {
        let cartPriceValue = document.querySelector('.cart-header__text span').innerHTML
        cartPrice.querySelector("span").innerHTML = Number(cartPriceValue) + Number(cardPrice)
    } else {
        cartPrice.innerHTML = `<span>${Number(cardPrice)}</span>usd.`
    }
}

//Update card
function updateCard(actionButton) {
    let cartStartMessage = document.querySelector('.body-cart__start-messge')

    let cartIcon = document.querySelector('.cart-header__icon')
    let cartQuantity = document.querySelector('.cart-header__icon span')

    // prices
    let total = document.querySelector('.body-cart__price')
    let cartPrice = document.querySelector('.cart-header__text')


    let product = actionButton.closest(".card-item")
    let productCount = product.querySelector('.item-count__number')
    let productPrice = product.querySelector('.card-item__price span')
    let productPriceValue = Number(product.querySelector('.card-item__price').dataset.price.replace(/\s/g, ''))

    if (actionButton.id == "action-minus") {
        cartQuantity.innerHTML--
        productCount.innerHTML--

        let productSum = Number(productCount.innerHTML) * productPriceValue
        productPrice.innerHTML = productSum

        // If the cart is empty:
        if (productCount.innerHTML < 1) {
            product.remove()
            if (document.querySelector('.body-cart__main').children.length < 1) {
                cartStartMessage.innerHTML = "The cart is empty"
                cartIcon.innerHTML = ""
                cartPrice.innerHTML = ""
            }
        }

        let totalValue = Number(document.querySelector('.body-cart__price').innerHTML)
        total.innerHTML = totalValue - productPriceValue

        if (cartPrice.querySelector("span"))
            cartPrice.querySelector("span").innerHTML = totalValue - productPriceValue

    }
    if (actionButton.id == "action-plus") {
        cartQuantity.innerHTML++
        productCount.innerHTML++

        let productSum = Number(productCount.innerHTML) * productPriceValue
        productPrice.innerHTML = productSum

        let totalValue = Number(document.querySelector('.body-cart__price').innerHTML)
        total.innerHTML = totalValue + productPriceValue
        cartPrice.querySelector("span").innerHTML = totalValue + productPriceValue
    }

    console.log(productCount)
}

//Gallery
function showBigPhoto(playItem) {
    // let playSection = document.querySelector('.play__body')

    let cloneImage = playItem.cloneNode(true)
    cloneImage.classList.add("_big")
    cloneImage.classList.remove("_active")
    cloneImage.addEventListener('click', function (e) {
        if (e.target.classList.contains("_big")) {
            cloneImage.remove()
        }
    })

    document.body.append(cloneImage)

}

// OnlickScroll
const array = document.querySelectorAll('[data-goto]');
const itemsHeader = document.querySelector('.main-header__items')
if (array.length > 0) {
    array.forEach(item => {
        item.addEventListener("click", onMenuLinkClick);
    });
} else {
    singleItem.addEventListener("click", onMenuLinkClick)
}

function onMenuLinkClick(e) {
    const targetElement = e.target;
    const burger = document.querySelector('.burger')

    if (targetElement.dataset.goto && document.querySelector(targetElement.dataset.goto)) {
        const gotoBlock = document.querySelector(targetElement.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__body').offsetHeight;

        if (itemsHeader.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            itemsHeader.classList.remove('_active')
            burger.classList.remove('_active')
        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        e.preventDefault();
    }
}

