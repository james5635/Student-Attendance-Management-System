-- db_Student_Attendance_Management_System.classrooms definition

CREATE TABLE `classrooms` (
  `classroom_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `building` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`classroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.departments definition

CREATE TABLE `departments` (
  `department_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.courses definition

CREATE TABLE `courses` (
  `course_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `duration_semesters` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `courses_code_unique` (`code`),
  KEY `courses_department_id_foreign` (`department_id`),
  CONSTRAINT `courses_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.students definition

CREATE TABLE `students` (
  `student_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `department_id` bigint unsigned DEFAULT NULL,
  `enrollment_year` int DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `students_email_unique` (`email`),
  KEY `students_department_id_foreign` (`department_id`),
  CONSTRAINT `students_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.subjects definition

CREATE TABLE `subjects` (
  `subject_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credits` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `subjects_code_unique` (`code`),
  KEY `subjects_course_id_foreign` (`course_id`),
  CONSTRAINT `subjects_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.teachers definition

CREATE TABLE `teachers` (
  `teacher_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`),
  UNIQUE KEY `teachers_email_unique` (`email`),
  KEY `teachers_department_id_foreign` (`department_id`),
  CONSTRAINT `teachers_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.classes definition

CREATE TABLE `classes` (
  `class_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint unsigned NOT NULL,
  `year` int NOT NULL,
  `section` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advisor_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `classes_course_id_foreign` (`course_id`),
  KEY `classes_advisor_id_foreign` (`advisor_id`),
  CONSTRAINT `classes_advisor_id_foreign` FOREIGN KEY (`advisor_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE SET NULL,
  CONSTRAINT `classes_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.enrollments definition

CREATE TABLE `enrollments` (
  `enrollment_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint unsigned NOT NULL,
  `class_id` bigint unsigned NOT NULL,
  `enrollment_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `enrollments_student_id_foreign` (`student_id`),
  KEY `enrollments_class_id_foreign` (`class_id`),
  CONSTRAINT `enrollments_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  CONSTRAINT `enrollments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.fee_installments definition

CREATE TABLE `fee_installments` (
  `student_id` bigint unsigned NOT NULL,
  `installment_no` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` date NOT NULL,
  `payment_date` date DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`,`installment_no`),
  CONSTRAINT `fee_installments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.student_documents definition

CREATE TABLE `student_documents` (
  `student_id` bigint unsigned NOT NULL,
  `document_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date DEFAULT NULL,
  `submitted_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`,`document_type`),
  CONSTRAINT `student_documents_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.class_subjects definition

CREATE TABLE `class_subjects` (
  `class_subject_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `class_id` bigint unsigned NOT NULL,
  `subject_id` bigint unsigned NOT NULL,
  `teacher_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`class_subject_id`),
  KEY `class_subjects_class_id_foreign` (`class_id`),
  KEY `class_subjects_subject_id_foreign` (`subject_id`),
  KEY `class_subjects_teacher_id_foreign` (`teacher_id`),
  CONSTRAINT `class_subjects_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  CONSTRAINT `class_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE,
  CONSTRAINT `class_subjects_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.schedules definition

CREATE TABLE `schedules` (
  `schedule_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `class_subject_id` bigint unsigned NOT NULL,
  `classroom_id` bigint unsigned NOT NULL,
  `day_of_week` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `schedules_class_subject_id_foreign` (`class_subject_id`),
  KEY `schedules_classroom_id_foreign` (`classroom_id`),
  CONSTRAINT `schedules_class_subject_id_foreign` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`class_subject_id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_classroom_id_foreign` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`classroom_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.class_sessions definition

CREATE TABLE `class_sessions` (
  `session_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `class_subject_id` bigint unsigned NOT NULL,
  `session_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `class_sessions_class_subject_id_foreign` (`class_subject_id`),
  CONSTRAINT `class_sessions_class_subject_id_foreign` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`class_subject_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- db_Student_Attendance_Management_System.attendance definition

CREATE TABLE `attendance` (
  `attendance_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_id` bigint unsigned NOT NULL,
  `student_id` bigint unsigned NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `attendance_session_id_foreign` (`session_id`),
  KEY `attendance_student_id_foreign` (`student_id`),
  CONSTRAINT `attendance_session_id_foreign` FOREIGN KEY (`session_id`) REFERENCES `class_sessions` (`session_id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;






-- Records for 'departments' table
INSERT INTO `departments` (`department_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Computer Science', NOW(), NOW()),
(2, 'Electrical Engineering', NOW(), NOW()),
(3, 'Business Administration', NOW(), NOW()),
(4, 'Mechanical Engineering', NOW(), NOW()),
(5, 'Civil Engineering', NOW(), NOW()),
(6, 'English Literature', NOW(), NOW()),
(7, 'Physics', NOW(), NOW()),
(8, 'Chemistry', NOW(), NOW()),
(9, 'Mathematics', NOW(), NOW()),
(10, 'Economics', NOW(), NOW());


-- Records for 'classrooms' table
INSERT INTO `classrooms` (`classroom_id`, `building`, `room_number`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 'Building A', '101', 50, NOW(), NOW()),
(2, 'Building A', '102', 50, NOW(), NOW()),
(3, 'Building B', '201', 60, NOW(), NOW()),
(4, 'Building B', '202', 60, NOW(), NOW()),
(5, 'Science Wing', 'S-101', 40, NOW(), NOW()),
(6, 'Science Wing', 'S-102', 40, NOW(), NOW()),
(7, 'Auditorium Complex', 'AC-H1', 150, NOW(), NOW()),
(8, 'Engineering Block', 'E-G01', 70, NOW(), NOW()),
(9, 'Engineering Block', 'E-G02', 70, NOW(), NOW()),
(10, 'Arts Hall', 'AH-21', 55, NOW(), NOW());

-- Records for 'courses' table
INSERT INTO `courses` (`course_id`, `name`, `code`, `department_id`, `duration_semesters`, `description`, `created_at`, `updated_at`) VALUES
(1, 'BS in Computer Science', 'BSCS', 1, 8, 'A comprehensive study of computer science principles.', NOW(), NOW()),
(2, 'BS in Electrical Engineering', 'BSEE', 2, 8, 'Focuses on electrical systems and electronics.', NOW(), NOW()),
(3, 'Bachelor of Business Administration', 'BBA', 3, 6, 'Prepares students for management and business roles.', NOW(), NOW()),
(4, 'BS in Mechanical Engineering', 'BSME', 4, 8, 'Covers mechanics, dynamics, and energy systems.', NOW(), NOW()),
(5, 'BS in Civil Engineering', 'BSCE', 5, 8, 'Deals with the design and construction of public works.', NOW(), NOW()),
(6, 'BA in English Literature', 'BAEL', 6, 6, 'A deep dive into classic and contemporary literature.', NOW(), NOW()),
(7, 'BS in Physics', 'BSPH', 7, 8, 'Explores the fundamental principles of the universe.', NOW(), NOW()),
(8, 'BS in Chemistry', 'BSCH', 8, 8, 'The study of matter, its properties, and reactions.', NOW(), NOW()),
(9, 'BS in Mathematics', 'BSMA', 9, 8, 'Focuses on abstract structures and quantitative reasoning.', NOW(), NOW()),
(10, 'BA in Economics', 'BAEC', 10, 6, 'Analyzes the production, distribution, and consumption of goods.', NOW(), NOW());

-- Records for 'teachers' table
INSERT INTO `teachers` (`teacher_id`, `first_name`, `last_name`, `email`, `phone`, `department_id`, `hire_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Alan', 'Turing', 'alan.turing@university.edu', '111-222-3331', 1, '2018-08-15', 'Active', NOW(), NOW()),
(2, 'Nikola', 'Tesla', 'nikola.tesla@university.edu', '111-222-3332', 2, '2017-07-21', 'Active', NOW(), NOW()),
(3, 'Peter', 'Drucker', 'peter.drucker@university.edu', '111-222-3333', 3, '2019-09-01', 'Active', NOW(), NOW()),
(4, 'James', 'Watt', 'james.watt@university.edu', '111-222-3334', 4, '2016-06-10', 'Active', NOW(), NOW()),
(5, 'Elsie', 'Eaves', 'elsie.eaves@university.edu', '111-222-3335', 5, '2020-01-20', 'Active', NOW(), NOW()),
(6, 'Virginia', 'Woolf', 'virginia.woolf@university.edu', '111-222-3336', 6, '2021-08-30', 'Active', NOW(), NOW()),
(7, 'Marie', 'Curie', 'marie.curie@university.edu', '111-222-3337', 7, '2015-05-18', 'Active', NOW(), NOW()),
(8, 'Linus', 'Pauling', 'linus.pauling@university.edu', '111-222-3338', 8, '2019-02-11', 'On Sabbatical', NOW(), NOW()),
(9, 'Leonhard', 'Euler', 'leonhard.euler@university.edu', '111-222-3339', 9, '2014-09-01', 'Active', NOW(), NOW()),
(10, 'John Maynard', 'Keynes', 'jm.keynes@university.edu', '111-222-3340', 10, '2022-01-15', 'Active', NOW(), NOW());

-- Records for 'students' table
INSERT INTO `students` (`student_id`, `first_name`, `last_name`, `dob`, `gender`, `email`, `phone`, `address`, `department_id`, `enrollment_year`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Smith', '2004-05-10', 'Male', 'john.smith@student.edu', '555-010-1001', '123 Maple St', 1, 2023, 'Active', NOW(), NOW()),
(2, 'Emily', 'Jones', '2004-08-22', 'Female', 'emily.jones@student.edu', '555-010-1002', '456 Oak Ave', 1, 2023, 'Active', NOW(), NOW()),
(3, 'Michael', 'Brown', '2005-01-30', 'Male', 'michael.brown@student.edu', '555-010-1003', '789 Pine Ln', 3, 2024, 'Active', NOW(), NOW()),
(4, 'Sarah', 'Davis', '2005-03-15', 'Female', 'sarah.davis@student.edu', '555-010-1004', '101 Birch Rd', 3, 2024, 'Active', NOW(), NOW()),
(5, 'David', 'Wilson', '2004-11-05', 'Male', 'david.wilson@student.edu', '555-010-1005', '212 Cedar Blvd', 2, 2023, 'Active', NOW(), NOW()),
(6, 'Laura', 'Taylor', '2005-06-18', 'Female', 'laura.taylor@student.edu', '555-010-1006', '333 Elm Ct', 6, 2024, 'Active', NOW(), NOW()),
(7, 'Robert', 'Martinez', '2003-09-25', 'Male', 'robert.martinez@student.edu', '555-010-1007', '444 Spruce Way', 4, 2022, 'Active', NOW(), NOW()),
(8, 'Jessica', 'Anderson', '2005-02-12', 'Female', 'jessica.anderson@student.edu', '555-010-1008', '555 Willow Dr', 7, 2024, 'Active', NOW(), NOW()),
(9, 'William', 'Thomas', '2004-07-07', 'Male', 'william.thomas@student.edu', '555-010-1009', '666 Aspen Cir', 9, 2023, 'Active', NOW(), NOW()),
(10, 'Linda', 'Jackson', '2005-10-01', 'Female', 'linda.jackson@student.edu', '555-010-1010', '777 Redwood Pkwy', 10, 2024, 'Active', NOW(), NOW());

-- Records for 'subjects' table
INSERT INTO `subjects` (`subject_id`, `course_id`, `name`, `code`, `credits`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Introduction to Programming', 'CS101', 3, 'Fundamentals of programming using Python.', NOW(), NOW()),
(2, 1, 'Data Structures and Algorithms', 'CS201', 4, 'Study of fundamental data structures.', NOW(), NOW()),
(3, 2, 'Circuit Analysis', 'EE201', 4, 'Analysis of DC and AC circuits.', NOW(), NOW()),
(4, 3, 'Principles of Marketing', 'MKT101', 3, 'An introduction to marketing concepts.', NOW(), NOW()),
(5, 3, 'Financial Accounting', 'ACC101', 3, 'Introduction to financial accounting principles.', NOW(), NOW()),
(6, 4, 'Thermodynamics', 'ME201', 4, 'Study of energy, heat, and work.', NOW(), NOW()),
(7, 9, 'Calculus I', 'MATH101', 4, 'Differential calculus and its applications.', NOW(), NOW()),
(8, 6, 'Shakespearean Drama', 'ENGL301', 3, 'A study of Shakespeare''s major plays.', NOW(), NOW()),
(9, 7, 'Quantum Mechanics', 'PHY301', 4, 'An introduction to quantum theory.', NOW(), NOW()),
(10, 10, 'Macroeconomics', 'ECON102', 3, 'Study of economy-wide phenomena.', NOW(), NOW());

-- Records for 'classes' table
INSERT INTO `classes` (`class_id`, `course_id`, `year`, `section`, `advisor_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2023, 'A', 1, NOW(), NOW()),
(2, 1, 2023, 'B', 1, NOW(), NOW()),
(3, 3, 2024, 'A', 3, NOW(), NOW()),
(4, 3, 2024, 'B', 3, NOW(), NOW()),
(5, 2, 2023, 'A', 2, NOW(), NOW()),
(6, 6, 2024, 'A', 6, NOW(), NOW()),
(7, 4, 2022, 'A', 4, NOW(), NOW()),
(8, 7, 2024, 'A', 7, NOW(), NOW()),
(9, 9, 2023, 'A', 9, NOW(), NOW()),
(10, 10, 2024, 'A', 10, NOW(), NOW());

-- Records for 'enrollments' table
INSERT INTO `enrollments` (`enrollment_id`, `student_id`, `class_id`, `enrollment_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-09-01', NOW(), NOW()),
(2, 2, 1, '2023-09-01', NOW(), NOW()),
(3, 3, 3, '2024-09-01', NOW(), NOW()),
(4, 4, 3, '2024-09-01', NOW(), NOW()),
(5, 5, 5, '2023-09-01', NOW(), NOW()),
(6, 6, 6, '2024-09-01', NOW(), NOW()),
(7, 7, 7, '2022-09-01', NOW(), NOW()),
(8, 8, 8, '2024-09-01', NOW(), NOW()),
(9, 9, 9, '2023-09-01', NOW(), NOW()),
(10, 10, 10, '2024-09-01', NOW(), NOW());

-- Records for 'class_subjects' table
INSERT INTO `class_subjects` (`class_subject_id`, `class_id`, `subject_id`, `teacher_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, NOW(), NOW()),  -- Class CS-2023-A, Subject Intro to Prog, Teacher Alan Turing
(2, 1, 2, 1, NOW(), NOW()),  -- Class CS-2023-A, Subject Data Structures, Teacher Alan Turing
(3, 3, 4, 3, NOW(), NOW()),  -- Class BBA-2024-A, Subject Marketing, Teacher Peter Drucker
(4, 3, 5, 3, NOW(), NOW()),  -- Class BBA-2024-A, Subject Accounting, Teacher Peter Drucker
(5, 5, 3, 2, NOW(), NOW()),  -- Class EE-2023-A, Subject Circuit Analysis, Teacher Nikola Tesla
(6, 6, 8, 6, NOW(), NOW()),  -- Class ENGL-2024-A, Subject Shakespeare, Teacher Virginia Woolf
(7, 7, 6, 4, NOW(), NOW()),  -- Class ME-2022-A, Subject Thermo, Teacher James Watt
(8, 8, 9, 7, NOW(), NOW()),  -- Class PHY-2024-A, Subject Quantum, Teacher Marie Curie
(9, 9, 7, 9, NOW(), NOW()),  -- Class MATH-2023-A, Subject Calculus I, Teacher Leonhard Euler
(10, 10, 10, 10, NOW(), NOW()); -- Class ECON-2024-A, Subject Macroeconomics, Teacher JM Keynes

-- Records for 'schedules' table
INSERT INTO `schedules` (`schedule_id`, `class_subject_id`, `classroom_id`, `day_of_week`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Monday', '09:00:00', '10:30:00', NOW(), NOW()),
(2, 2, 2, 'Tuesday', '10:30:00', '12:00:00', NOW(), NOW()),
(3, 3, 3, 'Monday', '13:00:00', '14:30:00', NOW(), NOW()),
(4, 4, 4, 'Wednesday', '09:00:00', '10:30:00', NOW(), NOW()),
(5, 5, 8, 'Tuesday', '14:00:00', '15:30:00', NOW(), NOW()),
(6, 6, 10, 'Friday', '11:00:00', '12:30:00', NOW(), NOW()),
(7, 7, 9, 'Thursday', '09:00:00', '10:30:00', NOW(), NOW()),
(8, 8, 5, 'Monday', '10:30:00', '12:00:00', NOW(), NOW()),
(9, 9, 1, 'Wednesday', '10:30:00', '12:00:00', NOW(), NOW()),
(10, 10, 3, 'Thursday', '13:00:00', '14:30:00', NOW(), NOW());

-- Records for 'class_sessions' table
INSERT INTO `class_sessions` (`session_id`, `class_subject_id`, `session_date`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-06-09', '09:00:00', '10:30:00', 'Completed', NOW(), NOW()), -- CS Prog
(2, 1, '2025-06-16', '09:00:00', '10:30:00', 'Completed', NOW(), NOW()), -- CS Prog
(3, 3, '2025-06-09', '13:00:00', '14:30:00', 'Completed', NOW(), NOW()), -- BBA Mkt
(4, 5, '2025-06-10', '14:00:00', '15:30:00', 'Completed', NOW(), NOW()), -- EE Circuits
(5, 4, '2025-06-11', '09:00:00', '10:30:00', 'Completed', NOW(), NOW()), -- BBA Acct
(6, 9, '2025-06-11', '10:30:00', '12:00:00', 'Completed', NOW(), NOW()), -- Math Calc
(7, 2, '2025-06-10', '10:30:00', '12:00:00', 'Completed', NOW(), NOW()), -- CS DS
(8, 2, '2025-06-17', '10:30:00', '12:00:00', 'Scheduled', NOW(), NOW()), -- CS DS
(9, 6, '2025-06-13', '11:00:00', '12:30:00', 'Completed', NOW(), NOW()), -- English
(10, 10, '2025-06-12', '13:00:00', '14:30:00', 'Completed', NOW(), NOW()); -- Econ

-- Records for 'attendance' table
INSERT INTO `attendance` (`attendance_id`, `session_id`, `student_id`, `status`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Present', NULL, NOW(), NOW()),
(2, 1, 2, 'Present', NULL, NOW(), NOW()),
(3, 2, 1, 'Present', NULL, NOW(), NOW()),
(4, 2, 2, 'Absent', 'No reason provided.', NOW(), NOW()),
(5, 3, 3, 'Present', NULL, NOW(), NOW()),
(6, 3, 4, 'Present', NULL, NOW(), NOW()),
(7, 4, 5, 'Present', 'Arrived 10 minutes late.', NOW(), NOW()),
(8, 5, 3, 'Absent', 'Sick leave.', NOW(), NOW()),
(9, 7, 1, 'Present', NULL, NOW(), NOW()),
(10, 7, 2, 'Present', NULL, NOW(), NOW());

-- Records for 'fee_installments' table
INSERT INTO `fee_installments` (`student_id`, `installment_no`, `amount`, `due_date`, `payment_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1500.00, '2023-10-01', '2023-09-28', 'Paid', NOW(), NOW()),
(1, 2, 1500.00, '2024-02-01', '2024-01-30', 'Paid', NOW(), NOW()),
(2, 1, 1500.00, '2023-10-01', '2023-09-25', 'Paid', NOW(), NOW()),
(2, 2, 1500.00, '2024-02-01', NULL, 'Due', NOW(), NOW()),
(3, 1, 2000.00, '2024-10-01', NULL, 'Due', NOW(), NOW()),
(4, 1, 2000.00, '2024-10-01', '2024-09-15', 'Paid', NOW(), NOW()),
(5, 1, 1800.00, '2023-10-01', '2023-10-10', 'Paid', NOW(), NOW()),
(6, 1, 1200.00, '2024-10-01', NULL, 'Due', NOW(), NOW()),
(7, 1, 1800.00, '2022-10-01', '2022-09-30', 'Paid', NOW(), NOW()),
(7, 2, 1800.00, '2023-02-01', '2023-02-15', 'Overdue', NOW(), NOW());

-- Records for 'student_documents' table
INSERT INTO `student_documents` (`student_id`, `document_type`, `file_path`, `issue_date`, `submitted_date`, `created_at`, `updated_at`) VALUES
(1, 'High School Certificate', '/docs/s1_hsc.pdf', '2023-05-20', '2023-08-15', NOW(), NOW()),
(1, 'Photo ID', '/docs/s1_id.pdf', '2023-01-15', '2023-08-15', NOW(), NOW()),
(2, 'High School Certificate', '/docs/s2_hsc.pdf', '2023-05-22', '2023-08-16', NOW(), NOW()),
(2, 'Photo ID', '/docs/s2_id.pdf', '2022-12-01', '2023-08-16', NOW(), NOW()),
(3, 'High School Certificate', '/docs/s3_hsc.pdf', '2024-06-01', '2024-08-20', NOW(), NOW()),
(4, 'High School Certificate', '/docs/s4_hsc.pdf', '2024-05-30', '2024-08-21', NOW(), NOW()),
(5, 'High School Certificate', '/docs/s5_hsc.pdf', '2023-05-18', '2023-08-17', NOW(), NOW()),
(6, 'High School Certificate', '/docs/s6_hsc.pdf', '2024-06-05', '2024-08-22', NOW(), NOW()),
(7, 'High School Certificate', '/docs/s7_hsc.pdf', '2022-06-10', '2022-08-15', NOW(), NOW()),
(8, 'High School Certificate', '/docs/s8_hsc.pdf', '2024-06-02', '2024-08-23', NOW(), NOW());

