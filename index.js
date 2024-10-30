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
        let [classes] = await connection.execute('SELECT * from classes');
        res.render('students/index', { students });
    });

    app.get('/students/:student_id/edit', async (req,res)=>{
        let [students] = await connection.execute('SELECT * from students WHERE student_id =?',[req.params.student_id]);
        let student = students[0];
        res.render('students/edit', {
            'student': student
        })
    })

    app.post('/students/:student_id/edit', async (req, res) =>{
        let {first_name, last_name, dob, gender} = req.body;
        let student_id = req.params.student_id;
         // If dob is empty, set it to NULL
        dob = dob ? dob : null;
        let query = 'UPDATE students SET first_name=?, last_name=?, dob=?, gender=? WHERE student_id=?';
        let bindings = [first_name, last_name, dob, gender, student_id];
        await connection.execute(query, bindings);
        res.redirect('/students');
    });


    app.get('/students/:student_id/delete', async function (req,res){
        //display a confirmation form
        const[students] = await connection.execute(
            "SELECT * FROM students WHERE student_id=?", [req.params.student_id]
        );
        const student = students[0];
        res.render('students/delete',{
            student
        })
    })

    app.post('/students/:student_id/delete', async function (req,res){
        await connection.execute('DELETE FROM students WHERE student_id=?',[req.params.student_id]);
        res.redirect('/students');
    })


    app.listen(3000,()=>{
        console.log('Server is running')
    });
}

main();


