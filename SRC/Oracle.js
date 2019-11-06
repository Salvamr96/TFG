// ORACLE

    //   app (Server)
    //     🡇
    //   Client
    //     🡇
    //   ethereum (Smart Contract)
    //     🡇
    // ➤ Oracle


const request = require("request-promise-native");
const ethereum = require("./ethereum");
const utf8 = require('utf8');
const IPFS = require('ipfs-http-client');
const openpgp = require('openpgp');



// ethereum.web3.eth.defaultAccount = ethereum.web3.eth.accounts[0]; // Añadir cuenta por defecto
const account_to_use = 1; // Cuenta para usar con el Oracle
const TIMEOUT = 10000;


var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = web3.eth.accounts[account_to_use]; // Añadir cuenta por defecto



var node = new IPFS('localhost', '5001', { protocol: 'http'});      //IP:puerto de la Api de IPFS por defecto en el archivo de configuración
var sha256 = require('js-sha256'); // Necesario instalar paquete sha256

var obtenerDatosDeURL = function (callback) {

    return new Promise(function(resolve, reject){
    
            ethereum.account(account_to_use).then(function(){ 
                resolve(
                    callback(ethereum.contract.obtenerDatosDeURL) // Con el callback nos suscribimos al event
                );  
            }).catch(error => reject(error));
                
    }).catch(function(error){
        console.log(error);
    });
};


// Inicio del Oracle
module.exports.startOracle = async function (urlFormulario) {

    const options = {
        uri: urlFormulario,
        getURL : function(){
            return this.uri;
        }
    };

    await obtenerDatosDeURL(function (res, error) { // Nos suscribimos al event obtenerDatosDeURL
        if (error) {
            console.log(error);
        } else {
            obtenerDatosCallback(options); // Iniciamos el servicio
        }
    });
    // Escucha al evento obtenerDatosDeURL
    // cuando llega ejecutar callback obtenerDatosCallback
    // callback para obtenerDatosDeURL
}

async function obtenerDatosCallback(options){

    const html = await request(options);            //Solicitamos el HTML de la WEB
    const datosJSON = await obtenerJSON(html);      //Creamos el JSON que se mostrará en Ganache
    await guardarSolicitud(datosJSON)               //Enviamos los datos JSON
    .catch(error);
};


// TRANSACCION
async function guardarSolicitud(datosJSON){

    // TIMESTAMP
    let fecha = new Date().getTime();
    let fecha_unix = fecha / 1000;
    // Con el JSON guardado previamente
    // Asignamos los demas datos y guardamos toda a solicitud

    // DATOS JSON
    var datos = JSON.stringify(datosJSON);

    // VERSION
    var version = 1;

    ethereum.contract.guardarSolicitud(fecha_unix, datos, version)

};
async function obtenerWeb(data){                             
    var title = await data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    //var title = await data.match("<title>(.*?)</title>")[1];
    //var title = await (data).title;
    return title
};

async function linkipfs (cifrado) {
    files = await node.add(IPFS.Buffer.from(cifrado))              //Subimos el contenido de la web a nuestro 
    //nodo IPFS (necesario tener iniciado el daemon)
    
    var link = "https://ipfs.io/ipfs/" + files[0].hash;         //Devolvemos el enlace en un gateway público
    //console.log(link)
    //console.log(files)  

    return link

};

async function obtenerJSON(data){
    const numeroBits = 512
    const nombre = 'salva'
    const palabra_aleatoria = ' '       //PONER LA PALABRA QUE QUIERA EL USUARIO QUE SOLO LA SEPA ÉL.
    const [cifrado, claveprivada] = await cifrar(data, numeroBits, nombre, palabra_aleatoria)
    var datosJSON = {
        "WEB" : await obtenerWeb(data),                       
        "HASH" : await sha256(data),
        "DATOS" : await linkipfs(cifrado),
        "CLAVEPRIVADA" : await linkipfs(claveprivada),
    }
    console.log(datosJSON)
    return datosJSON    
};

//FUNCIONES PARA EL CIFRADO DEL HTML QUE SUBIMOS A IPFS

async function cifrar(mensaje, numeroBits, nombre, palabra_aleatoria){
    const claves = await crearclaves(numeroBits, nombre, palabra_aleatoria);
    const cifrar ={
      message: openpgp.message.fromText(mensaje),
      publicKeys: (await openpgp.key.readArmored(claves.publicKeyArmored)).keys
    }
      const cifrado = await encriptar(cifrar)
  
    return [cifrado.data, claves.privateKeyArmored]
  }

  async function crearclaves(numBits, userId, passphrase) {
    var key = openpgp.generateKey({
        numBits: numBits,
        userIds: [{ name: userId}],
        passphrase: passphrase
    });
    return key;
  }
  
  async function encriptar(options){
    var cifrado = openpgp.encrypt(options)
    return cifrado
  }

// Este JSON se puede actualizar con las diferentes versiones

var restart = function(){
    return wait(TIMEOUT).then(startOracle).catch(function(error){
        console.log(error);
    });
};

var wait = function(milliseconds){
    return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds))
        .catch(function(error){
            console.log(error);
        });
};

var error = function(error){
    console.error(error);
    restart().catch(function(error){
        console.log(error);
    });
};
