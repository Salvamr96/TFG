const startClient = require("./Client");
const startOracle = require("./Oracle");


module.exports.run = function (urlFormulario) {

    startOracle.startOracle(urlFormulario);
    startClient.startClient(urlFormulario);
    
};

