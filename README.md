CryptoProof
------
CryptoProof is an easy way to generate proof you own a specific bitcoin wallet by signing a message with the wallet's private key. When you sign a **message** with a **private key** it generates a **signature**.

You can also use CryptoProof to verify someone else's ownership of a specific wallet address. You can combine a **wallet address** (aka a  public key), the **message**, and compare it to a **signature** supplied by the individual in question. The verifier will return either true or false (verified or unverified, respectively).

If someone proves ownership to me by giving me a wallet address, a message, and a signature, can't I turn around and go "prove" to someone else I own that wallet address?

Yes, you could try, but they would correctly not accept it as proof if they understands how hashing works.
The verifying party should *always* supply their own unique message when asking for proof of ownership.



Contributing
-------
I welcome any contributions, enhancements, and bug-fixes. [File an issue](https://github.com/brennerspear/cryptoproof/issues) on GitHub and [submit a pull request](https://github.com/brennerspear/cryptoproof/pulls).

#### Building

To build the project locally on your computer:

Clone this repo <br>
`git clone https://github.com/brennerspear/cryptoproof.git`

Generate dist file<br>
`make build`
    
open in your browser<br>
`open index.html`

To watch files and generate sourcemaps for developing<br>
`make watch`

License
----
CryptoProof is 100% free and open-source, under the [MIT license](https://github.com/brennerspear/cryptoproof/blob/master/LICENSE). Use it however you want.
