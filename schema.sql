-- SQL Schema for Tuition Centre

DROP DATABASE IF EXISTS crm;
CREATE DATABASE crm;

USE crm;

-- Creating Students Table
CREATE TABLE students (
   student_id INT AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   dob DATE NOT NULL,
   gender TINYTEXT NOT NULL
);

-- Creating Subjects Table
CREATE TABLE subjects(
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name TINYTEXT NOT NULL,
    price DECIMAL NOT NULL
);

-- Creating Teachers Table
CREATE TABLE teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender TINYTEXT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Creating Classes Table
CREATE TABLE classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    classcode VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    venue VARCHAR(100) NOT NULL,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Creating Enrolments Table
CREATE TABLE enrolments (
    enrolment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);
