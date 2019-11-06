    // ➤ app (Server)
    //     🡇
    //   Client
    //     🡇
    //   ethereum (Smart Contract)
    //     🡇
    //   Oracle



const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./../index'); // Ejecucion de la aplicacion


//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));


//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/saveURL', (req, res) => {
    var pagina = "";
    const URL = req.body.url;

    if (validURL(URL)) {
        index.run(URL);
        pagina += ' <!DOCTYPE html>';
        pagina += '<html>';
        pagina +=   '<header>';
        pagina += '<meta charset="UTF-8">';
        pagina += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';
        pagina += '<link rel="stylesheet" href="style.css">';
        pagina += '<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>';
        pagina += '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>';
        pagina += '<title> Save My Evidence </title>';
        pagina += '</header>';
        pagina += '<body>';

        pagina += '<div class="parallax"></div>';
        pagina += '<div id="site-description">';
        pagina += '<div id="site-description-text">';
        pagina += '<h2 id="title"> URL Guardada correctamente </h2>';
        pagina += 'La URL: <b>'+ URL + '</b> ha sido guardada correctamente, consulta Ganache para ver el resultado.';
        pagina += '<br> <a id="link1" href="index.html"> Volver a inicio </a>';
        pagina += '</div>';
        pagina += '</div>';
        pagina += '</body>';
        pagina += '</html>' ;

    } else {
        
        res.redirect('/');
    }

    res.send(pagina);
})



// Comprobamos que el usuario introduce URL válida
function validURL(str) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return str.match(regex);
}



const server = app.listen(8888, () => {
    console.log('Servidor web iniciado');
});