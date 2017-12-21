#CryptoProof
CryptoProof is an easy way to generate proof you own a specific bitcoin wallet by signing a message with the wallet's private key. When you sign a **message** with a **private key** it generates a **signature**.

You can also use CryptoProof to verify someone else's ownership of a specific wallet address. You can combine a **wallet address** (aka a  public key), the **message**, and compare it to a **signature** supplied by the individual in question. The verifier will return either true or false (verified or unverified, respectively).

If someone proves ownership to me by giving me a wallet address, a message, and a signature, can't I turn around and go "prove" to someone else I own that wallet address?
Yes, you could try, but they would correctly not accept it as proof if they understands how hashing works.
The verifying party should *always* supply their own unique message when asking for proof of ownership.

To build & use:
```
make build
open index.html
```
During development:
```
make watch
```


-------
Please contribute if you are interested!