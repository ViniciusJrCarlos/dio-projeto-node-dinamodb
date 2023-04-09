const crypto = require('crypto');
const algoritmo = 'aes-256-ctr';
const chaveSecreta = '42uSm31^sHPviS#7@OFrNY02rsWsSF5$'; 

function encrypt(texto) {

    const iv  = crypto.randomBytes(16);
    const cifra = crypto.createCipheriv(algoritmo, chaveSecreta, iv);
    const encriptar = Buffer.concat([cifra.update(texto), cifra.final()]);

    return iv.toString('hex') + '_' + encriptar.toString('hex');

}

function decrypt(hash) {

    const decifrar = crypto.createCipheriv(algoritmo, chaveSecreta, Buffer.from(hash.iv, 'hex'));
    const decriptar = Buffer.concat([decifrar.update(Buffer.from(hash.content, 'hex')), decifrar.final()]);

    return decriptar.toString();

}

function getSenhaDecrypt(senhaEncrypt) {

    const senhaSplit = senhaEncrypt.split('_');
    return decrypt({iv: senhaSplit[0], content: senhaSplit[1]});


}

module.exports = {

    encrypt,
    decrypt,
    getSenhaDecrypt


};