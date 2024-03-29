const crypto = require("crypto");
const Chain = require("./Chain");
const Transaction = require("./Transaction");

class Wallet {
  constructor() {
    const keypair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
      });
      this.privateKey = keypair.privateKey;
      this.publicKey = keypair.publicKey;
  }

  sendMoney(amount, payeePublicKey) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
    const sign = crypto.createSign("SHA256");
    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}

module.exports = Wallet;
