import {cart} from '../data/cart.js'; 
import {products} from '../data/products.js'; 
import {priceFormat} from './utils/money.js';

const orderSummaryElement = document.querySelector('.js-order-summary');

function generateOrderSummary(){
    let orderSummaryHTML = '';
    if (cart.length > 0){
        cart.forEach((cartItem) => {
            let fullProduct;
            products.forEach((item)=>{
                if (cartItem.id === item.id){
                    fullProduct = item;
                }
            })
            orderSummaryHTML += `<div class="cart-item-container js-cart-item-container-${fullProduct.id}">
                    <div class="delivery-date">
                      Delivery date: Tuesday, June 21
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
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                          </span>
                          <span class="update-quantity-link link-primary">
                            Update
                          </span>
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
                        <div class="delivery-option">
                          <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${fullProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                              FREE Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${fullProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                              $4.99 - Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${fullProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                              $9.99 - Shipping
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`
        })
    }
    orderSummaryElement.innerHTML = orderSummaryHTML;
}

generateOrderSummary();
console.log(cart);

const deleteLinkElements = document.querySelectorAll('.js-delete-link');

deleteLinkElements.forEach((link) => {
    link.addEventListener ('click', () => {
        let currProductID = link.dataset.productId;
        cart.forEach((cartItem, index) => {
            if (currProductID === cartItem.id){
                cart.splice(index, 1);
                console.log(cart);
                const container = document.querySelector(`.js-cart-item-container-${currProductID}`);
                container.remove();
            }
        })
    })
})