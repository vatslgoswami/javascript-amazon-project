export const cart = [{id : "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1},{id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e", quantity: 3}];

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
    console.log(cart);
    }
}