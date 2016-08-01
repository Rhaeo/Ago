export module AsyncCrypto {
  let idCounter = 0;
  const deferreds: { [id: number]: IDeferred<any> } = {};
  const encryptCacheKeys: { [id: number]: string } = {};
  const encryptCache: { [key: string]: IEncryption } = {};
  const decryptCacheKeys: { [id: number]: string } = {};
  const decryptCache: { [key: string]: IDecryption } = {};
  const worker = new Worker("/Scripts/Workers/AgoWorker.js");

  worker.addEventListener("message",
    event => {
      const message = event.data as IMessage;
      switch (message.type) {
        case MessageTypes.EncryptionResponse:
          {
            const id = message.id;
            delete message.type;
            delete message.id;
            const deferred = deferreds[id] as IDeferred<IEncryption>;
            const encryption = ((message as IEncryptionMessage) as IEncryption);
            encryptCache[encryptCacheKeys[id]] = encryption;
            delete encryptCacheKeys[id];
            deferred.resolve(encryption);
            break;
          }
        case MessageTypes.DecryptionResponse:
          {
            const id = message.id;
            delete message.type;
            delete message.id;
            const deferred = deferreds[id] as IDeferred<IDecryption>;
            const decryption = ((message as IDecryptionMessage) as IDecryption);
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
    const deferred = makeDeferred<IEncryption>(id);
    worker.postMessage({ type: MessageTypes.EncryptionRequest, id, cleartext, passphrase } as IEncryptionRequestMessage);
    return deferred.promise;
  }

  export const decrypt = (cyphertext: string, passphrase: string, salt: string, iv: string) => {
    const key = cyphertext + salt + iv;
    if (decryptCache[key]) {
      return Promise["resolve"](decryptCache[key]);
    }

    const id = idCounter++;
    decryptCacheKeys[id] = key;
    const deferred = makeDeferred<IDecryption>(id);
    worker.postMessage({ type: MessageTypes.DecryptionRequest, id, cyphertext, passphrase, salt, iv } as IDecryptionRequestMessage);
    return deferred.promise;
  }
}
