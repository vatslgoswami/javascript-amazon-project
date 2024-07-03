export const cart = [];

export function addToCart(button){
    let currQuantitySelector = document.querySelector(`.js-quantity-selector-${button.dataset.productId}`)
    let currAddValue = Number(currQuantitySelector.value);
    let productFound = false;
    cart.forEach((element) => {
        if (element.id === button.dataset.productId) {
            element.quantity += currAddValue;
            productFound = true;
        }
    });
    if (!productFound) {
        cart.push({
            id: button.dataset.productId,
            quantity: currAddValue
        });
    setTimeout(()=> currQuantitySelector.value = '1', 62.5);
    }
}