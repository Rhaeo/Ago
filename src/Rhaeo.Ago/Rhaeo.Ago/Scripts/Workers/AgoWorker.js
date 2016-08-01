//importScripts("/SCripts/Libraries/require@2.2.0.min.js", "/Scripts/Helpers/Encryption.js");
importScripts("/Scripts/Libraries/crypto-js-rollups-aes@3.1.2.min.js", "/Scripts/Libraries/crypto-js-rollups-pbkdf2@3.1.2.min.js");
self.addEventListener("message", event => {
    const message = event.data;
    switch (message.type) {
        case 0 /* EncryptionRequest */:
            {
                const message2 = message;
                const encryption = encrypt(message2.cleartext, message2.passphrase);
                self.postMessage(Object.assign({ type: 1 /* EncryptionResponse */, id: message.id }, encryption));
                break;
            }
        case 2 /* DecryptionRequest */:
            {
                const message2 = message;
                const decryption = decrypt(message2.cyphertext, message2.passphrase, message2.salt, message2.iv);
                self.postMessage(Object.assign({ type: 3 /* DecryptionResponse */, id: message.id }, decryption));
                break;
            }
        default:
            {
                throw new Error(`Unknown crypto worker message type: ${message.type}`);
            }
    }
});
const iterations = 100;
function encrypt(cleartext, passphrase) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512 / 32, iterations: iterations });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const options = { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    const crypto = CryptoJS.AES.encrypt(cleartext, key, options);
    return { cyphertext: crypto.toString(), salt: salt.toString(), iv: iv.toString() };
}
;
function decrypt(cyphertext, passphrase, salt, iv) {
    const key = CryptoJS.PBKDF2(passphrase, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations: iterations });
    const iv2 = CryptoJS.enc.Hex.parse(iv);
    const options = { iv: iv2, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    const crypto = CryptoJS.AES.decrypt(cyphertext, key, options);
    return { cleartext: crypto.toString(CryptoJS.enc.Utf8) };
}
;
//# sourceMappingURL=AgoWorker.js.map