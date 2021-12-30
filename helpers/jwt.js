const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.WEBSECRETKEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('NO s epudo validar token');
            }

            resolve(token);
        })
    });
}

module.exports = {
    generarJWT
}