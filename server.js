const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const usuarioRoute = require('./routes/UsuarioRoute');


app.use(bodyParser.json());
app.use('/usuario', usuarioRoute);

/*
teste feito para retornar usuario no terminal do vscode
app.get("/api/usuario", (req, res) => {

    return res.send({usuario:"admin", nome:"vinicius"});

});
*/

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

