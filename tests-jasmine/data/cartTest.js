import { addToCart, cart, setCart } from "../../data/cart.js";

describe('test suite: addToCart', ()=>{
    it('adding existing product to cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=> JSON.stringify([{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryID: 1
        }]));
        spyOn(localStorage, 'setItem');

        setCart(JSON.parse(localStorage.getItem('cart')));
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(2);
    });
    it('adding new product to cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=> JSON.stringify([]));
        spyOn(localStorage, 'setItem');

        setCart(JSON.parse(localStorage.getItem('cart')));
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(1);
    })
})