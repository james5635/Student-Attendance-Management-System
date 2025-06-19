import AppLayout from '@/layouts/app';
import type { Subject, Course, Schedule, Classroom, Teacher, ClassSubject, Class } from '../types';
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

type Minimal_Course = Pick<Course, 'course_id' | 'name'>
type Minimcal_Classroom = Pick<Classroom, 'classroom_id'>;
type Minimal_Teacher = Pick<Teacher, 'teacher_id' | 'first_name' | 'last_name'>;
type Minimal_Class = Pick<Class, 'class_id'>;
interface SubjectPageProps {
    subjects: Subject[];
    minimal_courses: Minimal_Course[];
    minimal_classrooms: Minimcal_Classroom[];
    minimal_teachers: Minimal_Teacher[];
    minimal_classes: Minimal_Class[];
}

type SubjectFormData = Omit<Subject, 'subject_id' | 'created_at' | 'updated_at'>;
type ScheduleFormData = Omit<Schedule, 'schedule_id' | 'class_subject_id' | 'created_at' | 'updated_at'>;
type ClassSubjectFormData = Omit<ClassSubject, 'class_subject_id' | 'subject_id' | 'created_at' | 'updated_at'>;
export default function Subject({ subjects, minimal_courses, minimal_classrooms, minimal_teachers, minimal_classes }: SubjectPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectCourseOpen, setisSelectCourseOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isSelectClassroomOpen, setIsSelectClassroomOpen] = useState(false);
    const [isSelectTeacherOpen, setIsSelectTeacherOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSubject, setselectedSubject] = useState<Subject | null>(null);


    // 
    const form: InertiaFormProps<SubjectFormData> = useForm<SubjectFormData>({
        course_id: 0,
        name: '',
        code: '',
        credits: null,
        description: null,
    });
    const scheduleForm: InertiaFormProps<ScheduleFormData> = useForm<ScheduleFormData>({
        // class_subject_id: 0,
        classroom_id: 0,
        day_of_week: '',
        start_time: '',
        end_time: '',
    });
    const classSubjectForm: InertiaFormProps<ClassSubjectFormData> = useForm<ClassSubjectFormData>({
        class_id: 0,
        teacher_id: null,
    });
    const handleCreateOpenChange = (open: boolean) => {
        setIsCreateOpen(open);
        if (open) {
            form.reset();
        }
    }
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('form', form.data);
        form.post(route("subjects.store"), {
            onSuccess: () => {
                form.reset();

                console.log('classSubjectForm', classSubjectForm.data);
                classSubjectForm.post(route("class-subjects.store"), {
                    onSuccess: () => {
                        classSubjectForm.reset();

                        console.log('scheduleForm', scheduleForm.data);
                        scheduleForm.post(route("schedules.store"), {
                            onSuccess: () => {
                                setIsSelectTeacherOpen(false);
                                scheduleForm.reset();
                                // toast.success('Schedule created successfully');
                            },
                            onError: (err: Object) => {
                                Object.values(err).forEach((val) => {
                                    toast.error(val);
                                })
                            }
                        });

                        // toast.success('Class subject created successfully');
                    },
                    onError: (err: Object) => {
                        Object.values(err).forEach((val) => {
                            toast.error(val);
                        })
                    }
                });

                toast.success('Subject created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })

            }
        })


    }

    const handleDetailClick = (subject: Subject) => {

    }
    const handleEditClick = (subject: Subject) => {
        setselectedSubject(subject);
        form.setData('course_id', subject.course_id);
        form.setData('name', subject.name);
        form.setData('code', subject.code);
        form.setData('credits', subject.credits);
        form.setData('description', subject.description);
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubject) return;
        form.put(route('subjects.update', selectedSubject.subject_id), {
            onSuccess: () => {
                setIsEditOpen(false);
                setselectedSubject(null);
                form.reset();
                toast.success('Subject updated successfully');
            },
            onError: (err: Object) => {
                // Object.values(err).forEach((val) => {
                //     toast.error(val);
                // })
                toast.error('Failed to update subject');
            }
        });
    };
    const handleDeleteClick = (subject: Subject) => {
        setselectedSubject(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedSubject) return;
        router.delete(route('subjects.destroy', selectedSubject.subject_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedSubject(null);
                toast.success('Subject deleted successfully');
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
            <Head title="Subjects" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Subject</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Subject
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Subject</DialogTitle>
                                <DialogDescription>
                                    Create a new subject in the system.
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">

                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter name"
                                        value={form.data.name}
                                        onChange={e => form.setData('name', e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        placeholder="Enter code"
                                        value={form.data.code || ''}
                                        onChange={e => form.setData('code', e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="credit">Credit</Label>
                                    <Input
                                        id="credit"
                                        placeholder="Enter credit"
                                        type='number'
                                        value={form.data.credits || ''}
                                        onChange={e => form.setData('credits', parseInt(e.target.value))}
                                        required
                                    />
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Enter description"
                                        value={form.data.description || ''}
                                        onChange={e => form.setData('description', e.target.value)}
                                        required
                                    />
                                    {form.errors.course_id && (
                                        <p className="text-sm text-destructive">{form.errors.course_id}</p>
                                    )}
                                    {form.errors.name && (
                                        <p className="text-sm text-destructive">{form.errors.name}</p>)}
                                    {form.errors.code && (
                                        <p className="text-sm text-destructive">{form.errors.code}</p>
                                    )}
                                    {form.errors.credits && (
                                        <p className="text-sm text-destructive">{form.errors.credits}</p>
                                    )}
                                    {form.errors.description && (
                                        <p className="text-sm text-destructive">{form.errors.description}</p>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button onClick={(e) => { e.preventDefault(); setIsCreateOpen(false); setisSelectCourseOpen(true) }} disabled={form.processing}>
                                        Next
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Subject List</CardTitle>
                        <CardDescription>
                            Manage and organize subjects in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableHead>ID</TableHead>
                                    <TableHead>Course ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead>Description</TableHead>

                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects?.map((subject) => (
                                    <TableRow key={subject.subject_id}>
                                        <TableCell className="font-medium">
                                            {subject.subject_id}
                                        </TableCell>
                                        <TableCell>{subject.course_id}</TableCell>

                                        <TableCell>{subject.name}</TableCell>
                                        <TableCell>
                                            {subject.code}
                                        </TableCell>
                                        <TableCell>
                                            {subject.credits}
                                        </TableCell>
                                        <TableCell>
                                            {subject.description}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                onClick={(e) => handleDetailClick(subject)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleEditClick(subject)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={(e) => handleDeleteClick(subject)}
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
        
            <Dialog open={isSelectCourseOpen} onOpenChange={setisSelectCourseOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Course</DialogTitle>
                        <DialogDescription>
                            Choose a course to associate with the subject.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="course_id">Course ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Course | undefined = minimal_courses.find(mc => mc.course_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("course name") as HTMLInputElement)!.value = found!.name
                                form.setData('course_id', parseInt(val));
                            }}>
                                <SelectTrigger id="course_id">
                                    <SelectValue placeholder="Select a course" />
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
                            <Button onClick={(e) => { e.preventDefault(); setisSelectCourseOpen(false); setIsScheduleOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set Schedule</DialogTitle>
                        <DialogDescription>
                            Set the schedule for the subject. This will allow students to see when the subject is taught.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="day of week">Day of Week</Label>
                            <Select onValueChange={(val) => scheduleForm.setData('day_of_week', val)}>
                                <SelectTrigger id="day of week">
                                    <SelectValue placeholder="Select a day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Monday">Monday</SelectItem>
                                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                                    <SelectItem value="Thursday">Thursday</SelectItem>
                                    <SelectItem value="Friday">Friday</SelectItem>
                                    <SelectItem value="Saturday">Saturday</SelectItem>
                                    <SelectItem value="Sunday">Sunday</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="start_time">Start Time</Label>
                            <Input
                                id="start_time"
                                type="time"
                                value={scheduleForm.data.start_time}
                                onChange={e => scheduleForm.setData('start_time', e.target.value)}
                                required
                            />
                            <Label htmlFor="end_time">End Time</Label>
                            <Input
                                id="end_time"
                                type="time"
                                value={scheduleForm.data.end_time}
                                onChange={e => scheduleForm.setData('end_time', e.target.value)}
                                required
                            />

                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsScheduleOpen(false); setIsSelectClassroomOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isSelectClassroomOpen} onOpenChange={setIsSelectClassroomOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Classroom</DialogTitle>
                        <DialogDescription>
                            Choose a classroom to associate with the subject schedule.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="classroom_id">Classroom ID</Label>
                            <Select onValueChange={(val) => {
                                scheduleForm.setData('classroom_id', parseInt(val));
                            }}>
                                <SelectTrigger id="classroom_id">
                                    <SelectValue placeholder="Select a classroom" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_classrooms.map(x =>
                                            <SelectItem key={x.classroom_id} value={x.classroom_id.toString()}>
                                                {x.classroom_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Class</Label>
                            <Select onValueChange={(val) => {
                                classSubjectForm.setData('class_id', parseInt(val));
                            }}>
                                <SelectTrigger id="classid">
                                    <SelectValue placeholder="Select a class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_classes.map(x =>
                                            <SelectItem key={x.class_id} value={x.class_id.toString()}>
                                                {x.class_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsSelectClassroomOpen(false); setIsSelectTeacherOpen(true) }} disabled={form.processing}>
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
                            Choose a teacher to assign to the subject.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="teacher_id">Teacher ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Teacher | undefined = minimal_teachers.find(mt => mt.teacher_id === parseInt(val));
                                (document.getElementById("teacher name") as HTMLInputElement)!.value = `${found!.first_name} ${found!.last_name}`;
                                classSubjectForm.setData('teacher_id', parseInt(val));

                            }}>
                                <SelectTrigger id="teacher_id">
                                    <SelectValue placeholder="Select a teacher" />
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
                            <Button type="submit" disabled={form.processing}>
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
                            <Label htmlFor="course_id">Course ID</Label>
                            <Select onValueChange={(val) => {
                                form.setData('course_id', parseInt(val));
                            }}>
                                <SelectTrigger id="course_id">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent >
                                    {
                                        minimal_courses.map(x =>
                                            <SelectItem key={x.course_id} value={x.course_id.toString()}>
                                                {x.course_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>

                        </div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter name"
                                value={form.data.name}
                                onChange={e => form.setData('name', e.target.value)}
                                required
                            />
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                placeholder="Enter code"
                                value={form.data.code || ''}
                                onChange={e => form.setData('code', e.target.value)}
                                required
                            />
                            <Label htmlFor="credit">Credit</Label>
                            <Input
                                id="credit"
                                placeholder="Enter credit"
                                type='number'
                                value={form.data.credits || ''}
                                onChange={e => form.setData('credits', parseInt(e.target.value))}
                                required
                            />
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Enter description"
                                value={form.data.description || ''}
                                onChange={e => form.setData('description', e.target.value)}
                                required
                            />
                            {form.errors.course_id && (
                                <p className="text-sm text-destructive">{form.errors.course_id}</p>
                            )}
                            {form.errors.name && (
                                <p className="text-sm text-destructive">{form.errors.name}</p>)}
                            {form.errors.code && (
                                <p className="text-sm text-destructive">{form.errors.code}</p>
                            )}
                            {form.errors.credits && (
                                <p className="text-sm text-destructive">{form.errors.credits}</p>
                            )}
                            {form.errors.description && (
                                <p className="text-sm text-destructive">{form.errors.description}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update Subject
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