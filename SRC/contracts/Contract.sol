pragma solidity ^0.5.0;


// PARA TENER UNA INSTANCIA CON LA QUE HACER PRUEBAS EN TRUFFLE
// Contract.deployed().then(inst => { instance = inst })


contract Contract {

    address public oracleAddress; // Para comprobar que la respuesta del oraculo realmente proviene de el

    constructor(address _oracleAddress) public {
        oracleAddress = _oracleAddress; // Direccion del oraculo
    }



    // Suscribirse a un evento desde el client y a otro desde el oracle
    // Lo escucha el Oracle
    event obtenerDatosDeURL(string URL_solicitada, uint256 currentDate);

    // Lo escucha el Client
    event datosObtenidos(uint256 timestamp, string datosJSON, uint128 version);


    // Función que llama el cliente para solicitar que la url sea guardada

    function solicitarDatos(string memory URL_solicitada, uint256 currentDate) public payable { // payable -> Se realiza gasto de ETH

        // Evento al que escucha el Oraculo para realizar el callback (proceso de hasheo)
        emit obtenerDatosDeURL(URL_solicitada, currentDate);
    }


    // Función que llama el oraculo para guardar el hash calculado

    function guardarSolicitud(uint256 timestamp, string memory datosJSON, uint128 version) public {
        require(msg.sender == oracleAddress,
        "Solicitud no realizada por el Oraculo" // Mensaje de error
        ); // Dirección de quien envió la transaccion = Oracle address

        // Evento al que escucha el cliente para confirmar que el Hash ha sido guardado
        emit datosObtenidos(timestamp, datosJSON, version);
    }

}