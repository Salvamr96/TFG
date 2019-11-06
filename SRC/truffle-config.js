// ARCHIVO DE CONFIGURACION

module.exports = {
  
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "5777", // Network ID de Ganache-gui, para cualquiera poner "*"
      gas: 6721975
    },
  }
  
};