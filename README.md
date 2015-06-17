## Gibberish-LibSodium

This is a simple example of how to use LibSodium to encrypt data with a key. This will work in both
the browser and Node/io.js

#### Advantage of using LibSodium

- Includes an scrypt function for key derivation
- Encryption function is authenticated
- LibSodium is well maintained at the moment and gaining traction

### Installation/Setup

    git clone repo
    cd repo
    make

### Using it in the browser

    <script src="../dist/gibberish-libsodium.js"> </script>
    <script>
      var encrypted = window.gibberish.enc("secret message", "password");
      console.log(gibberish.dec(encrypted, "password")
    </script>
