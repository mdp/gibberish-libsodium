var sodium = require("libsodium-wrappers");

var KEYLEN = sodium.crypto_secretbox_KEYBYTES,
MEMLIMIT = sodium.crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE,
OPSLIMIT = sodium.crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE;

exports.encrypt = function(message, password) {
  var nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES),
  salt = sodium.randombytes_buf(sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES),
  key = sodium.crypto_pwhash_scryptsalsa208sha256(password, salt, OPSLIMIT, MEMLIMIT, KEYLEN);

  var cipherObj =  {
    nonce: sodium.to_base64(nonce), salt: sodium.to_base64(salt), keylen: KEYLEN,
    scryptM: MEMLIMIT, scryptO: OPSLIMIT,
    cipherText: sodium.to_base64(sodium.crypto_secretbox_easy(message, nonce, key))
  }
  return JSON.stringify(cipherObj);
}

exports.decrypt = function(cipherTextJson, password) {
  var c = JSON.parse(cipherTextJson),
  salt = sodium.from_base64(c.salt),
  nonce = sodium.from_base64(c.nonce);

  var key = sodium.crypto_pwhash_scryptsalsa208sha256(password, salt, c.scryptO, c.scryptM, c.keylen);
  var decoded =  sodium.crypto_secretbox_open_easy(sodium.from_base64(c.cipherText), nonce, key);
  return sodium.to_string(decoded);
}

exports.dec = exports.decrypt; exports.enc = exports.encrypt;

