<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // Ensure Carbon is imported for now()

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        User::factory()->create([
            'name' => 'jame',
            'email' => 'jame@gmail.com',
        ]);

        $this->call([
            DepartmentSeeder::class,
            ClassroomSeeder::class,
            CourseSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            SubjectSeeder::class,
            ClassSeeder::class,
            EnrollmentSeeder::class,
            ClassSubjectSeeder::class,
            ScheduleSeeder::class,
            ClassSessionSeeder::class,
            AttendanceSeeder::class,
            FeeInstallmentSeeder::class,
            StudentDocumentSeeder::class,
        ]);
    }
}


class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->insert([
            ['department_id' => 1, 'name' => 'Computer Science', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 2, 'name' => 'Electrical Engineering', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 3, 'name' => 'Business Administration', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 4, 'name' => 'Mechanical Engineering', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 5, 'name' => 'Civil Engineering', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 6, 'name' => 'English Literature', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 7, 'name' => 'Physics', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 8, 'name' => 'Chemistry', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 9, 'name' => 'Mathematics', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['department_id' => 10, 'name' => 'Economics', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('classrooms')->insert([
            ['classroom_id' => 1, 'building' => 'Building A', 'room_number' => '101', 'capacity' => 50, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 2, 'building' => 'Building A', 'room_number' => '102', 'capacity' => 50, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 3, 'building' => 'Building B', 'room_number' => '201', 'capacity' => 60, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 4, 'building' => 'Building B', 'room_number' => '202', 'capacity' => 60, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 5, 'building' => 'Science Wing', 'room_number' => 'S-101', 'capacity' => 40, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 6, 'building' => 'Science Wing', 'room_number' => 'S-102', 'capacity' => 40, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 7, 'building' => 'Auditorium Complex', 'room_number' => 'AC-H1', 'capacity' => 150, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 8, 'building' => 'Engineering Block', 'room_number' => 'E-G01', 'capacity' => 70, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 9, 'building' => 'Engineering Block', 'room_number' => 'E-G02', 'capacity' => 70, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['classroom_id' => 10, 'building' => 'Arts Hall', 'room_number' => 'AH-21', 'capacity' => 55, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->insert([
            ['course_id' => 1, 'name' => 'BS in Computer Science', 'code' => 'BSCS', 'department_id' => 1, 'duration_semesters' => 8, 'description' => 'A comprehensive study of computer science principles.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 2, 'name' => 'BS in Electrical Engineering', 'code' => 'BSEE', 'department_id' => 2, 'duration_semesters' => 8, 'description' => 'Focuses on electrical systems and electronics.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 3, 'name' => 'Bachelor of Business Administration', 'code' => 'BBA', 'department_id' => 3, 'duration_semesters' => 6, 'description' => 'Prepares students for management and business roles.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 4, 'name' => 'BS in Mechanical Engineering', 'code' => 'BSME', 'department_id' => 4, 'duration_semesters' => 8, 'description' => 'Covers mechanics, dynamics, and energy systems.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 5, 'name' => 'BS in Civil Engineering', 'code' => 'BSCE', 'department_id' => 5, 'duration_semesters' => 8, 'description' => 'Deals with the design and construction of public works.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 6, 'name' => 'BA in English Literature', 'code' => 'BAEL', 'department_id' => 6, 'duration_semesters' => 6, 'description' => 'A deep dive into classic and contemporary literature.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 7, 'name' => 'BS in Physics', 'code' => 'BSPH', 'department_id' => 7, 'duration_semesters' => 8, 'description' => 'Explores the fundamental principles of the universe.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 8, 'name' => 'BS in Chemistry', 'code' => 'BSCH', 'department_id' => 8, 'duration_semesters' => 8, 'description' => 'The study of matter, its properties, and reactions.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 9, 'name' => 'BS in Mathematics', 'code' => 'BSMA', 'department_id' => 9, 'duration_semesters' => 8, 'description' => 'Focuses on abstract structures and quantitative reasoning.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['course_id' => 10, 'name' => 'BA in Economics', 'code' => 'BAEC', 'department_id' => 10, 'duration_semesters' => 6, 'description' => 'Analyzes the production, distribution, and consumption of goods.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teachers')->insert([
            ['teacher_id' => 1, 'first_name' => 'Alan', 'last_name' => 'Turing', 'email' => 'alan.turing@university.edu', 'phone' => '111-222-3331', 'department_id' => 1, 'hire_date' => '2018-08-15', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 2, 'first_name' => 'Nikola', 'last_name' => 'Tesla', 'email' => 'nikola.tesla@university.edu', 'phone' => '111-222-3332', 'department_id' => 2, 'hire_date' => '2017-07-21', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 3, 'first_name' => 'Peter', 'last_name' => 'Drucker', 'email' => 'peter.drucker@university.edu', 'phone' => '111-222-3333', 'department_id' => 3, 'hire_date' => '2019-09-01', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 4, 'first_name' => 'James', 'last_name' => 'Watt', 'email' => 'james.watt@university.edu', 'phone' => '111-222-3334', 'department_id' => 4, 'hire_date' => '2016-06-10', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 5, 'first_name' => 'Elsie', 'last_name' => 'Eaves', 'email' => 'elsie.eaves@university.edu', 'phone' => '111-222-3335', 'department_id' => 5, 'hire_date' => '2020-01-20', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 6, 'first_name' => 'Virginia', 'last_name' => 'Woolf', 'email' => 'virginia.woolf@university.edu', 'phone' => '111-222-3336', 'department_id' => 6, 'hire_date' => '2021-08-30', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 7, 'first_name' => 'Marie', 'last_name' => 'Curie', 'email' => 'marie.curie@university.edu', 'phone' => '111-222-3337', 'department_id' => 7, 'hire_date' => '2015-05-18', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 8, 'first_name' => 'Linus', 'last_name' => 'Pauling', 'email' => 'linus.pauling@university.edu', 'phone' => '111-222-3338', 'department_id' => 8, 'hire_date' => '2019-02-11', 'status' => 'On Sabbatical', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 9, 'first_name' => 'Leonhard', 'last_name' => 'Euler', 'email' => 'leonhard.euler@university.edu', 'phone' => '111-222-3339', 'department_id' => 9, 'hire_date' => '2014-09-01', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['teacher_id' => 10, 'first_name' => 'John Maynard', 'last_name' => 'Keynes', 'email' => 'jm.keynes@university.edu', 'phone' => '111-222-3340', 'department_id' => 10, 'hire_date' => '2022-01-15', 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('students')->insert([
            ['student_id' => 1, 'first_name' => 'John', 'last_name' => 'Smith', 'dob' => '2004-05-10', 'gender' => 'Male', 'email' => 'john.smith@student.edu', 'phone' => '555-010-1001', 'address' => '123 Maple St', 'department_id' => 1, 'enrollment_year' => 2023, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 2, 'first_name' => 'Emily', 'last_name' => 'Jones', 'dob' => '2004-08-22', 'gender' => 'Female', 'email' => 'emily.jones@student.edu', 'phone' => '555-010-1002', 'address' => '456 Oak Ave', 'department_id' => 1, 'enrollment_year' => 2023, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 3, 'first_name' => 'Michael', 'last_name' => 'Brown', 'dob' => '2005-01-30', 'gender' => 'Male', 'email' => 'michael.brown@student.edu', 'phone' => '555-010-1003', 'address' => '789 Pine Ln', 'department_id' => 3, 'enrollment_year' => 2024, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 4, 'first_name' => 'Sarah', 'last_name' => 'Davis', 'dob' => '2005-03-15', 'gender' => 'Female', 'email' => 'sarah.davis@student.edu', 'phone' => '555-010-1004', 'address' => '101 Birch Rd', 'department_id' => 3, 'enrollment_year' => 2024, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 5, 'first_name' => 'David', 'last_name' => 'Wilson', 'dob' => '2004-11-05', 'gender' => 'Male', 'email' => 'david.wilson@student.edu', 'phone' => '555-010-1005', 'address' => '212 Cedar Blvd', 'department_id' => 2, 'enrollment_year' => 2023, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 6, 'first_name' => 'Laura', 'last_name' => 'Taylor', 'dob' => '2005-06-18', 'gender' => 'Female', 'email' => 'laura.taylor@student.edu', 'phone' => '555-010-1006', 'address' => '333 Elm Ct', 'department_id' => 6, 'enrollment_year' => 2024, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 7, 'first_name' => 'Robert', 'last_name' => 'Martinez', 'dob' => '2003-09-25', 'gender' => 'Male', 'email' => 'robert.martinez@student.edu', 'phone' => '555-010-1007', 'address' => '444 Spruce Way', 'department_id' => 4, 'enrollment_year' => 2022, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 8, 'first_name' => 'Jessica', 'last_name' => 'Anderson', 'dob' => '2005-02-12', 'gender' => 'Female', 'email' => 'jessica.anderson@student.edu', 'phone' => '555-010-1008', 'address' => '555 Willow Dr', 'department_id' => 7, 'enrollment_year' => 2024, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 9, 'first_name' => 'William', 'last_name' => 'Thomas', 'dob' => '2004-07-07', 'gender' => 'Male', 'email' => 'william.thomas@student.edu', 'phone' => '555-010-1009', 'address' => '666 Aspen Cir', 'department_id' => 9, 'enrollment_year' => 2023, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 10, 'first_name' => 'Linda', 'last_name' => 'Jackson', 'dob' => '2005-10-01', 'gender' => 'Female', 'email' => 'linda.jackson@student.edu', 'phone' => '555-010-1010', 'address' => '777 Redwood Pkwy', 'department_id' => 10, 'enrollment_year' => 2024, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subjects')->insert([
            ['subject_id' => 1, 'course_id' => 1, 'name' => 'Introduction to Programming', 'code' => 'CS101', 'credits' => 3, 'description' => 'Fundamentals of programming using Python.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 2, 'course_id' => 1, 'name' => 'Data Structures and Algorithms', 'code' => 'CS201', 'credits' => 4, 'description' => 'Study of fundamental data structures.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 3, 'course_id' => 2, 'name' => 'Circuit Analysis', 'code' => 'EE201', 'credits' => 4, 'description' => 'Analysis of DC and AC circuits.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 4, 'course_id' => 3, 'name' => 'Principles of Marketing', 'code' => 'MKT101', 'credits' => 3, 'description' => 'An introduction to marketing concepts.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 5, 'course_id' => 3, 'name' => 'Financial Accounting', 'code' => 'ACC101', 'credits' => 3, 'description' => 'Introduction to financial accounting principles.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 6, 'course_id' => 4, 'name' => 'Thermodynamics', 'code' => 'ME201', 'credits' => 4, 'description' => 'Study of energy, heat, and work.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 7, 'course_id' => 9, 'name' => 'Calculus I', 'code' => 'MATH101', 'credits' => 4, 'description' => 'Differential calculus and its applications.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 8, 'course_id' => 6, 'name' => 'Shakespearean Drama', 'code' => 'ENGL301', 'credits' => 3, 'description' => 'A study of Shakespeare\'s major plays.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 9, 'course_id' => 7, 'name' => 'Quantum Mechanics', 'code' => 'PHY301', 'credits' => 4, 'description' => 'An introduction to quantum theory.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_id' => 10, 'course_id' => 10, 'name' => 'Macroeconomics', 'code' => 'ECON102', 'credits' => 3, 'description' => 'Study of economy-wide phenomena.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('classes')->insert([
            ['class_id' => 1, 'course_id' => 1, 'year' => 2023, 'section' => 'A', 'advisor_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 2, 'course_id' => 1, 'year' => 2023, 'section' => 'B', 'advisor_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 3, 'course_id' => 3, 'year' => 2024, 'section' => 'A', 'advisor_id' => 3, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 4, 'course_id' => 3, 'year' => 2024, 'section' => 'B', 'advisor_id' => 3, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 5, 'course_id' => 2, 'year' => 2023, 'section' => 'A', 'advisor_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 6, 'course_id' => 6, 'year' => 2024, 'section' => 'A', 'advisor_id' => 6, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 7, 'course_id' => 4, 'year' => 2022, 'section' => 'A', 'advisor_id' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 8, 'course_id' => 7, 'year' => 2024, 'section' => 'A', 'advisor_id' => 7, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 9, 'course_id' => 9, 'year' => 2023, 'section' => 'A', 'advisor_id' => 9, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_id' => 10, 'course_id' => 10, 'year' => 2024, 'section' => 'A', 'advisor_id' => 10, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('enrollments')->insert([
            ['enrollment_id' => 1, 'student_id' => 1, 'class_id' => 1, 'enrollment_date' => '2023-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 2, 'student_id' => 2, 'class_id' => 1, 'enrollment_date' => '2023-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 3, 'student_id' => 3, 'class_id' => 3, 'enrollment_date' => '2024-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 4, 'student_id' => 4, 'class_id' => 3, 'enrollment_date' => '2024-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 5, 'student_id' => 5, 'class_id' => 5, 'enrollment_date' => '2023-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 6, 'student_id' => 6, 'class_id' => 6, 'enrollment_date' => '2024-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 7, 'student_id' => 7, 'class_id' => 7, 'enrollment_date' => '2022-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 8, 'student_id' => 8, 'class_id' => 8, 'enrollment_date' => '2024-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 9, 'student_id' => 9, 'class_id' => 9, 'enrollment_date' => '2023-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['enrollment_id' => 10, 'student_id' => 10, 'class_id' => 10, 'enrollment_date' => '2024-09-01', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class ClassSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('class_subjects')->insert([
            ['class_subject_id' => 1, 'class_id' => 1, 'subject_id' => 1, 'teacher_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 2, 'class_id' => 1, 'subject_id' => 2, 'teacher_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 3, 'class_id' => 3, 'subject_id' => 4, 'teacher_id' => 3, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 4, 'class_id' => 3, 'subject_id' => 5, 'teacher_id' => 3, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 5, 'class_id' => 5, 'subject_id' => 3, 'teacher_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 6, 'class_id' => 6, 'subject_id' => 8, 'teacher_id' => 6, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 7, 'class_id' => 7, 'subject_id' => 6, 'teacher_id' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 8, 'class_id' => 8, 'subject_id' => 9, 'teacher_id' => 7, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 9, 'class_id' => 9, 'subject_id' => 7, 'teacher_id' => 9, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['class_subject_id' => 10, 'class_id' => 10, 'subject_id' => 10, 'teacher_id' => 10, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('schedules')->insert([
            ['schedule_id' => 1, 'class_subject_id' => 1, 'classroom_id' => 1, 'day_of_week' => 'Monday', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 2, 'class_subject_id' => 2, 'classroom_id' => 2, 'day_of_week' => 'Tuesday', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 3, 'class_subject_id' => 3, 'classroom_id' => 3, 'day_of_week' => 'Monday', 'start_time' => '13:00:00', 'end_time' => '14:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 4, 'class_subject_id' => 4, 'classroom_id' => 4, 'day_of_week' => 'Wednesday', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 5, 'class_subject_id' => 5, 'classroom_id' => 8, 'day_of_week' => 'Tuesday', 'start_time' => '14:00:00', 'end_time' => '15:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 6, 'class_subject_id' => 6, 'classroom_id' => 10, 'day_of_week' => 'Friday', 'start_time' => '11:00:00', 'end_time' => '12:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 7, 'class_subject_id' => 7, 'classroom_id' => 9, 'day_of_week' => 'Thursday', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 8, 'class_subject_id' => 8, 'classroom_id' => 5, 'day_of_week' => 'Monday', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 9, 'class_subject_id' => 9, 'classroom_id' => 1, 'day_of_week' => 'Wednesday', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['schedule_id' => 10, 'class_subject_id' => 10, 'classroom_id' => 3, 'day_of_week' => 'Thursday', 'start_time' => '13:00:00', 'end_time' => '14:30:00', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class ClassSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('class_sessions')->insert([
            ['session_id' => 1, 'class_subject_id' => 1, 'session_date' => '2025-06-09', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 2, 'class_subject_id' => 1, 'session_date' => '2025-06-16', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 3, 'class_subject_id' => 3, 'session_date' => '2025-06-09', 'start_time' => '13:00:00', 'end_time' => '14:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 4, 'class_subject_id' => 5, 'session_date' => '2025-06-10', 'start_time' => '14:00:00', 'end_time' => '15:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 5, 'class_subject_id' => 4, 'session_date' => '2025-06-11', 'start_time' => '09:00:00', 'end_time' => '10:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 6, 'class_subject_id' => 9, 'session_date' => '2025-06-11', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 7, 'class_subject_id' => 2, 'session_date' => '2025-06-10', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 8, 'class_subject_id' => 2, 'session_date' => '2025-06-17', 'start_time' => '10:30:00', 'end_time' => '12:00:00', 'status' => 'Scheduled', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 9, 'class_subject_id' => 6, 'session_date' => '2025-06-13', 'start_time' => '11:00:00', 'end_time' => '12:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['session_id' => 10, 'class_subject_id' => 10, 'session_date' => '2025-06-12', 'start_time' => '13:00:00', 'end_time' => '14:30:00', 'status' => 'Completed', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('attendances')->insert([
            ['attendance_id' => 1, 'session_id' => 1, 'student_id' => 1, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 2, 'session_id' => 1, 'student_id' => 2, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 3, 'session_id' => 2, 'student_id' => 1, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 4, 'session_id' => 2, 'student_id' => 2, 'status' => 'Absent', 'remarks' => 'No reason provided.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 5, 'session_id' => 3, 'student_id' => 3, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 6, 'session_id' => 3, 'student_id' => 4, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 7, 'session_id' => 4, 'student_id' => 5, 'status' => 'Present', 'remarks' => 'Arrived 10 minutes late.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 8, 'session_id' => 5, 'student_id' => 3, 'status' => 'Absent', 'remarks' => 'Sick leave.', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 9, 'session_id' => 7, 'student_id' => 1, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['attendance_id' => 10, 'session_id' => 7, 'student_id' => 2, 'status' => 'Present', 'remarks' => NULL, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class FeeInstallmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('fee_installments')->insert([
            ['student_id' => 1, 'installment_no' => 1, 'amount' => 1500.00, 'due_date' => '2023-10-01', 'payment_date' => '2023-09-28', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 1, 'installment_no' => 2, 'amount' => 1500.00, 'due_date' => '2024-02-01', 'payment_date' => '2024-01-30', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 2, 'installment_no' => 1, 'amount' => 1500.00, 'due_date' => '2023-10-01', 'payment_date' => '2023-09-25', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 2, 'installment_no' => 2, 'amount' => 1500.00, 'due_date' => '2024-02-01', 'payment_date' => NULL, 'status' => 'Due', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 3, 'installment_no' => 1, 'amount' => 2000.00, 'due_date' => '2024-10-01', 'payment_date' => NULL, 'status' => 'Due', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 4, 'installment_no' => 1, 'amount' => 2000.00, 'due_date' => '2024-10-01', 'payment_date' => '2024-09-15', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 5, 'installment_no' => 1, 'amount' => 1800.00, 'due_date' => '2023-10-01', 'payment_date' => '2023-10-10', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 6, 'installment_no' => 1, 'amount' => 1200.00, 'due_date' => '2024-10-01', 'payment_date' => NULL, 'status' => 'Due', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 7, 'installment_no' => 1, 'amount' => 1800.00, 'due_date' => '2022-10-01', 'payment_date' => '2022-09-30', 'status' => 'Paid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 7, 'installment_no' => 2, 'amount' => 1800.00, 'due_date' => '2023-02-01', 'payment_date' => '2023-02-15', 'status' => 'Overdue', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}

class StudentDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('student_documents')->insert([
            ['student_id' => 1, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s1_hsc.pdf', 'issue_date' => '2023-05-20', 'submitted_date' => '2023-08-15', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 1, 'document_type' => 'Photo ID', 'file_path' => '/docs/s1_id.pdf', 'issue_date' => '2023-01-15', 'submitted_date' => '2023-08-15', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 2, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s2_hsc.pdf', 'issue_date' => '2023-05-22', 'submitted_date' => '2023-08-16', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 2, 'document_type' => 'Photo ID', 'file_path' => '/docs/s2_id.pdf', 'issue_date' => '2022-12-01', 'submitted_date' => '2023-08-16', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 3, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s3_hsc.pdf', 'issue_date' => '2024-06-01', 'submitted_date' => '2024-08-20', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 4, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s4_hsc.pdf', 'issue_date' => '2024-05-30', 'submitted_date' => '2024-08-21', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 5, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s5_hsc.pdf', 'issue_date' => '2023-05-18', 'submitted_date' => '2023-08-17', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 6, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s6_hsc.pdf', 'issue_date' => '2024-06-05', 'submitted_date' => '2024-08-22', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 7, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s7_hsc.pdf', 'issue_date' => '2022-06-10', 'submitted_date' => '2022-08-15', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['student_id' => 8, 'document_type' => 'High School Certificate', 'file_path' => '/docs/s8_hsc.pdf', 'issue_date' => '2024-06-02', 'submitted_date' => '2024-08-23', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
