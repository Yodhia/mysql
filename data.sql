use crm;

-- Inserting data into students
INSERT INTO students (first_name, last_name, dob, gender) VALUES
('Angelica', 'Tan', '2008-04-20', 'Female'),
('Bella', 'Lim', '2010-07-03', 'Female'),
('Christopher', 'Teo', '2009-10-25', 'Male');


-- Inserting data into subjects
INSERT INTO subjects (subject_name, price) VALUES
('Matematics', 200),
('English', 150),
('Science', 250);


-- Inserting data into teachers
INSERT INTO teachers (first_name, last_name, gender, subject_id) VALUES
('Clara', 'Ang', 'Female', 1),
('Peter', 'Tan', 'Male', 2),
('Roy', 'Ong', 'Male', 3);


-- Inserting data into classes
INSERT INTO classes (classcode, date, venue, teacher_id, subject_id) VALUES
('MTH001', '2024-01-09', 'Bedok', 1, 1),
('ENG001', '2024-01-25', 'CityHall', 2, 2),
('SCI001', '2024-02-01', 'Yishun', 3, 3);

-- Inserting data into enrolments
INSERT INTO enrolments (date, student_id, class_id) VALUES
('2024-01-08', 1, 1),
('2024-02-20', 2, 2),
('2024-03-17', 3, 3);