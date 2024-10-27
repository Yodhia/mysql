-- SQL Schema for Tuition Centre
CREATE DATABASE crm;

USE crm;

-- Creating Students Table
CREATE TABLE students (
   student_id INT AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   dob DATE NOT NULL,
   gender TINYTEXT NOT NULL,
);

-- Creating Enrolments Table
CREATE TABLE enrolments (
    enrolment_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Creating Subjects Table
CREATE TABLE subjects(
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name TINYTEXT NOT NULL,
    price DECIMAL NOT NULL
):

-- Creating Teachers Table
CREATE TABLE teachers(
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender TINYTEXT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Creating Classes Table
CREATE TABLE classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    classcode VARCHAR(50) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);