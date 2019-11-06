// CLIENTE

    //   app (Server)
    //     🡇
    // ➤ Client
    //     🡇
    //   ethereum (Smart Contract)
    //     🡇
    //   Oracle


const ethereum = require("./ethereum");

// ethereum.web3.eth.defaultAccount = ethereum.web3.eth.accounts[1]; // Añadir cuenta por defecto
const account_to_use = 0; // Cuenta para usar con el Client


var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = ethereum.web3.eth.accounts[account_to_use]; // Añadir cuenta por defecto

// console.log("Cuenta del cliente: ", ethereum.web3.defaultAccount);

var datosObtenidos = function (callback) {

    return new Promise(function(resolve, reject){
    
            ethereum.account(account_to_use).then(function(){ 
                resolve(
                    callback(ethereum.contract.datosObtenidos)
                );  
            }).catch(error => reject(error));
                
    }).catch(function(error){
        console.log(error);
    });
};


// Inicio del cliente
module.exports.startClient = function (urlFormuario) {
    
    // Asignamos fecha de hoy
    let fecha = (new Date()).getTime(); // Fecha en formato normal
    let fecha_unix = fecha / 1000; // Fecha en formato unix

// Ejecuta la función del SC para guardar la URL
    ethereum.contract.solicitarDatos(urlFormuario, fecha_unix);

// Se mantiene escuchando al evento con el hash obtenido
   return datosObtenidos(function (res, error) {
            if (error) {
                 console.log(error);
            }
        }
    ).catch(function(error){
        console.log(error);
    });
};

