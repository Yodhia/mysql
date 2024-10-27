const express = require ('express');
const hbs = require ('hbs');
const wax = require ('wax-on');
require('dotenv').config();
const { createConnection } = require('mysql2/promise');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlerbars);
wax.setLayoutPath('./views/layouts');

let connection;

async function main() {
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.BD_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    })
    app.get('/', (req,res)=> {
        res.send('Hello,world!')
    });
    
    app.listen(3000,()=>{
        console.log('Server is running')
    });
}

main();


