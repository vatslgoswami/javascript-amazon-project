import { cart, addToCart, calculateCartQty } from '../data/cart.js'; 
import { products, fetchProducts } from '../data/products.js';

fetchProducts().then(()=>{
    return new Promise((resolve)=>{
        generateProductGrid();
        updateCartHTML();
        resolve();
    })
}).then(()=>{
    attachEventListeners();
});

async function loadPage(){
    await fetchProducts();
    generateProductGrid();
    updateCartHTML()
}

loadPage().then(()=>{
    attachEventListeners();
})

const productsGridElement = document.querySelector('.js-products-grid');
let productsGridHTML = '';

function generateProductGrid(){
    productsGridHTML = ''; // Reset HTML to prevent duplication
    products.forEach((item) => {
        productsGridHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src=${item.image}>
                </div>
                <div class="product-name limit-text-to-2-lines">
                    ${item.name}
                </div>
                <div class="product-rating-container">
                    <img class="product-rating-stars" src="${item.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                        ${item.rating.count}
                    </div>
                </div>
                <div class="product-price">
                    ${item.getPrice()}
                </div>
                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${item.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="product-spacer"></div>
                ${item.extraInfoHTML()}
                <div class="added-to-cart js-added-to-cart-${item.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
                <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id=${item.id}>
                    Add to Cart
                </button>
            </div>
        `;
    });
    productsGridElement.innerHTML = productsGridHTML;
}
function updateCartHTML() {
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = calculateCartQty();
}
function attachEventListeners() {
    const addToCartButtonElements = document.querySelectorAll('.js-add-to-cart-button');
    const addedMsgTimeoutIDs = {};

    function displayAddedMsg(button) {
        let addedElement = document.querySelector(`.js-added-to-cart-${button.dataset.productId}`);
        addedElement.classList.add('added-message-opacity');
        const previousTimeoutID = addedMsgTimeoutIDs[button.dataset.productId];
        if (previousTimeoutID) {
            clearTimeout(previousTimeoutID);
        }
        const currTimeoutID = setTimeout(() => addedElement.classList.remove('added-message-opacity'), 1500);
        addedMsgTimeoutIDs[button.dataset.productId] = currTimeoutID;
    }

    addToCartButtonElements.forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.productId);
            updateCartHTML();
            displayAddedMsg(button);
            console.log(cart);
        });
    });
}