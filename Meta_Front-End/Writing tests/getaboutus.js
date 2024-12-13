const englishCode = "en-UK"
const germanCode = "de-DE"
function getAboutUsLink(language) {
    switch(language.toLowerCase()){
        case englishCode.toLowerCase():
            return "/about-us";
        case germanCode.toLowerCase():
            return "/über-uns";
    }
    return '';
}

module.exports = getAboutUsLink;