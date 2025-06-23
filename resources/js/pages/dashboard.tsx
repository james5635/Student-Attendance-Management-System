import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Building,
    School,
    BookOpen,
    GraduationCap,
    // ChalkboardTeacher,
    User,
    Users,
    CalendarDays,
    Wallet,
    FileText,
    LucideIcon,
    House,
    University
} from 'lucide-react';
import { GiTeacher } from "react-icons/gi";
import { FaChalkboardTeacher } from 'react-icons/fa'
import { IconType } from 'react-icons/lib';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardLink = {
    href: string;
    label: string;
    icon: LucideIcon | IconType;
    gradient: string;
};

const links: DashboardLink[] = [
    // { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, gradient: "from-indigo-500 to-purple-500" },
    { href: "/", label: "Home", icon: House, gradient: "from-indigo-500 to-purple-500" },
    { href: "/departments", label: "Department", icon: Building, gradient: "from-green-400 to-emerald-600" },
    { href: "/classrooms", label: "Classroom", icon: School, gradient: "from-yellow-400 to-orange-500" },
    { href: "/subjects", label: "Subject", icon: BookOpen, gradient: "from-pink-400 to-rose-500" },
    { href: "/courses", label: "Course", icon: GraduationCap, gradient: "from-blue-400 to-sky-600" },
    // { href: "/teachers", label: "Teacher", icon: ChalkboardTeacher, gradient: "from-purple-400 to-fuchsia-600" },
    { href: "/teachers", label: "Teacher", icon: User, gradient: "from-purple-400 to-fuchsia-600" },
    { href: "/students", label: "Student", icon: Users, gradient: "from-teal-400 to-cyan-600" },
    { href: "/class-sessions", label: "Class Session", icon: CalendarDays, gradient: "from-red-400 to-pink-600" },
    { href: "/fee-installments", label: "Fee Installment", icon: Wallet, gradient: "from-lime-400 to-green-500" },
    { href: "/student-documents", label: "Student Document", icon: FileText, gradient: "from-gray-400 to-slate-600" },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {links.map(({ href, label, icon: Icon, gradient }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`relative flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50`}
                        >
                            <div className="z-10 flex flex-col items-center justify-center text-center gap-2">
                                {(() => {
                                    if (Icon === GiTeacher)
                                        return <Icon className="h-10 w-10 sm:h-12 sm:w-12 icon" size={1} />
                                    return <Icon className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
                                })()}
                                <span className="text-lg font-semibold sm:text-xl">{label}</span>
                            </div>
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <PlaceholderPattern className="size-full stroke-white/20 dark:stroke-white/10" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
