var gibberish = window.gibberish_libsodium;
var assert = window.chai.assert;

describe('Encryption', function(){
  it('should encrypt a message', function(){
    assert.ok(gibberish.enc("message", "password").length > 0);
    assert.ok(gibberish.encrypt("message", "password").length > 0);
    assert.ok(typeof gibberish.encrypt("message", "password") === 'string');
  })
})

describe('Decryption', function(){
  it('should decrypt a message', function(){
    var plaintext = "message";
    var encoded = gibberish.enc(plaintext, "password");
    // Check the API
    assert.equal(gibberish.dec(encoded, "password"), plaintext);
    assert.equal(gibberish.decrypt(encoded, "password"), plaintext);
  });
});

