const addfive = require('./addFive');

test("returns number plus 5", () => {
    expect(addfive(1)).toBe(6);
})