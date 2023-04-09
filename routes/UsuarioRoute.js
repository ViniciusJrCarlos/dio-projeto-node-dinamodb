const express = require('express');
const router = express.Router();
const { salvar, remover, alterar, buscarPorEmailSenha  } = require('../database/UsuarioDB');

router.post('/', async (req, res) => {

    if(req.body && req.body.email && req.body.nome && req.body.senha) {

        const cadastro = await salvar(req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({mensagem: "Usuario não cadastrado"});

});

router.delete('/', async (req, res) => {

    if(validarRequestBody(req)) {

        const sucesso = await remover(req.body.id, req.body.email);
        return res.send({sucesso: sucesso});
    }

    return res.status(404).json({mensagem: "Usuário não encontrado"});

});

router.put('/', async(req, res) => {

    if(validarRequestBody(req)) {

        const dados = await alterar(req.body);

        return res.send(dados);

    }
    return res.status(404).json({mensagem: "Usuario nao encontrado"});

});

router.post('/login', async(req, res) => {

    const dados = await buscarPorEmailSenha(req.body.email, req.body.senha);

    if(dados){

        return res.send(dados);


    }
    return res.status(404).json({mensagem: "Usuario não encontrado"});

});


function validarRequestBody(request){

    return request.body && request.body.id && request.body.email; 
}



module.exports = router;