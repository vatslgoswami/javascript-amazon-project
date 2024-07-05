export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function setCart(newCart){
    cart = newCart;
}

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productID){
    let currQuantitySelector = document.querySelector(`.js-quantity-selector-${productID}`) || 1;
    let currAddValue = Number(currQuantitySelector.value)|| 1;
    let matchingItem = cartFindByID(productID);
    if (matchingItem) {
        matchingItem.quantity += currAddValue;
    } else {
        cart.push({
            id: productID,
            quantity: currAddValue,
            deliveryID: 1
        });
    // setTimeout(()=> currQuantitySelector.value = '1', 62.5);
    }
    saveToStorage();
}

export function calculateCartQty(){
    let cartQuantity = 0;
    cart.forEach(element => cartQuantity += element.quantity);
    return cartQuantity;
}

export function updateQuantity(productID, newQuantity){
    let matchingItem = cartFindByID(productID);
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function cartFindByID(productID){
    let matchingItem;
    cart.forEach((cartItem) =>{
        if (cartItem.id === productID){
            matchingItem = cartItem;
        }
    })
    return matchingItem}
