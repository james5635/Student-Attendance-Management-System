import AppLayout from '@/layouts/app';
import type { Course, Department } from '../types';
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


interface CoursePageProps {
    courses: Course[];
    minimal_departments: Minimal_Department[];

}

type CourseFormData = Omit<Course, 'course_id' | 'created_at' | 'updated_at'>;
export default function CoursePage({ courses, minimal_departments }: CoursePageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectDepartmentOpen, setIsSelectDepartmentOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCourse, setselectedCourse] = useState<Course | null>(null);


    // 
    const form: InertiaFormProps<CourseFormData> = useForm<CourseFormData>({
        department_id: null,
        name: '',
        code: '',
        duration_semesters: null,
        description: null,
    });

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
        form.post(route("courses.store"), {
            preserveScroll: true,
            fresh: true,
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    department_id: null,
                    name: '',
                    code: '',
                    duration_semesters: null,
                    description: null,
                });
                form.reset();
                setIsSelectDepartmentOpen(false);
                toast.success('Course created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                form.clearErrors();

            }
        })


    }


    const handleEditClick = (subject: Course) => {
        setselectedCourse(subject);

        form.setData({
            name: subject.name,
            code: subject.code,
            department_id: subject.department_id,
            duration_semesters: subject.duration_semesters,
            description: subject.description
        });
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCourse) return;
        form.put(route('courses.update', selectedCourse.course_id), {
            onSuccess: () => {
                form.setDefaults({
                    department_id: null,
                    name: '',
                    code: '',
                    duration_semesters: null,
                    description: null,
                });
                setIsEditOpen(false);
                setselectedCourse(null);
                form.reset();
                toast.success('Course updated successfully');
            },
            onError: (err: Object) => {
                // Object.values(err).forEach((val) => {
                //     toast.error(val);
                // })
                toast.error('Failed to update subject');
                form.clearErrors();

            }
        });
    };
    const handleDeleteClick = (subject: Course) => {
        setselectedCourse(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedCourse) return;
        router.delete(route('courses.destroy', selectedCourse.course_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedCourse(null);
                toast.success('Course deleted successfully');
            },
            onError: (err: Object) => {
                // Object.values(err).forEach((val) => {
                //     toast.error(val);
                // })
                toast.error('Failed to delete subject');
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Courses" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Course</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Course</DialogTitle>
                                <DialogDescription>
                                    Create a new course in the system.
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter course name"
                                        value={form.data.name}
                                        onChange={e => form.setData('name', e.target.value)}
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-sm text-destructive">{form.errors.name}</p>
                                    )}
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        placeholder="Enter course code"
                                        value={form.data.code || ''}
                                        onChange={e => form.setData('code', e.target.value)}
                                        required
                                    />
                                    {form.errors.code && (
                                        <p className="text-sm text-destructive">{form.errors.code}</p>
                                    )}
                                    <Label htmlFor="duration_semesters">Duration Semester</Label>
                                    <Input
                                        id="duration_semesters"
                                        placeholder="Enter duration_semesters"
                                        type='number'
                                        value={form.data.duration_semesters || ''}
                                        onChange={e => form.setData('duration_semesters', parseInt(e.target.value))}
                                        required
                                    />
                                    {form.errors.duration_semesters && (
                                        <p className="text-sm text-destructive">{form.errors.duration_semesters}</p>
                                    )}
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Enter description"
                                        value={form.data.description || ''}
                                        onChange={e => form.setData('description', e.target.value)}
                                        required
                                    />
                                    {form.errors.description && (
                                        <p className="text-sm text-destructive">{form.errors.description}</p>
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
                        <CardTitle>Course List</CardTitle>
                        <CardDescription>
                            Manage and organize courses in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course ID</TableHead>
                                    <TableHead>Department ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Duration Semester</TableHead>
                                    <TableHead>Description</TableHead>

                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {courses.map((course) => (
                                    <TableRow key={course.course_id}>
                                        <TableCell>{course.course_id}</TableCell>
                                        <TableCell>{course.department_id}</TableCell>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>{course.code}</TableCell>
                                        <TableCell>{course.duration_semesters}</TableCell>
                                        <TableCell>{course.description}</TableCell>

                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEditClick(course)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDeleteClick(course)}
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
                            Choose a department to associate with the subject.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Department ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Department | undefined = minimal_departments.find(mc => mc.department_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("department name") as HTMLInputElement)!.value = found!.name
                                form.setData('department_id', parseInt(val));
                            }}>
                                <SelectTrigger id="department_id">
                                    <SelectValue placeholder="Select a course" />
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
                            <Label>Course Name</Label>
                            <Input id="department name" readOnly></Input>

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
                        <DialogTitle>Edit subject</DialogTitle>
                        <DialogDescription>
                            Update the subject information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="space-y-2">
                                <Label htmlFor="department_id">Course ID</Label>
                                <Select onValueChange={(val) => {
                                    form.setData('department_id', parseInt(val));
                                }}>
                                    <SelectTrigger id="department_id">
                                        <SelectValue placeholder="Select a course" />
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter course name"
                                    value={form.data.name}
                                    onChange={e => form.setData('name', e.target.value)}
                                    required
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-destructive">{form.errors.name}</p>
                                )}
                                <Label htmlFor="code">Code</Label>
                                <Input
                                    id="code"
                                    placeholder="Enter course code"
                                    value={form.data.code || ''}
                                    onChange={e => form.setData('code', e.target.value)}
                                    required
                                />
                                {form.errors.code && (
                                    <p className="text-sm text-destructive">{form.errors.code}</p>
                                )}
                                <Label htmlFor="duration_semesters">Duration Semester</Label>
                                <Input
                                    id="duration_semesters"
                                    placeholder="Enter duration_semesters"
                                    type='number'
                                    value={form.data.duration_semesters || ''}
                                    onChange={e => form.setData('duration_semesters', parseInt(e.target.value))}
                                    required
                                />
                                {form.errors.duration_semesters && (
                                    <p className="text-sm text-destructive">{form.errors.duration_semesters}</p>
                                )}
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Enter description"
                                    value={form.data.description || ''}
                                    onChange={e => form.setData('description', e.target.value)}
                                    required
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-destructive">{form.errors.description}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update Course
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