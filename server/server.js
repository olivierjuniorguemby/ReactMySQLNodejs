import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ReactMySQLNodejs"
})

app.get('/', (req, res)=>{
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
});

app.post('/student',(req, res) =>{
    const sql = "INSERT INTO students (`Name`, `Email`) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
});

app.get('/read/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE ID = ?";
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    });
});

app.put('/update/:id', (req, res)=>{

    const sql = "UPDATE students SET `Name`=?, `Email`=? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res)=>{
    const sql = 'DELETE FROM students WHERE ID = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result); 
    })
})

app.listen(8081, ()=>{
    console.log("Listening");
});