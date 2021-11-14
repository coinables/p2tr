const bitcoin = require('bitcoinjs-lib')
const ecurve = require('ecurve')
const secp256k1 = ecurve.getCurveByName('secp256k1')
const schnorr = require('bip-schnorr')
const bech32 = require('bech32').bech32
const bech32m = require('bech32').bech32m

function getP2TRAddress(keyPair, network) {
  const pubKey = ecurve.Point.decodeFrom(secp256k1, keyPair.getPublicKeyBuffer())
  const taprootPubkey = schnorr.taproot.taprootConstruct(pubKey)
  const words = bech32.toWords(taprootPubkey)
  words.unshift(1)
  return bech32m.encode('bc',words)
}

module.exports = {
  getP2TRAddress
}
