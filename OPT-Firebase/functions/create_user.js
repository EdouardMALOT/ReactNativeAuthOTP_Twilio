const admin = require("firebase-admin");

module.exports = (req, res) => {
    //Vérify req contain phone
        if(!req.body.phone) {
            res.status(422).send({ error: 'phone number is require'});
        }

    //Format phone numer
        const phone = String(req.body.phone).replace(/[^\d]/g, "");   //cast to string in any cases and replace non digits

    //Create a ne user accont
        admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));
}