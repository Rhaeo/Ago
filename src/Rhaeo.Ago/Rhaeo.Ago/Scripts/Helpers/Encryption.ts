/// <reference path="./../../Typings/promise/promise.d.ts" />

const iterations = 100;

// ReSharper disable once InconsistentNaming
declare const CryptoJS: any;

const decryptCache: { [key: string]: string; } = {};

export const encrypt = (cleartext: string, passphrase: string) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512 / 32, iterations });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const crypto = CryptoJS.AES.encrypt(cleartext,
        key,
        { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return { cyphertext: crypto.toString(), salt: salt.toString(), iv: iv.toString() };
};

export const decrypt = (cyphertext: string, passphrase: string, salt: string, iv: string) => {
    if (decryptCache[cyphertext + passphrase + salt + iv] !== undefined) {
        return decryptCache[cyphertext + passphrase + salt + iv];
    }

    const key = CryptoJS.PBKDF2(passphrase, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations });
    const crypto = CryptoJS.AES.decrypt(cyphertext,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    decryptCache[cyphertext + passphrase + salt + iv] = crypto.toString(CryptoJS.enc.Utf8);
    return crypto.toString(CryptoJS.enc.Utf8);
};
