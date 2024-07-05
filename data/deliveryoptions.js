import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: 1, days: 7, priceCents: 0
}, {
    id: 2, days: 5, priceCents: 499
},{
    id: 3, days: 1, priceCents: 999
}]

 export function findDeliveryDatebyID(deliveryID){
    const today = dayjs();
    let dateString
    deliveryOptions.forEach((option)=>{
        if (option.id === deliveryID){
        let daysToAdd = option.days;
        let deliveryDate = today
        while (daysToAdd>0){
            deliveryDate = deliveryDate.add(1, 'days');
            let deliveryDateString = deliveryDate.format('dddd');
            if (deliveryDateString != 'Saturday' && deliveryDateString != 'Sunday'){
                daysToAdd -=1;
            }
        }
            dateString = deliveryDate.format('dddd, MMMM D');
        }
    });
    return dateString;
}
