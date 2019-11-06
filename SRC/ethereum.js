// ###### ARCHIVO DE CONEXIÓN CON WEB3 ######
// ###### CREACIÓN DEL SMART CONTRACT ######


    //   app (Server)
    //     🡇
    //   Client
    //     🡇
    // ➤ ethereum (Smart Contract)
    //     🡇
    //   Oracle


// Necesario tener instalada una version web3 < 1, ya que en la 1 no se puede 
// usar ningun provider y hay que usar sockets que aún no están disponibles

// npm install web3@0.20.7

// Creamos la conexión
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// web3.eth.defaultAccount = web3.eth.accounts[0]; // Añadir cuenta por defecto


// Creamos el contrato

const abi =  [ { "constant": true, "inputs": [], "name": "oracleAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_oracleAddress", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "URL_solicitada", "type": "string" }, { "indexed": false, "name": "currentDate", "type": "uint256" } ], "name": "obtenerDatosDeURL", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "timestamp", "type": "uint256" }, { "indexed": false, "name": "datosJSON", "type": "string" }, { "indexed": false, "name": "version", "type": "uint128" } ], "name": "datosObtenidos", "type": "event" }, { "constant": false, "inputs": [ { "name": "URL_solicitada", "type": "string" }, { "name": "currentDate", "type": "uint256" } ], "name": "solicitarDatos", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "timestamp", "type": "uint256" }, { "name": "datosJSON", "type": "string" }, { "name": "version", "type": "uint128" } ], "name": "guardarSolicitud", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ] 
const address =  '0xD67D7F7465aBB2A610Bc926c8BaBf930903622d6'; // Direccion del SC
const contract = web3.eth.contract(abi).at(address); 


// Exportamos variables
module.exports.contract = contract;
module.exports.web3 = web3;


// Seleccionar la cuenta a usar
module.exports.account = function (account_to_use) {
    
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            if (err === null) {            
                resolve(accounts[account_to_use]);
            } else {
                reject(err);
            }
        });
       
    }).catch(function(error){
        console.log(error);
    });
};


