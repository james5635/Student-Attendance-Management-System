import AppLayout from '@/layouts/app';
import type { Student, Department, Course, Teacher, SchoolClass, Enrollment } from '../types';
import { useState } from 'react';
import { Head, useForm, router, InertiaFormProps } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { ToastContainer, toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Minimal_Department = Pick<Department, 'department_id' | 'name'>;
type Minimal_Course = Pick<Course, 'course_id' | 'name'>;
type Minimal_Teacher = Pick<Teacher, 'teacher_id' | 'first_name' | 'last_name'>;

interface StudentPageProps {
    students: Student[];
    minimal_departments: Minimal_Department[];
    minimal_courses: Minimal_Course[];
    minimal_teachers: Minimal_Teacher[];

}

type StudentFormData = Omit<Student, 'student_id' | 'created_at' | 'updated_at'>;
type SchoolClassFormData = Omit<SchoolClass, 'class_id' | 'created_at' | 'updated_at'>;
type EnrollmentFormData = Omit<Enrollment, 'enrollment_id', 'class_id', 'student_id' | 'created_at' | 'updated_at'>;
export default function StudentPage({ students, minimal_departments, minimal_courses, minimal_teachers }: StudentPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectDepartmentOpen, setIsSelectDepartmentOpen] = useState(false);
    const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
    const [isSelectCourseOepn, setIsSelectCourseOpen] = useState(false);
    const [isSelectTeacherOpen, setIsSelectTeacherOpen] = useState(false);
    const [isCreateEnrollmentOpen, setIsCreateEnrollmentOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedStudent, setselectedStudent] = useState<Student | null>(null);

    // 
    const form: InertiaFormProps<StudentFormData> = useForm<StudentFormData>({
        first_name: '',
        last_name: '',
        dob: null, // YYYY-MM-DD
        gender: null,
        email: '',
        phone: null,
        address: null,
        department_id: null,
        enrollment_year: null,
        status: null,
    });
    const schoolClassFrom: InertiaFormProps<SchoolClassFormData> = useForm<SchoolClassFormData>({
        course_id: 0,
        year: 0,
        section: '',
        advisor_id: null
    });
    const enrollmentForm: InertiaFormProps<EnrollmentFormData> = useForm<EnrollmentFormData>({
        enrollment_date: ''
    })
    const handleCreateOpenChange = (open: boolean) => {
        setIsCreateOpen(open);
        if (open) {
            form.reset(); // Reset form data
            console.log('form', form.data);

        }
    }
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('form', form.data);
        form.post(route("students.store"), {
            preserveScroll: true,
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    first_name: '',
                    last_name: '',
                    dob: null, // YYYY-MM-DD
                    gender: null,
                    email: '',
                    phone: null,
                    address: null,
                    department_id: null,
                    enrollment_year: null,
                    status: null,
                });
                form.reset();
                setIsSelectDepartmentOpen(false);

                console.log('schoolClassFrom', schoolClassFrom.data);
                schoolClassFrom.post(route('classes.store'), {
                    onSuccess: () => {
                        schoolClassFrom.setDefaults({
                            course_id: 0,
                            year: 0,
                            section: '',
                            advisor_id: null
                        });
                        schoolClassFrom.reset();

                        console.log('enrollmentForm', enrollmentForm.data);
                        enrollmentForm.post(route('enrollments.store'), {
                            onSuccess: () => {
                                enrollmentForm.setDefaults({
                                    enrollment_date: ''
                                });
                                enrollmentForm.reset();
                                setIsCreateEnrollmentOpen(false);

                                toast.success('Enrollment created successfully');
                            },
                            onError: (err: Object) => {
                                Object.values(err).forEach((val) => {
                                    toast.error(val);
                                })
                                // toast.error('Failed to create enrollment');
                                enrollmentForm.clearErrors();
                            }
                        })


                        toast.success('Class created successfully');
                    },
                    onError: (err: Object) => {
                        Object.values(err).forEach((val) => {
                            toast.error(val);
                        })
                        // toast.error('Failed to create class');
                        schoolClassFrom.clearErrors();
                    }
                });



                toast.success('Student created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                form.clearErrors();

            }
        })


    }


    const handleEditClick = (student: Student) => {
        setselectedStudent(student);

        form.setData({
            first_name: student.first_name,
            last_name: student.last_name,
            dob: student.dob || null, // YYYY-MM-DD
            gender: student.gender || null,
            email: student.email,
            phone: student.phone || null,
            address: student.address || null,
            department_id: student.department_id || null,
            enrollment_year: student.enrollment_year || null,
            status: student.status || null,
        });
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent) return;
        form.put(route('students.update', selectedStudent.student_id), {
            onSuccess: () => {
                form.setDefaults({
                    first_name: '',
                    last_name: '',
                    dob: null, // YYYY-MM-DD
                    gender: null,
                    email: '',
                    phone: null,
                    address: null,
                    department_id: null,
                    enrollment_year: null,
                    status: null,
                });
                setIsEditOpen(false);
                setselectedStudent(null);
                form.reset();
                toast.success('Student updated successfully');
            },
            onError: (err: Object) => {
                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                // toast.error('Failed to update subject');
                form.clearErrors();

            }
        });
    };
    const handleDeleteClick = (subject: Student) => {
        setselectedStudent(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedStudent) return;
        router.delete(route('students.destroy', selectedStudent.student_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedStudent(null);
                toast.success('Student deleted successfully');
            },
            onError: (err: Object) => {
                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                // toast.error('Failed to delete subject');
                form.clearErrors();
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Students" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Student</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                                <DialogDescription>
                                    Create a new student in the system.
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">

                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        placeholder="Enter first name"
                                        value={form.data.first_name}
                                        onChange={e => form.setData('first_name', e.target.value)}
                                        required
                                    />
                                    {form.errors.first_name && (
                                        <p className="text-sm text-destructive">{form.errors.first_name}</p>
                                    )}
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        placeholder="Enter last name"
                                        value={form.data.last_name}
                                        onChange={e => form.setData('last_name', e.target.value)}
                                        required
                                    />
                                    {form.errors.last_name && (
                                        <p className="text-sm text-destructive">{form.errors.last_name}</p>
                                    )}
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.dob || ''}
                                        onChange={e => form.setData('dob', e.target.value)}
                                        required
                                    />
                                    {form.errors.dob && (
                                        <p className="text-sm text-destructive">{form.errors.dob}</p>
                                    )}
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select
                                        onValueChange={(val) => form.setData('gender', val)}
                                        value={form.data.gender || undefined}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.gender && (
                                        <p className="text-sm text-destructive">{form.errors.gender}</p>
                                    )}
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={form.data.email}
                                        onChange={e => form.setData('email', e.target.value)}
                                        required
                                    />
                                    {form.errors.email && (
                                        <p className="text-sm text-destructive">{form.errors.email}</p>
                                    )}
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={form.data.phone || ''}
                                        onChange={e => form.setData('phone', e.target.value)}
                                    />
                                    {form.errors.phone && (
                                        <p className="text-sm text-destructive">{form.errors.phone}</p>
                                    )}
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="Enter address"
                                        value={form.data.address || ''}
                                        onChange={e => form.setData('address', e.target.value)}
                                    />
                                    {form.errors.address && (
                                        <p className="text-sm text-destructive">{form.errors.address}</p>
                                    )}
                                    <Label htmlFor="enrollment_year">Enrollment Year</Label>
                                    <Input
                                        id="enrollment_year"
                                        type="number"
                                        placeholder="Enter enrollment year"
                                        value={form.data.enrollment_year || ''}
                                        onChange={e => form.setData('enrollment_year', e.target.value ? parseInt(e.target.value) : null)}
                                    />
                                    {form.errors.enrollment_year && (
                                        <p className="text-sm text-destructive">{form.errors.enrollment_year}</p>
                                    )}
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        onValueChange={(val) => form.setData('status', val)}
                                        value={form.data.status || undefined}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="text-sm text-destructive">{form.errors.status}</p>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button onClick={(e) => { e.preventDefault(); setIsCreateOpen(false); setIsSelectDepartmentOpen(true) }} disabled={form.processing}>
                                        Next
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Student List</CardTitle>
                        <CardDescription>
                            Manage and organize students in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableHead>ID</TableHead>
                                    <TableHead>Department ID</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Date of Birth</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Enrollment Year</TableHead>
                                    <TableHead>Status</TableHead>


                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {students.map(student => (
                                    <TableRow key={student.student_id}>
                                        <TableCell>{student.student_id}</TableCell>
                                        <TableCell>{student.department_id}</TableCell>
                                        <TableCell>{student.first_name}</TableCell>
                                        <TableCell>{student.last_name}</TableCell>
                                        <TableCell>{student.dob || 'N/A'}</TableCell>
                                        <TableCell>{student.gender || 'N/A'}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.phone || 'N/A'}</TableCell>
                                        <TableCell>{student.address || 'N/A'}</TableCell>
                                        <TableCell>{student.enrollment_year || 'N/A'}</TableCell>
                                        <TableCell>{student.status || 'N/A'}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => router.get(route('students.show', student.student_id))}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEditClick(student)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDeleteClick(student)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isSelectDepartmentOpen} onOpenChange={setIsSelectDepartmentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Department</DialogTitle>
                        <DialogDescription>
                            Choose a department to associate with the student.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Department ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Department | undefined = minimal_departments.find(mc => mc.department_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("department name") as HTMLInputElement)!.value = found!.name
                                form.setData('department_id', parseInt(val));
                            }}>
                                <SelectTrigger id="department_id">
                                    <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_departments.map(x =>
                                            <SelectItem key={x.department_id} value={x.department_id.toString()}>
                                                {x.department_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Department Name</Label>
                            <Input id="department name" readOnly></Input>

                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsSelectDepartmentOpen(false); setIsCreateClassOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isCreateClassOpen} onOpenChange={setIsCreateClassOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Class</DialogTitle>
                        <DialogDescription>
                            Create a new class for the student.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div>
                            <Label>Year</Label>
                            <Input
                                type="number"
                                placeholder="Enter year"
                                value={schoolClassFrom.data.year || ''}
                                onChange={e => schoolClassFrom.setData('year', e.target.value ? parseInt(e.target.value) : 0)}
                                required
                            />
                            {schoolClassFrom.errors.year && (
                                <p className="text-sm text-destructive">{schoolClassFrom.errors.year}</p>
                            )}
                            <Label>Section</Label>
                            <Input
                                placeholder="Enter section"
                                value={schoolClassFrom.data.section || ''}
                                onChange={e => schoolClassFrom.setData('section', e.target.value)}
                                required
                            />
                            {schoolClassFrom.errors.section && (
                                <p className="text-sm text-destructive">{schoolClassFrom.errors.section}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsCreateClassOpen(false); setIsSelectCourseOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isSelectCourseOepn} onOpenChange={setIsSelectCourseOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Course</DialogTitle>
                        <DialogDescription>
                            Choose a course to associate with the student.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="course_id">Course ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Course | undefined = minimal_courses.find(mc => mc.course_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("course name") as HTMLInputElement)!.value = found!.name
                                schoolClassFrom.setData('course_id', parseInt(val));
                            }}>
                                <SelectTrigger id="course_id">
                                    <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_courses.map(x =>
                                            <SelectItem key={x.course_id} value={x.course_id.toString()}>
                                                {x.course_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Course Name</Label>
                            <Input id="course name" readOnly></Input>

                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsSelectCourseOpen(false); setIsSelectTeacherOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={isSelectTeacherOpen} onOpenChange={setIsSelectTeacherOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Teacher</DialogTitle>
                        <DialogDescription>
                            Choose a teacher to assign as the class advisor for the student.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="course_id">Course ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Teacher | undefined = minimal_teachers.find(mc => mc.teacher_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("teacher name") as HTMLInputElement)!.value = `${found!.first_name} ${found!.last_name}`;
                                schoolClassFrom.setData('advisor_id', parseInt(val));
                            }}>
                                <SelectTrigger id="teacher_id">
                                    <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_teachers.map(x =>
                                            <SelectItem key={x.teacher_id} value={x.teacher_id.toString()}>
                                                {x.teacher_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Teacher Name</Label>
                            <Input id="teacher name" readOnly></Input>

                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsSelectTeacherOpen(false); setIsCreateEnrollmentOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isCreateEnrollmentOpen} onOpenChange={setIsCreateEnrollmentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Enrollment</DialogTitle>
                        <DialogDescription>
                            Enroll the student
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div>
                            <Label>Enrollment Date</Label>
                            <Input
                                type="date"
                                placeholder="YYYY-MM-DD"
                                value={enrollmentForm.data.enrollment_date || ''}
                                onChange={e => enrollmentForm.setData('enrollment_date', e.target.value)}
                                required
                            />
                            {enrollmentForm.errors.enrollment_date && (
                                <p className="text-sm text-destructive">{enrollmentForm.errors.enrollment_date}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type='submit' disabled={form.processing}>
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit student</DialogTitle>
                        <DialogDescription>
                            Update the student information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="space-y-2">
                                <Label htmlFor="department_id">Department ID</Label>
                                <Select onValueChange={(val) => {
                                    form.setData('department_id', parseInt(val));
                                }}>
                                    <SelectTrigger id="department_id">
                                        <SelectValue placeholder="Select a department" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {
                                            minimal_departments.map(x =>
                                                <SelectItem key={x.department_id} value={x.department_id.toString()}>
                                                    {x.department_id}
                                                </SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>

                            </div>
                           <div className="space-y-2">

                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        placeholder="Enter first name"
                                        value={form.data.first_name}
                                        onChange={e => form.setData('first_name', e.target.value)}
                                        required
                                    />
                                    {form.errors.first_name && (
                                        <p className="text-sm text-destructive">{form.errors.first_name}</p>
                                    )}
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        placeholder="Enter last name"
                                        value={form.data.last_name}
                                        onChange={e => form.setData('last_name', e.target.value)}
                                        required
                                    />
                                    {form.errors.last_name && (
                                        <p className="text-sm text-destructive">{form.errors.last_name}</p>
                                    )}
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.dob || ''}
                                        onChange={e => form.setData('dob', e.target.value)}
                                        required
                                    />
                                    {form.errors.dob && (
                                        <p className="text-sm text-destructive">{form.errors.dob}</p>
                                    )}
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select
                                        onValueChange={(val) => form.setData('gender', val)}
                                        value={form.data.gender || undefined}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.gender && (
                                        <p className="text-sm text-destructive">{form.errors.gender}</p>
                                    )}
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={form.data.email}
                                        onChange={e => form.setData('email', e.target.value)}
                                        required
                                    />
                                    {form.errors.email && (
                                        <p className="text-sm text-destructive">{form.errors.email}</p>
                                    )}
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={form.data.phone || ''}
                                        onChange={e => form.setData('phone', e.target.value)}
                                    />
                                    {form.errors.phone && (
                                        <p className="text-sm text-destructive">{form.errors.phone}</p>
                                    )}
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="Enter address"
                                        value={form.data.address || ''}
                                        onChange={e => form.setData('address', e.target.value)}
                                    />
                                    {form.errors.address && (
                                        <p className="text-sm text-destructive">{form.errors.address}</p>
                                    )}
                                    <Label htmlFor="enrollment_year">Enrollment Year</Label>
                                    <Input
                                        id="enrollment_year"
                                        type="number"
                                        placeholder="Enter enrollment year"
                                        value={form.data.enrollment_year || ''}
                                        onChange={e => form.setData('enrollment_year', e.target.value ? parseInt(e.target.value) : null)}
                                    />
                                    {form.errors.enrollment_year && (
                                        <p className="text-sm text-destructive">{form.errors.enrollment_year}</p>
                                    )}
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        onValueChange={(val) => form.setData('status', val)}
                                        value={form.data.status || undefined}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="text-sm text-destructive">{form.errors.status}</p>
                                    )}
                                </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update Student
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            subject and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleOKDeleteClick}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )

}