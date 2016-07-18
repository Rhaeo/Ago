/// <reference path="./../../Typings/promise/promise.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    var iterations = 100;
    var decryptCache = {};
    exports.encrypt = function (cleartext, passphrase) {
        var salt = CryptoJS.lib.WordArray.random(128 / 8);
        var key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512 / 32, iterations: iterations });
        var iv = CryptoJS.lib.WordArray.random(128 / 8);
        var crypto = CryptoJS.AES.encrypt(cleartext, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return { cyphertext: crypto.toString(), salt: salt.toString(), iv: iv.toString() };
    };
    exports.decrypt = function (cyphertext, passphrase, salt, iv) {
        if (decryptCache[cyphertext + passphrase + salt + iv] !== undefined) {
            return decryptCache[cyphertext + passphrase + salt + iv];
        }
        var key = CryptoJS.PBKDF2(passphrase, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations: iterations });
        var crypto = CryptoJS.AES.decrypt(cyphertext, key, { iv: CryptoJS.enc.Hex.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        decryptCache[cyphertext + passphrase + salt + iv] = crypto.toString(CryptoJS.enc.Utf8);
        return crypto.toString(CryptoJS.enc.Utf8);
    };
});
//# sourceMappingURL=Encryption.js.map