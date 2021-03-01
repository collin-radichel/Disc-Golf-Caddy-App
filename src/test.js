

//TDD  -- TEST DRIVEN DEVELOPMENT
import sum from './sum.js';

// write a function that takes in 2 numbers and returns sum

describe('Testing the sum module', () => {
// pass in 2 numbers, 1 and 1, expect 2 as sum
    test('sum of two integers positive', () => {
        expect(sum(1,1)).toBe(2);
    })
// -1 and 1, expect 0
test('sum of two integers negative', () => {
    expect(sum(-1,1)).toBe(0);
})
// 0.5 and 1, expect 1.5
test('sum involving decimals', () => {
    expect(sum(0.5,1)).toBe(1.5);
})
// '1' and 2, expect 3
test('sum involving strings', () => {
    expect(sum('1',2)).toBe(3);
})
// 1, expect 1
test('sum of one number', () => {
    expect(sum(1)).toBe(1);
})
// 0.5, expect 0.5
test('sum of one fractional number', () => {
    expect(sum(0.5)).toBe(0.5);
})
// 'ten' and 1, expect NaN
test('sum involving text of number', () => {
    expect(sum('ten',1)).toBe(NaN);
})
// 'twelve' and 'forty', expect 52
test('sum involving text of number', () => {
    expect(sum('five','four')).toBe(NaN);
})
})