const admin = require('firebase-admin');


module.exports = function(req, res) {
    
    //Verify phone and code
    if(!req.body.phone || !req.body.code) {
     res.status(422).send({ error: 'Phone and password must be provided'});   
    }

    //Format phone numer && code
    const phone = String(req.body.phone).replace(/[^\d]/g, "");   //cast to string in any cases and replace non digits
    const code = parseInt(req.body.code);


    admin.auth().getUser(phone)       //Check is user account exist
    .then( () => {

        //If user exist
        //-------------
            const ref = admin.database().ref('users/' + phone);

            ref.on('value', snapshot => {

                //Stop listening
                ref.off();

                //Get datas
                const data = snapshot.val();

                //Return error is code is unvalid or already validate
                if((data.code !== code) || (!data.codeValid) ) {
                    return res.status(422).send({ error: 'Code not valid' });
                }

                //Make the code no more valid
                ref.update({ codeValid: false });

                admin.auth().createCustomToken(phone)
                .then(token => res.send({ token: token}))
                .catch(err => res.send({ error: err}))

                return null;
            });

            return null;
    })
    .catch( (err) => res.status(422).send({ error: err}));

    





}