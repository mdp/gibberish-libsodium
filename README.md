## Gibberish-LibSodium

This is a simple example of how to use LibSodium to encrypt data with a key. This will work in both
the browser and Node/io.js - See the example code [here](https://github.com/mdp/gibberish-libsodium/blob/master/index.js)

#### Advantage of using LibSodium

- Includes an scrypt function for key derivation
- Encryption function is authenticated
- LibSodium is well maintained at the moment and gaining traction

### Devlopment Setup

    git clone repo
    cd repo
    make
