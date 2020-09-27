// NOTE: Automock is also turned on. So please import then all the functions from the module to be tested. 
// Format and Sample, respectively, below:
// const <app_name> = require('<path to js file tested>')
// const cart = require('../models/cart')

describe('This is a Unit Test Group', () => {
   describe('This is a Unit Test Subgroup', () => {
        test('This is the test function #1', () => {
            let hello = 0;
            const ExpectedCount = 1;

            hello = 1;

            expect(hello).toEqual(ExpectedCount);
        });
   }); 
});

describe('This is another Unit Test Group', () => {
    describe('This is a unit Test Subgroup in the other Unit Test Group', () => {
        test('This is a mock function test', () => {
            const mock = jest.fn(() => "bar");

            expect(mock(("foo"))).toBe("bar");
        })
    })
});

describe('This is an outline for a Unit Test for a function', () => {
    describe('This is a subgroup in the Function Unit Test', () => {
        test('This is a REAL mock function test', () => {
            // Following the cart example above, here's how a mock function unit test would look like
            // cart.add(value1, value2)
            // expect(card.add).toHaveBeenCalledWith(1, 2);
        })
    })
})