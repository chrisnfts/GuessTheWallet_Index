// toSeed function

var hmacSHA512 = function(key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
    this.encrypt = function() {
        return hasher.encrypt.apply(hasher, arguments);
    };
};


function toSeed(mnemonic) {

    var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonic);

    var passphraseBits = [1835951469,
        1869506915]

    var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits, 2048, 512, hmacSHA512);

    var hashHex = sjcl.codec.hex.fromBits(result);

    return hashHex;
}

// Event handlers

async function phraseChanged(phrase) {

    var network = libs.bitcoin.networks.bitcoin;

    // ^ SET :  seed / bip32RootKey | DONT RETURN ANYTHINK ... (NO ANY ERRORS)

    // calcBip32RootKeyFromSeed(phrase, passphrase);

    var seed = toSeed(phrase);
    //msx(seed)

    // ^ SET :  bip32ExtendedKey / and display info ( displayBip32Info  / displayBip84Info )

    // calcForDerivationPath();

    // ^ DerivationPath :
    // m/44'/0'/0'/0
    // m/84'/0'/0'/0

    var derivationPath = "m/84'/0'/0'/0"
    
    // ^ INSTED OF CREATE NEW VAR CALLED bip32RootKey abd took it from another function, put it dircte to argument 
    
    var bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
    
    var bip32ExtendedKey = calcBip32ExtendedKey(derivationPath, bip32RootKey);
    
    // GET THE DATA address or publicKey or privvateKey
    
    //displayBip32Info(bip32ExtendedKey, network);
    
        // ^ GET THE INFO

    var index = 0

    var key = bip32ExtendedKey.derive(index);
    var keyPair = key.keyPair;

    // get address
    var address = keyPair.getAddress().toString();

    // ^ THIS IS SO IMPORTANT TO CONVERT THE ADDRESSESS BTC OR M/84 ..

    var keyhash = libs.bitcoin.crypto.hash160(key.getPublicKeyBuffer());
    var scriptpubkey = libs.bitcoin.script.witnessPubKeyHash.output.encode(keyhash);
    address = libs.bitcoin.address.fromOutputScript(scriptpubkey, network)


    msx(`Address (${index} : ${address}`)
    return address

}

function calcBip32ExtendedKey(path, bip32RootKey) {

    var extendedKey = bip32RootKey;
    // Derive the key from the path
    var pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
        var bit = pathBits[i];
        var index = parseInt(bit);
        if (isNaN(index)) {
            continue;
        }
        var hardened = bit[bit.length-1] == "'";
        var isPriv = !(extendedKey.isNeutered());
        var invalidDerivationPath = hardened && !isPriv;
        if (invalidDerivationPath) {
            extendedKey = null;
        } else if (hardened) {
            extendedKey = extendedKey.deriveHardened(index);
        } else {
            extendedKey = extendedKey.derive(index);
        }
    }
    return extendedKey;
}