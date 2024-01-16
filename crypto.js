
const Chain = require('./models/Chain');
const Wallet = require('./models/Wallet');

const satoshi = new Wallet();
const John = new Wallet();
const Doe = new Wallet();

satoshi.sendMoney(50, John.publickey);
John.sendMoney(23, Doe.publickey);
Doe.sendMoney(15, John.publickey);

console.log(Chain.instance);