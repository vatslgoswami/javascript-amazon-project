import { generateOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { cart } from "../../data/cart-oop.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: generateOrderSummary', ()=>{
    const productID1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productID2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeAll((done)=>{
        loadProducts(()=>{
            done();
        })
    });
    beforeEach(()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=> JSON.stringify([{
            id: productID1,
            quantity: 1,
            deliveryID: 1
        },{
            id: productID2,
            quantity: 2,
            deliveryID: 1
        } ]));
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="return-to-home-link"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>`

        cart.setCart(JSON.parse(localStorage.getItem('cart')));
        generateOrderSummary();
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML ='';
    })

    it('displays the cart', ()=>{
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productID1}`).innerText
        ).toContain('Quantity: 1');
        expect(
            document.querySelector(`.js-product-quantity-${productID2}`).innerText
        ).toContain('Quantity: 2');
    });
    it('deletes item from cart', ()=>{
        document.querySelector(`.js-delete-link-${productID1}`).click();

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-product-quantity-${productID1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-product-quantity-${productID2}`)
        ).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].id).toEqual(productID2);
    });
})
