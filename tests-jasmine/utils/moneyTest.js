import { priceFormat } from "../../scripts/utils/money.js";

describe('test suite: priceFormat Function', () => {
    it('converting from cents to dollars', () => {
        expect(priceFormat(2095)).toEqual('20.95');
    });
    describe('edge cases', () =>{
        it('handling 0', () => {
            expect(priceFormat(0)).toEqual('0.00');
        });
        it('rounding up a number', () => {
            expect(priceFormat(200.5)).toEqual('2.01');
        });
        it('rounding down a number', () => {
            expect(priceFormat(200.4)).toEqual('2.00');
        });
    })
    
});
