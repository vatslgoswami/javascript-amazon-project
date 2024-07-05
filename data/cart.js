export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(button){
    let productID = button.dataset.productId;
    let currQuantitySelector = document.querySelector(`.js-quantity-selector-${productID}`)
    let currAddValue = Number(currQuantitySelector.value);
    let productFound = false;
    let matchingItem = cartFindByID(productID);
        if (matchingItem) {
            matchingItem.quantity += currAddValue;
            productFound = true;
        }
    if (!productFound) {
        cart.push({
            id: button.dataset.productId,
            quantity: currAddValue,
            deliveryID: 1
        });
    setTimeout(()=> currQuantitySelector.value = '1', 62.5);
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
