var bitcore = require('bitcore-lib');
var _ = bitcore.deps._;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var Address = bitcore.Address;
var BufferWriter = bitcore.encoding.BufferWriter;
var ECDSA = bitcore.crypto.ECDSA;
var Signature = bitcore.crypto.Signature;
var sha256sha256 = bitcore.crypto.Hash.sha256sha256;
var JSUtil = bitcore.util.js;
var $ = bitcore.util.preconditions;

/**
 * constructs a new message to sign and verify.
 *
 * @param {String} message
 * @returns {Message}
 */
var Message = function Message(message) {
  if (!(this instanceof Message)) {
    return new Message(message);
  }
  $.checkArgument(_.isString(message), 'First argument should be a string');
  this.message = message;

  return this;
};

Message.MAGIC_BYTES = new Buffer('Bitcoin Signed Message:\n');

Message.prototype.magicHash = function magicHash() {
  var prefix1 = BufferWriter.varintBufNum(Message.MAGIC_BYTES.length);
  var messageBuffer = new Buffer(this.message);
  var prefix2 = BufferWriter.varintBufNum(messageBuffer.length);
  var buf = Buffer.concat([prefix1, Message.MAGIC_BYTES, prefix2, messageBuffer]);
  var hash = sha256sha256(buf);
  return hash;
};

Message.prototype._sign = function _sign(privateKey) {
  $.checkArgument(privateKey instanceof PrivateKey,
    'First argument should be an instance of PrivateKey');
  var hash = this.magicHash();
  var ecdsa = new ECDSA();
  ecdsa.hashbuf = hash;
  ecdsa.privkey = privateKey;
  ecdsa.pubkey = privateKey.toPublicKey();
  ecdsa.signRandomK();
  ecdsa.calci();
  return ecdsa.sig;
};

/**
 * Will sign a message with a given bitcoin private key.
 *
 * @param {PrivateKey} privateKey - An instance of PrivateKey
 * @returns {String} A base64 encoded compact signature
 */
Message.prototype.sign = function sign(privateKey) {
  var signature = this._sign(privateKey);
  return signature.toCompact().toString('base64');
};

Message.prototype._verify = function _verify(publicKey, signature) {
  $.checkArgument(publicKey instanceof PublicKey, 'First argument should be an instance of PublicKey');
  $.checkArgument(signature instanceof Signature, 'Second argument should be an instance of Signature');
  var hash = this.magicHash();
  var verified = ECDSA.verify(hash, signature, publicKey);
  if (!verified) {
    this.error = 'The signature was invalid';
  }
  return verified;
};

/**
 * Will return a boolean of the signature is valid for a given bitcoin address.
 * If it isn't the specific reason is accessible via the "error" member.
 *
 * @param {Address|String} bitcoinAddress - A bitcoin address
 * @param {String} signatureString - A base64 encoded compact signature
 * @returns {Boolean}
 */
Message.prototype.verify = function verify(bitcoinAddress, signatureString) {
  $.checkArgument(bitcoinAddress);
  $.checkArgument(signatureString && _.isString(signatureString));

  if (_.isString(bitcoinAddress)) {
    bitcoinAddress = Address.fromString(bitcoinAddress);
  }
  var signature = Signature.fromCompact(new Buffer(signatureString, 'base64'));

  // recover the public key
  var ecdsa = new ECDSA();
  ecdsa.hashbuf = this.magicHash();
  ecdsa.sig = signature;
  var publicKey = ecdsa.toPublicKey();

  var signatureAddress = Address.fromPublicKey(publicKey, bitcoinAddress.network);

  // check that the recovered address and specified address match
  if (bitcoinAddress.toString() !== signatureAddress.toString()) {
    this.error = 'The signature did not match the message digest';
    return false;
  }

  return this._verify(publicKey, signature);
};

function setText(id, val) {
  document.getElementById(id).innerHTML = val;
}

document.getElementById("generate").onclick = function() {generateSignature()}
document.getElementById("verify").onclick = function() {verifySignature()}


function generateSignature() {
  console.log('generating')

  var message = document.getElementById('messageInput').value;

  var WIF = document.getElementById('WIFinput').value;
  setText('WIF', WIF);

  var privateKey = bitcore.PrivateKey.fromWIF(WIF);
  setText('privateKey', privateKey);

  var signature = Message(message).sign(privateKey);
  setText('signature', signature);

  document.getElementById('signatureInput').value = signature;
  document.getElementById('verifyMessageInput').value = message;

  
}

function verifySignature() {
  console.log('verifying')

  var walletAddress = document.getElementById('walletInput').value;
  var signature = document.getElementById('signatureInput').value;
  var message = document.getElementById('verifyMessageInput').value;

  var verified = Message(message).verify(walletAddress, signature);
  document.getElementById('verified').innerHTML = verified
}








