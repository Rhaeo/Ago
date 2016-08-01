export module AsyncCrypto {
  let idCounter = 0;
  const deferreds: { [id: number]: IDeferred<any> } = {};
  const encryptCacheKeys: { [id: number]: string } = {};
  const encryptCache: { [key: string]: IEncryptionResponse } = {};
  const decryptCacheKeys: { [id: number]: string } = {};
  const decryptCache: { [key: string]: IDecryptionResponse } = {};
  const worker = new Worker("/Scripts/Workers/CryptoWorker.js");

  worker.addEventListener("message",
    event => {
      const message = event.data as IInboundMessage;
      switch (message.type) {
        case InboundMessageTypes.EncryptionResponse:
          {
            const id = message.id;
            delete message.type;
            delete message.id;
            const deferred = deferreds[id] as IDeferred<IEncryptionResponse>;
            const encryption = ((message as IEncryptionResponseMessage) as IEncryptionResponse);
            encryptCache[encryptCacheKeys[id]] = encryption;
            delete encryptCacheKeys[id];
            deferred.resolve(encryption);
            break;
          }
        case InboundMessageTypes.DecryptionResponse:
          {
            const id = message.id;
            delete message.type;
            delete message.id;
            const deferred = deferreds[id] as IDeferred<IDecryptionResponse>;
            const decryption = ((message as IDecryptionResponseMessage) as IDecryptionResponse);
            decryptCache[decryptCacheKeys[id]] = decryption;
            delete decryptCacheKeys[id];
            deferred.resolve(decryption);
            break;
          }
      }
    });

  worker.addEventListener("error",
    event => {
      alert(event.error);
    });

  function makeDeferred<T>(id: number) {
    const deferred = Promise["defer"]() as IDeferred<T>;
    deferreds[id] = deferred;
    return deferred;
  }

  export const encrypt = (cleartext: string, passphrase: string) => {
    const key = cleartext + passphrase;
    if (encryptCache[key]) {
      return Promise["resolve"](encryptCache[key]);
    }

    const id = idCounter++;
    encryptCacheKeys[id] = key;
    const deferred = makeDeferred<IEncryptionResponse>(id);
    worker.postMessage({ type: OutboundMessageTypes.EncryptionRequest, id, cleartext, passphrase } as IEncryptionRequestMessage);
    return deferred.promise;
  }

  export const decrypt = (cyphertext: string, passphrase: string, salt: string, iv: string) => {
    const key = cyphertext + salt + iv;
    if (decryptCache[key]) {
      return Promise["resolve"](decryptCache[key]);
    }

    const id = idCounter++;
    decryptCacheKeys[id] = key;
    const deferred = makeDeferred<IDecryptionResponse>(id);
    worker.postMessage({ type: OutboundMessageTypes.DecryptionRequest, id, cyphertext, passphrase, salt, iv } as IDecryptionRequestMessage);
    return deferred.promise;
  }
}
