# Diseño e implementación de un entorno de gestión forense basado en Blockchain e IPFS

### Requisitos:
* Sistema operativo Windows 10.
* Firefox, Google Chrome, Brave, Opera.
* **NodeJS** (https://nodejs.org/es/download/)
* Extensión **Metamask** en el navegador.
* **Truffle** (https://www.github.com/trufflesuite/truffle)
* **Ganache** (https://www.github.com/trufflesuite/ganache)

#### Instalación de paquetes necesarios:
* npm install -g go-ipfs
* npm install request
* npm install js-sha256
* npm install web3@0.20.7
* npm install web3-providers-http
* npm install comment-json
* npm install express
* npm install body-parser
* npm install ipfs-http-client
* npm install openpgp

### Pasos a seguir:

* Abrir terminal modo administrador: <br>
&nbsp;&nbsp;&nbsp;&nbsp; $:\ > mkdir C:\SPB_Data\.ipfs <br>
&nbsp;&nbsp;&nbsp;&nbsp; $:\ > ipfs init <br>
&nbsp;&nbsp;&nbsp;&nbsp; $:\ > ipfs daemon 

* Abrir otra terminal: <br>
&nbsp;&nbsp;&nbsp;&nbsp;$:\SRC > ./recompile.sh <br>
&nbsp;&nbsp;&nbsp;&nbsp;Este comando compila los contratos del directorio **contracts/** con **Truffle**  <br>
&nbsp;&nbsp;&nbsp;&nbsp;$:\ganache > npm install <br>
&nbsp;&nbsp;&nbsp;&nbsp;$:\ganache > npm start <br>
&nbsp;&nbsp;&nbsp;&nbsp;Abrir el proyecto .../SRC/**truffle-config.js** con la interfaz de **Ganache**

* Importar cuenta de Ganache en Metamask con el mneumónico facilitado por Ganache.

* Abrir tercera terminal: <br>
&nbsp;&nbsp;&nbsp;&nbsp;$:\SRC > truffle developer <br>
&nbsp;&nbsp;&nbsp;&nbsp;truffle(develop) > migrate <br>
&nbsp;&nbsp;&nbsp;&nbsp;Con estos comandos migramos los contratos a la red de **Ganache** 

* En una cuarta terminal, ejecutar: <br>
&nbsp;&nbsp;&nbsp;&nbsp;$:\SRC\server >node app.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;Con este comando lanzamos el servidor <br>

* Dirigirse al navegador e introducir la dirección : localhost:8888 <br>

* En la interfaz web, pegar el enlace de la página cuyo contenido se desea almacenar, confirmar transacción con **Metamask** y ver el resultado en **Ganache**
