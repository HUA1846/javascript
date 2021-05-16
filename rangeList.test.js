const RangeList = require('./rangeList');
let r1 = new RangeList();

test('test add range', () => {
    expect(r1.add([1,5])).toEqual([[1,5]]);
})

test('test add range', () => {
    expect(r1.add([10,20])).toEqual([[1,5], [10,20]]);
})

test('test add range', () => {
    expect(r1.add([20,20])).toEqual([[1,5], [10,20]]);
})

test('test add range', () => {
    expect(r1.add([20,21])).toEqual([[1,5], [10,21]]);
})

test('test add range', () => {
    expect(r1.add([2,4])).toEqual([[1,5], [10,21]]);
})

test('test add range', () => {
    expect(r1.add([3,8])).toEqual([[1,8], [10,21]]);
})

test('test remove range', () => {
    expect(r1.remove([10,10])).toEqual([[1,8], [10,21]]);
})

test('test remove range', () => {
    expect(r1.remove([10,11])).toEqual([[1,8], [11,21]]);
})

test('test remove range', () => {
    expect(r1.remove([15,17])).toEqual([[1,8], [11,15], [17,21]]);
})

test('test remove range', () => {
    expect(r1.remove([3,19])).toEqual([[1,3], [19,21]]);
})


