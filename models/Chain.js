const crypto = require("crypto");
const Block = require("./Block");
const Transaction = require("./transaction");

class Chain {
  constructor() {
    this.chain = [new Block("", new Transaction(100, "genesis", "satoshi"))];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce) {
    let solution = 1;
    console.log("⛏️  mining...");
    while (true) {
      const hash = crypto.createHash("MD5");
      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest("hex");
      if (attempt.substr(0, 4) === "0000") {
        console.log(`Solved: ${solution}`);
        return solution;
      }
      solution += 1;
    }
  }

  addBlock(transaction, senderPublicKey, signature) {
    const verify = crypto.createVerify("SHA256");
    verify.update(transaction.toString());
    const isValid = verify.verify(senderPublicKey, signature);
    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
  }
}

Chain.instance = new Chain();
module.exports = Chain;
