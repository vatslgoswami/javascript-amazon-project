import { priceFormat } from "../scripts/utils/money.js";

export let products = [];

export class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  };

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  };

  getPrice(){
    return `$${priceFormat(this.priceCents)}`;
  };

  extraInfoHTML(){
    return ''
  }
}

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  };

  extraInfoHTML(){
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart Link</a>`;
  }
}

export class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  };

  extraInfoHTML(){
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

export function loadProducts(fun1){
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', ()=>{
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance'){
        return new Appliance(productDetails); 
      }
      return new Product(productDetails);
    });
    fun1();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};
