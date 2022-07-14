let users = require('./users.json');
let id = 2;

const bcryptjs = require('bcryptjs');

module.exports = {
    login: (req, res) => {
        const {username, password} = req.body;
        for(let i = 0; i < users.length; i++){
            if(users[i].username === username){
                const authenticated = bcryptjs.compareSync(password, users[i].password);

                if(authenticated === true){

                    let returned = {...users[i]};
                    delete returned.password;

                    res.status(200).send(returned)
                }
            }
        }
    },
    register: (req, res) => {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            res.status(400).send('Uh oh, something was invalid!')
        } else {

            const salt = bcryptjs.genSaltSync(5);
            const hashed = bcryptjs.hashSync(password, salt);
            console.log(hashed)

            let newUser = {
                id,
                username,
                email,
                password: hashed,
                ducks: []
            }
            users.push(newUser);
            id++;
            res.status(200).send('User successfully created!')
        }
        console.log(users)
    },
    addDuck: (req,res) => {
        for(let i = 0; i < users.length; i++){
            if(users[i].username === req.params.username){
                users[i].ducks.push(req.body.duck)
                res.status(200).send(users[i])
            }
        }
    }
}