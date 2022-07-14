const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const {login, register, addDuck} = require('./controller.js')

app.post('/api/login', login)
app.post('/api/register', register)
app.put('/api/ducks/:username', addDuck)

app.listen(6006,() => console.log('Quacking on port 6006'))