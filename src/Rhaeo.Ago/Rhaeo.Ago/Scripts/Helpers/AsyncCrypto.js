define(["require", "exports"], function (require, exports) {
    "use strict";
    var AsyncCrypto;
    (function (AsyncCrypto) {
        let idCounter = 0;
        const deferreds = {};
        const encryptCacheKeys = {};
        const encryptCache = {};
        const decryptCacheKeys = {};
        const decryptCache = {};
        const worker = new Worker("/Scripts/Workers/AgoWorker.js");
        worker.addEventListener("message", event => {
            const message = event.data;
            switch (message.type) {
                case 0 /* EncryptionResponse */:
                    {
                        const id = message.id;
                        delete message.type;
                        delete message.id;
                        const deferred = deferreds[id];
                        const encryption = message;
                        encryptCache[encryptCacheKeys[id]] = encryption;
                        delete encryptCacheKeys[id];
                        deferred.resolve(encryption);
                        break;
                    }
                case 1 /* DecryptionResponse */:
                    {
                        const id = message.id;
                        delete message.type;
                        delete message.id;
                        const deferred = deferreds[id];
                        const decryption = message;
                        decryptCache[decryptCacheKeys[id]] = decryption;
                        delete decryptCacheKeys[id];
                        deferred.resolve(decryption);
                        break;
                    }
            }
        });
        worker.addEventListener("error", event => {
            alert(event.error);
        });
        function makeDeferred(id) {
            const deferred = Promise["defer"]();
            deferreds[id] = deferred;
            return deferred;
        }
        AsyncCrypto.encrypt = (cleartext, passphrase) => {
            const key = cleartext + passphrase;
            if (encryptCache[key]) {
                return Promise["resolve"](encryptCache[key]);
            }
            const id = idCounter++;
            encryptCacheKeys[id] = key;
            const deferred = makeDeferred(id);
            worker.postMessage({ type: 0 /* EncryptionRequest */, id: id, cleartext: cleartext, passphrase: passphrase });
            return deferred.promise;
        };
        AsyncCrypto.decrypt = (cyphertext, passphrase, salt, iv) => {
            const key = cyphertext + salt + iv;
            if (decryptCache[key]) {
                return Promise["resolve"](decryptCache[key]);
            }
            const id = idCounter++;
            decryptCacheKeys[id] = key;
            const deferred = makeDeferred(id);
            worker.postMessage({ type: 1 /* DecryptionRequest */, id: id, cyphertext: cyphertext, passphrase: passphrase, salt: salt, iv: iv });
            return deferred.promise;
        };
    })(AsyncCrypto = exports.AsyncCrypto || (exports.AsyncCrypto = {}));
});
//# sourceMappingURL=AsyncCrypto.js.map