import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { University, GraduationCap, Users, LogIn, UserPlus, CalendarDays, BookOpen, FileText, CheckCircle, Quote, Mail } from 'lucide-react';

export default function StudentManagementLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white/70 dark:bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-2 text-2xl font-bold">
          {/* <GraduationCap className="text-blue-600 dark:text-blue-400" /> */}
          <University className="text-blue-600 dark:text-blue-400" />
          <span>Student Management</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      <main className="px-6 py-12 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold leading-tight text-blue-800 dark:text-blue-300"
        >
          Welcome to Student Management System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-xl text-gray-600 dark:text-gray-300"
        >
          A complete student management system designed for modern schools, universities, and training centers. Streamline operations, enhance communication, and empower education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link href="#">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Watch Demo
            </Button>
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Users className="text-blue-500" /> Student Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add, edit, and manage student profiles with comprehensive data including contact info, guardian details, and status. Secure and easy access to all student records.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="text-indigo-500" /> Course & Subject Handling
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Organize curriculum, manage subjects, assign teachers, and link courses to relevant classes. Keep track of academic progress effortlessly.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <CalendarDays className="text-rose-500" /> Attendance & Scheduling
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track daily attendance and generate class schedules with powerful planning tools. Reduce administrative burden and ensure smooth operations.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="text-teal-500" /> Academic Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Upload and manage certificates, ID cards, transcripts, and other student documents securely. Access important records anytime, anywhere.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <GraduationCap className="text-green-500" /> Simplified Administration
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Reduce paperwork and manual tasks with tools that centralize and automate key workflows. Free up valuable time for educators and administrators.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="text-orange-500" /> Performance Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor student academic performance, generate reports, and identify areas for improvement. Support student growth and success.
            </p>
          </div>
        </motion.section>

        ---

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-20 py-12 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-xl"
        >
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-8">
            Why Choose Our Student Management System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">User-Friendly Interface</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Intuitive design ensures ease of use for administrators, teachers, and students alike.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Robust Security</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Your data is protected with industry-leading security measures and regular backups.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Scalable Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Designed to grow with your institution, from small schools to large universities.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Dedicated support team ready to assist you whenever you need it.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Cost-Effective</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Maximize your budget with a feature-rich system that delivers exceptional value.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-fuchsia-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Continuous Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Regular updates and new features ensure you always have the best tools.
              </p>
            </div>
          </div>
        </motion.section>

        ---

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-20 py-12"
        >
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center">
              <Quote className="w-10 h-10 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                "This Student Management System has revolutionized how we handle student data. It's incredibly efficient and has saved us countless hours of administrative work!"
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">- Dr. Emily White, Principal at Grandview Academy</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center">
              <Quote className="w-10 h-10 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                "The attendance tracking and scheduling features are a game-changer. Our teachers find it so easy to use, and the reports are invaluable for insights."
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">- Mr. John Davis, Head of Academics at City College</p>
            </div>
          </div>
        </motion.section>

        ---

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-20 py-12 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-xl text-center"
        >
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-8">
            Have Questions? Get In Touch!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We're here to help you get the most out of our Student Management System.
          </p>
          <div className="flex flex-col items-center justify-center gap-6">
            {/* <Link href="/contact-us">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Sales
              </Button>
            </Link> */}
            <a href="https://github.com/james5635/Student-Attendance-Management-System" target="_blank">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Sales
              </Button>
            </a>
            <p className="text-md text-gray-700 dark:text-gray-400">
              {/* Or visit our <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">FAQ page</Link> for common questions. */}
              Or visit our <a href="https://github.com/james5635/Student-Attendance-Management-System/issues" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">FAQ page</a> for common questions.
            </p>
          </div>
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-24 text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} Student Management System. All rights reserved.
        </motion.footer>
      </main>
    </div>
  );
}