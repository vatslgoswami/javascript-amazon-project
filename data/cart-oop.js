export class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    };

    setCart(newCart){
        this.cartItems = newCart;
    };

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productID){
        let currQuantitySelector = document.querySelector(`.js-quantity-selector-${productID}`) || 1;
        let currAddValue = Number(currQuantitySelector.value);
        let matchingItem = cartFindByID(productID);
        if (matchingItem) {
            matchingItem.quantity += currAddValue;
        } else {
            this.cartItems.push({
                id: productID,
                quantity: currAddValue,
                deliveryID: 1
            });
        setTimeout(()=> currQuantitySelector.value = '1', 62.5);
        }
        saveToStorage();
    };

    calculateCartQty(){
        let cartQuantity = 0;
        this.cartItems.forEach(element => cartQuantity += element.quantity);
        return cartQuantity;
    };

    updateQuantity(productID, newQuantity){
        let matchingItem = this.cartFindByID(productID);
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    };
    
    cartFindByID(productID){
        let matchingItem;
        this.cartItems.forEach((cartItem) =>{
            if (cartItem.id === productID){
                matchingItem = cartItem;
            }
        })
        return matchingItem};
}

export let cart = new Cart('cart');