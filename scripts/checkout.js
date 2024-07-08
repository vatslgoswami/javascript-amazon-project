import {cart, saveToStorage, calculateCartQty, updateQuantity} from '../data/cart.js'; 
import { generateOrderSummary, setHeaderItemsQty } from './checkout/ordersummary.js';
import generatePaymentSummary from './checkout/paymentsummary.js';
import { loadProducts } from '../data/products.js';

loadProducts(()=>{
    generateOrderSummary();
    generatePaymentSummary();
});