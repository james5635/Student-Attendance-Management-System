import { ArrowRight } from 'lucide-react';

export default function Start() {
    const links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/departments", label: "Department" },
        { href: "/classrooms", label: "Classroom" },
        { href: "/subjects", label: "Subject" },
        { href: "/courses", label: "Course" },
        
                    
    ];
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md space-y-8 border border-white/30 dark:border-gray-700 transition-all duration-500">
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">Welcome</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Choose a section to get started</p>
                <div className="space-y-4">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="group relative flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-all duration-300 shadow-lg hover:from-purple-600 hover:to-pink-500 hover:scale-[1.03] active:scale-100 focus:outline-none"
                        >
                            <span className="z-10 text-base sm:text-lg">{link.label}</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 group-hover:translate-x-1 transition-transform duration-300 z-10" />
                            {/* Gradient glow animation */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-lg transition duration-500"></div>
                        </a>
                    ))}
                </div>
            </div>
            <button
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="absolute top-4 right-4 p-2 text-sm text-gray-600 dark:text-gray-300"
            >
                Toggle Dark Mode
            </button>

        </div>
    );
}
