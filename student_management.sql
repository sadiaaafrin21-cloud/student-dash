CREATE DATABASE student_management;

USE student_management;

CREATE TABLE students(

id INT PRIMARY KEY AUTO_INCREMENT,

name VARCHAR(100),

student_id VARCHAR(30),

department VARCHAR(50),

cgpa DECIMAL(3,2)

);