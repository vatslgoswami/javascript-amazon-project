import { cart, calculateCartQty, cartFindByID, saveToStorage, updateQuantity } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { priceFormat } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryoptions.js';
import generatePaymentSummary from './paymentsummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const orderSummaryElement = document.querySelector('.js-order-summary');
const headerQtyElement = document.querySelector('.return-to-home-link');

export function generateOrderSummary(){
    console.log(cart);
    let orderSummaryHTML = '';
    if (cart.length === 0){
        orderSummaryElement.innerHTML = 'Your cart is empty.';
        generatePaymentSummary ();
        setHeaderItemsQty();
        return;
    }
    cart.forEach((cartItem) => {
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
                        $${priceFormat(fullProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${fullProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" 
                        data-product-id = ${fullProduct.id}>
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${fullProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link-${fullProduct.id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" 
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
            let matchingItem = cartFindByID(productID);
            matchingItem.deliveryID = Number(selector.dataset.deliveryId);
            saveToStorage();
            generateOrderSummary();
        }) 
    })
    const deleteLinkElements = document.querySelectorAll('.js-delete-link');

    deleteLinkElements.forEach((link) => {
        link.addEventListener ('click', () => {
            let currProductID = link.dataset.productId;
            cart.forEach((cartItem, index) => {
                if (currProductID === cartItem.id){
                    cart.splice(index, 1);
                    saveToStorage();
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
                updateQuantity (currProductID, updatedVal);
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
    headerQtyElement.innerHTML = `${calculateCartQty()} items`;
}

function createDeliveryOptions(product, cartItem){
    const today = dayjs();
    let html = '';
    deliveryOptions.forEach((option) => {
        const deliveryDate = today.add(option.days, 'days');
        const deliveryPrice = option.priceCents;
        const dateString = deliveryDate.format('dddd, MMMM D');
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

function findDeliveryDatebyID(deliveryID){
    const today = dayjs();
    let dateString
    deliveryOptions.forEach((option)=>{
        if (option.id === deliveryID){
            const deliveryDate = today.add(option.days, 'days');
            dateString = deliveryDate.format('dddd, MMMM D');
        }
    })
    return dateString;
}