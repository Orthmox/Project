const getAboutUsLink = require('./getaboutus')

test ("Return about-us for German language", () => {
    expect(getAboutUsLink("de-DE")).toBe("/über-uns")
});