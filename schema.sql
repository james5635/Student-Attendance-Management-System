-- SQL schema for Student Attendance Management System (MySQL)

-- 1. Departments
CREATE TABLE Departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    head_of_department_id INT
);

-- 2. Teachers
CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    department_id INT,
    hire_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- 3. Courses
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    code VARCHAR(20) UNIQUE,
    department_id INT,
    duration_semesters INT,
    description TEXT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- 4. Subjects
CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    name VARCHAR(100),
    code VARCHAR(20) UNIQUE,
    credits INT,
    description TEXT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 5. Students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    address TEXT,
    department_id INT,
    enrollment_year INT,
    status VARCHAR(20),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- 6. Classes
CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    year INT,
    section VARCHAR(10),
    advisor_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (advisor_id) REFERENCES Teachers(teacher_id)
);

-- 7. Enrollments
CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    class_id INT,
    enrollment_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- 8. Class_Subjects
CREATE TABLE Class_Subjects (
    class_subject_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT,
    subject_id INT,
    teacher_id INT,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

-- 9. Classrooms
CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    building VARCHAR(50),
    room_number VARCHAR(10),
    capacity INT
);

-- 10. Schedules
CREATE TABLE Schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    class_subject_id INT,
    classroom_id INT,
    day_of_week VARCHAR(10),
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (class_subject_id) REFERENCES Class_Subjects(class_subject_id),
    FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id)
);

-- 11. Sessions
CREATE TABLE Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    class_subject_id INT,
    session_date DATE,
    start_time TIME,
    end_time TIME,
    status VARCHAR(20),
    FOREIGN KEY (class_subject_id) REFERENCES Class_Subjects(class_subject_id)
);

-- 12. Attendance
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    student_id INT,
    status VARCHAR(20),
    remarks TEXT,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- 13. Roles
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

-- 14. Users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password_hash TEXT,
    email VARCHAR(100) UNIQUE,
    student_id INT,
    teacher_id INT,
    role_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- 15. Permissions
CREATE TABLE Permissions (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    permission_name VARCHAR(100),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
