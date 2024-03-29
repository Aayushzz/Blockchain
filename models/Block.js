const crypto = require("crypto");


class Block {
  constructor(prevHash, transaction, ts = Date.now()) {
    this.prevHash = prevHash;
    this.transaction = transaction;
    this.ts = ts;
    this.nonce = Math.round(Math.random() * 999999999);
  }

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    return hash.digest("hex");
  }
}

module.exports = Block;
