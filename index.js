const express = require ('express');
const hbs = require ('hbs');
const wax = require ('wax-on');
require('dotenv').config();
const { createConnection } = require('mysql2/promise');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// require in handlebars and their helpers
const helpers = require('handlebars-helpers');
// tell handlebars-helpers where to find handlebars
helpers({
    'handlebars': hbs.handlebars
});

let connection;

async function main() {
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    })
    
    app.get('/classes', async (req,res)=> {
        let [classes] = await connection.execute('SELECT * FROM classes INNER JOIN teachers ON classes.teacher_id = teachers.teacher_id');
        res.render('classes/index', {
            'classes' : classes
        })
    })

    app.get('/create-students', async function(req,res) {
        res.render('create-students')
    })

    app.post('/students/create', async(req,res) =>{
        let {first_name, last_name, dob, gender} = req.body;
        let query = 'INSERT INTO students (first_name, last_name, dob, gender) VALUES (?, ?, ?, ?)';
        let bindings = [first_name, last_name, dob, gender];
        await connection.execute(query, bindings);
        res.redirect('/students');
    });

    app.get('/students', async (req, res) => {
        let [students] = await connection.execute('SELECT * FROM students');
        res.render('students/index', { students });
    });
    
    app.listen(3000,()=>{
        console.log('Server is running')
    });
}

main();


