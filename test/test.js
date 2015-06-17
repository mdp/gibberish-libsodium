var gibberish = require("../index")
var assert = require("assert")

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
  it('should fail to decrypt a bad message', function(){
    var badJSONMsg = "{keylen:"
    assert.throws(function(){
      gibberish.dec(badJSONMsg, "password");
    }, function(err){
      if ( (err instanceof Error) && /Syntax/.test(err) ) {
        return true;
      }
    });
  });
  it('should fail to decrypt a tampered with message', function(){
    var tamperedMsg = '{"nonce":"7PbgZcoqb6XdWJQN4/GNbnAVS/nZyEhv","salt":"8N1BshGXLMt4B9BGnnMdS6+jEOGhL0AnpfOfeHM5KWQ=","keylen":32,"scryptM":16777216,"scryptO":524288,"cipherText":"YDbAISs5cdFjQrM3hIW4Ix7fWUczBrM="}'
    assert.throws(function(){
      gibberish.dec(tamperedMsg, "password");
    }, function(err){
      if ( (err instanceof Error) && /Error/.test(err) ) {
        return true;
      }
    });
  })
});

