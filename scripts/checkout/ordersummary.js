import { cart } from '../../data/cart-oop.js';
import { products } from '../../data/products.js';
import { priceFormat } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryoptions.js';
import generatePaymentSummary from './paymentsummary.js';
import { findDeliveryDatebyID } from '../../data/deliveryoptions.js';

let headerQtyElement = document.querySelector('.return-to-home-link');
let orderSummaryElement = document.querySelector('.js-order-summary');

export function generateOrderSummary(){
    orderSummaryElement = document.querySelector('.js-order-summary');
    headerQtyElement = document.querySelector('.return-to-home-link');
    let orderSummaryHTML = '';
    if (cart.cartItems.length === 0){
        orderSummaryElement.innerHTML = 'Your cart is empty.';
        generatePaymentSummary ();
        setHeaderItemsQty();
        return;
    }
    cart.cartItems.forEach((cartItem) => {
        let fullProduct;
        products.forEach((item)=>{
            if (cartItem.id === item.id){
                fullProduct = item;
            }
        })
        orderSummaryHTML += `<div class="cart-item-container js-cart-item-container-${fullProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${findDeliveryDatebyID(cartItem.deliveryID)}
                </div>
    
                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${fullProduct.image}">
    
                    <div class="cart-item-details">
                    <div class="product-name">
                        ${fullProduct.name}
                    </div>
                    <div class="product-price">
                        ${fullProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${fullProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${fullProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" 
                        data-product-id = ${fullProduct.id}>
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${fullProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link-${fullProduct.id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link
                        js-delete-link-${fullProduct.id}" 
                        data-product-id = ${fullProduct.id}>
                        Delete
                        </span>
                    </div>
                    </div>
    
                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${createDeliveryOptions(fullProduct, cartItem)}
                    </div>
                    </div>
                </div>
                </div>`
    })
    orderSummaryElement.innerHTML = orderSummaryHTML;
    setHeaderItemsQty();

    const radioSelectorElements = document.querySelectorAll('.delivery-option');
    radioSelectorElements.forEach((selector)=>{
        selector.addEventListener('click', ()=>{
            let productID = selector.dataset.productId;
            let matchingItem = cart.cartFindByID(productID);
            matchingItem.deliveryID = Number(selector.dataset.deliveryId);
            cart.saveToStorage();
            generateOrderSummary();
        }) 
    })
    const deleteLinkElements = document.querySelectorAll('.js-delete-link');

    deleteLinkElements.forEach((link) => {
        link.addEventListener ('click', () => {
            let currProductID = link.dataset.productId;
            cart.cartItems.forEach((cartItem, index) => {
                if (currProductID === cartItem.id){
                    cart.cartItems.splice(index, 1);
                    cart.saveToStorage();
                }
            })
            setHeaderItemsQty();
            generateOrderSummary();
        })
    })

    const updateLinkElements = document.querySelectorAll('.js-update-link');
    updateLinkElements.forEach((link) => {
        link.addEventListener('click', () =>{
            let currProductID = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${currProductID}`);
            const currSaveLink = document.querySelector(`.js-save-link-${currProductID}`);
            const currQtyInput = document.querySelector(`.js-quantity-input-${currProductID}`);
            const currQtyLabel = document.querySelector(`.js-quantity-label-${currProductID}`);
            currQtyInput.value = '';

            function process(){
                const updatedVal = Number(currQtyInput.value);
                if (updatedVal<=0 || updatedVal>1000){
                    currQtyInput.value = '';
                    return alert('Error! Quantity should be a number between 0 and 1000.');
                } 
                cart.updateQuantity (currProductID, updatedVal);
                setHeaderItemsQty();
                container.classList.remove('is-editing-quantity');
                currQtyLabel.innerHTML = `${updatedVal}`;
                generateOrderSummary();
            }
            container.classList.add('is-editing-quantity');
            currSaveLink.addEventListener('click', ()=>{
                process();
                })
            currQtyInput.addEventListener('keydown', (event)=>{
                if (event.key === 'Enter'){
                    process();
                    }
                })
            })
        })
generatePaymentSummary();
}

export function setHeaderItemsQty(){
    headerQtyElement = document.querySelector('.return-to-home-link');
    headerQtyElement.innerHTML = `${cart.calculateCartQty()} items`;
}

function createDeliveryOptions(product, cartItem){
    let html = '';
    deliveryOptions.forEach((option) => {
        const deliveryPrice = option.priceCents;
        const dateString = findDeliveryDatebyID(option.id);
        html += `<div class="delivery-option" 
        data-product-id = ${product.id} 
        data-delivery-id = ${option.id}>
        <input type="radio" ${cartItem.deliveryID===option.id ?'checked' :''}
        class="delivery-option-input"
        name="delivery-option-${product.id}">
        <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            ${deliveryPrice === 0 ?'FREE': `$${priceFormat(deliveryPrice)}`} Shipping
        </div>
        </div>
    </div>`
    })
    return html;
}

