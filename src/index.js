var bitcore = require('bitcore-lib');
var Message = require('./message');

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








