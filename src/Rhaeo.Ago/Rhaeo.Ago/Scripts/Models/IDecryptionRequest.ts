interface IDecryptionRequest {
  cyphertext: string;
  passphrase: string;
  salt: string;
  iv: string;
}
