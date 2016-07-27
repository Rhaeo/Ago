//importScripts("/SCripts/Libraries/require@2.2.0.min.js", "/Scripts/Helpers/Encryption.js");
importScripts("/Scripts/Libraries/crypto-js-rollups-aes@3.1.2.min.js", "/Scripts/Libraries/crypto-js-rollups-pbkdf2@3.1.2.min.js");
self.addEventListener("message", function (event) {
    var origin = event.origin;
    // TODO: Check origin for localhost, Azure websites page and Ago.today.
    // TODO: This is high priority, currently data leaks.
    switch (event.data.type) {
        case "encrypt":
            {
                self.postMessage(event.data.message.startMessage);
                self.postMessage(Object.assign(event.data.message.endMessage, encrypt(event.data.message.cleartext, event.data.message.passphrase)));
                break;
            }
        case "decrypt":
            {
                self.postMessage(event.data.message.startMessage);
                self.postMessage(Object.assign(event.data.message.endMessage, decrypt(event.data.message.cyphertext, event.data.message.passphrase, event.data.message.salt, event.data.message.iv)));
                break;
            }
        default:
            {
                throw new Error("Yo " + event.data.type);
            }
    }
});
var iterations = 100;
var encrypt = function (cleartext, passphrase) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512 / 32, iterations: iterations });
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    var crypto = CryptoJS.AES.encrypt(cleartext, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return { cyphertext: crypto.toString(), salt: salt.toString(), iv: iv.toString() };
};
var decrypt = function (cyphertext, passphrase, salt, iv) {
    var key = CryptoJS.PBKDF2(passphrase, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations: iterations });
    var crypto = CryptoJS.AES.decrypt(cyphertext, key, { iv: CryptoJS.enc.Hex.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return { cleartext: crypto.toString(CryptoJS.enc.Utf8) };
};
//# sourceMappingURL=AgoWorker.js.map