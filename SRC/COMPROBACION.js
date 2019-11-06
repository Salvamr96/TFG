const request = require("request-promise-native");
const openpgp = require('openpgp');
const sha256 = require('js-sha256');

//Comprobamos que el contenido de la página almacenada en IPFS es el mismo que el almacenado en la blockchain mediante la comparación del hash ya que han
//de ser iguales.
async function desencriptar(descifrar){
    var descifrado = openpgp.decrypt(descifrar)
    return descifrado
  }


async function main (urldata, urlkey, palabra_aleatoria){
    const mensaje_cifrado = await request(urldata)
    const privada = await request(urlkey)
    const privKeyObj = (await openpgp.key.readArmored(privada)).keys[0]
    await privKeyObj.decrypt(palabra_aleatoria)
    const descifrar ={
        message: await openpgp.message.readArmored(mensaje_cifrado),
        privateKeys: [privKeyObj]
      }
    const descifrado = await desencriptar(descifrar)
    const hash = await sha256(descifrado.data)
    console.log(descifrado)
    console.log(hash)

}
const DATOS = 'http://localhost:8080/ipfs/QmdLRBtxHNm2CirRdczEc4vSrN5XrGjNWvLbwcTNfkPTUf'
const CLAVEPRIVADA = 'http://localhost:8080/ipfs/QmQhk3wXrxdXrT8jKecV8y7x78KFnpioto313jYpNNmoeg'
const STRING = ' '      //PALABRA CON LA QUE SE CIFRASE LA CLAVE PRIVADA
main(DATOS, CLAVEPRIVADA, STRING)




