const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
    numbers = [1,2,3,4,5];
})

it('Should sum an array', () => {
    let total = 0;
    forEach(numbers, (value) => {
        total += value;
    });

    assert.strictEqual(total, 15);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
});

it('beforeEach is running each time', () => {
    assert.strictEqual(numbers.length, 5);
})