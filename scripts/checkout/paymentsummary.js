import { cart } from '../../data/cart-oop.js';
import { products } from '../../data/products.js';
import { priceFormat } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryoptions.js';



export default function generatePaymentSummary(){
    let itemPrice = 0;
    let shippingPrice = 0;

    cart.cartItems.forEach((cartItem)=>{
        let currDeliveryOption = cartItem.deliveryID;
        let currDeliveryPrice = 0;
        let matchingItem;

        products.forEach((item) => {
            if (item.id === cartItem.id){
                matchingItem = item;
            }
        })
        let cartItemPrice = Number(matchingItem.priceCents) * Number(cartItem.quantity);
        itemPrice += cartItemPrice;

        deliveryOptions.forEach((option)=>{
            if (currDeliveryOption == option.id){
                currDeliveryPrice = Number(option.priceCents); // Ensure the price is a number
                shippingPrice += currDeliveryPrice;
            }
        });

    });

    let totalBeforeTax = itemPrice + shippingPrice;
    let estTax = totalBeforeTax * 0.1;
    let orderTotal = totalBeforeTax + estTax;

    let html = `<div class="payment-summary-title">
                    Order Summary
                </div>
                <div class="payment-summary-row">
                    <div>Items (${cart.calculateCartQty()}):</div>
                    <div class="payment-summary-money">$${priceFormat(itemPrice)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${priceFormat(shippingPrice)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${priceFormat(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${priceFormat(estTax)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${priceFormat(orderTotal)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
    `;
    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    paymentSummaryElement.innerHTML = html;
}
