const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_management"
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

// =======================
// GET All Students
// =======================

app.get("/students", (req, res) => {

    db.query("SELECT * FROM students", (err, result) => {

        if (err) return res.json(err);

        res.json(result);

    });

});

// =======================
// ADD Student
// =======================

app.post("/students", (req, res) => {

    const { name, student_id, department, cgpa } = req.body;

    db.query(
        "INSERT INTO students(name,student_id,department,cgpa) VALUES(?,?,?,?)",
        [name, student_id, department, cgpa],
        (err) => {

            if (err) return res.json(err);

            res.json("Student Added Successfully");

        }
    );

});

// =======================
// UPDATE Student
// =======================

app.put("/students/:id", (req, res) => {

    const id = req.params.id;

    const { name, student_id, department, cgpa } = req.body;

    db.query(
        "UPDATE students SET name=?, student_id=?, department=?, cgpa=? WHERE id=?",
        [name, student_id, department, cgpa, id],
        (err) => {

            if (err) return res.json(err);

            res.json("Student Updated");

        }
    );

});

// =======================
// DELETE Student
// =======================

app.delete("/students/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM students WHERE id=?",
        [id],
        (err) => {

            if (err) return res.json(err);

            res.json("Student Deleted");

        }
    );

});

app.listen(5000, () => {

    console.log("Server Running on Port 5000");

});