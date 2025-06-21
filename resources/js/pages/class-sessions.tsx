import AppLayout from '@/layouts/app';
import type { ClassSession, ClassSubject, Student, Subject, Teacher, SchoolClass, Attendance, StudentDocument } from '../types';
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

type Minimal_Student = Pick<Student, 'student_id'> & { 'student_name': string };
type Minimal_Subject = Pick<Subject, 'subject_id' | 'name'>;
type Minimal_Teacher = Pick<Teacher, 'teacher_id'> & { 'teacher_name': string };
type Minimal_SchoolClass = Pick<SchoolClass, 'class_id'>;

interface ClassSessionPageProps {
    class_sessions: ClassSession[];
    minimal_students?: Minimal_Student[];
    minimal_subjects?: Minimal_Subject[];
    minimal_teachers?: Minimal_Teacher[];
    minimal_classes?: Minimal_SchoolClass[];
}

type ClassSessionFormData = Omit<ClassSession, 'session_id' | 'class_session_id' | 'class_subject_id' | 'created_at' | 'updated_at'>
    & { subject_id?: number, teacher_id?: number, class_id?: number };
type AttendanceFormData = Omit<Attendance, 'attendance_id' | 'session_id' | 'created_at' | 'updated_at'>;
export default function ClassSessionPage({ class_sessions, minimal_students, minimal_subjects, minimal_teachers, minimal_classes }: ClassSessionPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectClassSubjectOpen, setIsSelectClassSubjectOpen] = useState(false);
    const [isCreateAttendanceOpen, setIsCreateAttendanceOpen] = useState(false);
    const [isSelectStudentOpen, setIsSelectStudentOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditClassSubjectOpen, setIsEditClassSubjectOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedClassSession, setselectedClassSession] = useState<ClassSession | null>(null);

    // 
    const form: InertiaFormProps<ClassSessionFormData> = useForm<ClassSessionFormData>({
        session_date: '',
        start_time: '',
        end_time: '',
        status: null,
        subject_id: 0,
        teacher_id: 0,
        class_id: 0
    });
    const attendenceForm: InertiaFormProps<AttendanceFormData> = useForm<AttendanceFormData>({
        student_id: 0,
        status: '',
        remarks: null,
    });

    function formatDateToAMPMWithSeconds(date: Date): string {
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    }

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
        form.post(route("class-sessions.store"), {
            preserveScroll: true,
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    session_date: '',
                    start_time: '',
                    end_time: '',
                    status: null,
                    subject_id: 0,
                    teacher_id: 0,
                    class_id: 0
                });
                form.reset();

                console.log('attendenceForm', attendenceForm.data);
                attendenceForm.post(route("attendances.store"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        attendenceForm.setDefaults({
                            student_id: 0,
                            status: '',
                            remarks: null,
                        })
                        attendenceForm.reset();

                        toast.success('Attendance created successfully');
                    },
                    onError: (err: Object) => {
                        Object.values(err).forEach((val) => {
                            toast.error(val);
                        })
                        // toast.error('Failed to create attendance');
                        attendenceForm.clearErrors();
                    }
                })

                setIsSelectStudentOpen(false);
                toast.success('ClassSession created successfully');

            },
            onError: (err: Object) => {
                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                // toast.error('Failed to create class');
                form.clearErrors();
            }
        });
    }

    const handleEditClick = (session: ClassSession) => {
        form.setData({
            session_date: session.session_date,
            start_time: session.start_time,
            end_time: session.end_time,
            status: session.status,
        });
        console.log('form', form.data);
        setselectedClassSession(session)
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClassSession) return;
        form.put(route('class-sessions.update', selectedClassSession.session_id), {
            onSuccess: () => {
                form.setDefaults({
                    session_date: '',
                    start_time: '',
                    end_time: '',
                    status: null,
                    subject_id: 0,
                    teacher_id: 0,
                    class_id: 0
                });
                setIsEditClassSubjectOpen(false);
                setselectedClassSession(null);
                form.reset();
                toast.success('ClassSession updated successfully');
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
    const handleDeleteClick = (session: ClassSession) => {
        setselectedClassSession(session);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedClassSession) return;
        router.delete(route('class-sessions.destroy', selectedClassSession.session_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedClassSession(null);
                toast.success('ClassSession deleted successfully');
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
            <Head title="ClassSessions" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">ClassSession</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add ClassSession
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New ClassSession</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create a new class session.
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">

                                    <Label htmlFor="session_date">Session Date</Label>
                                    <Input
                                        id="session_date"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.session_date}
                                        onChange={e => form.setData('session_date', e.target.value)}
                                        required
                                    />
                                    {form.errors.session_date && (
                                        <p className="text-sm text-destructive">{form.errors.session_date}</p>
                                    )}
                                    <Label htmlFor="start_time">Start Time</Label>
                                    <Input
                                        id="start_time"
                                        type="time"
                                        placeholder="HH:MM"
                                        // step={"1"}
                                        value={form.data.start_time}
                                        onChange={e => form.setData('start_time', e.target.value)}
                                        required
                                    />
                                    {form.errors.start_time && (
                                        <p className="text-sm text-destructive">{form.errors.start_time}</p>
                                    )}
                                    <Label htmlFor="end_time">End Time</Label>
                                    <Input
                                        id="end_time"
                                        type="time"
                                        placeholder="HH:MM"
                                        value={form.data.end_time}
                                        onChange={e => form.setData('end_time', e.target.value)}
                                        required
                                    />
                                    {form.errors.end_time && (
                                        <p className="text-sm text-destructive">{form.errors.end_time}</p>
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
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="text-sm text-destructive">{form.errors.status}</p>
                                    )}

                                </div>
                                <DialogFooter>
                                    <Button onClick={(e) => { e.preventDefault(); setIsCreateOpen(false); setIsSelectClassSubjectOpen(true) }} disabled={form.processing}>
                                        Next
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>ClassSession List</CardTitle>
                        <CardDescription>
                            Manage and organize class_sessions in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableHead>ID</TableHead>
                                    <TableHead>Session Date</TableHead>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead>End Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    class_sessions.map((session, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{session.session_id}</TableCell>
                                            <TableCell>{session.session_date}</TableCell>
                                            <TableCell>{
                                                (() => {
                                                    let date = new Date();
                                                    let hour_minute_second: [number, number, number] = session.start_time.split(':').map(x => parseInt(x)) as [number, number, number];
                                                    date.setHours(...hour_minute_second)
                                                    return formatDateToAMPMWithSeconds(date);
                                                })()
                                            }</TableCell>
                                            <TableCell>{
                                                (() => {
                                                    let date = new Date();
                                                    let hour_minute_second: [number, number, number] = session.end_time.split(':').map(x => parseInt(x)) as [number, number, number];
                                                    date.setHours(...hour_minute_second)
                                                    return formatDateToAMPMWithSeconds(date);
                                                })()
                                            }</TableCell>
                                            <TableCell>{session.status}</TableCell>

                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => router.get(route('class-sessions.show', session.session_date))}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleEditClick(session)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDeleteClick(session)}
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

            <Dialog open={isSelectClassSubjectOpen} onOpenChange={setIsSelectClassSubjectOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Class Subject</DialogTitle>
                        <DialogDescription>
                            Please select a class subject to proceed with creating a class session.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Subject ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Subject | undefined = minimal_subjects!.find(m => m.subject_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("subject name") as HTMLInputElement)!.value = found!.name
                                form.setData('subject_id', parseInt(val));
                            }}>
                                <SelectTrigger id="subject_id">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_subjects!.map(x =>
                                            <SelectItem key={x.subject_id} value={x.subject_id.toString()}>
                                                {x.subject_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Subject Name</Label>
                            <Input id="subject name" readOnly></Input>

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="teacher_id">Subject ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Teacher | undefined = minimal_teachers!.find(m => m.teacher_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("teacher name") as HTMLInputElement)!.value = found!.teacher_name
                                form.setData('teacher_id', parseInt(val));
                            }}>
                                <SelectTrigger id="teacher_id">
                                    <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_teachers!.map(x =>
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
                        <div className="space-y-2">
                            <Label htmlFor="">Class ID</Label>
                            <Select onValueChange={(val) => {
                                form.setData('class_id', parseInt(val));
                            }}>
                                <SelectTrigger id="class_id">
                                    <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_classes!.map(x =>
                                            <SelectItem key={x.class_id} value={x.class_id.toString()}>
                                                {x.class_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>


                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsSelectClassSubjectOpen(false); setIsCreateAttendanceOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={isCreateAttendanceOpen} onOpenChange={setIsCreateAttendanceOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Attendance</DialogTitle>
                        <DialogDescription>
                            Please create attendance for the class session.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                onValueChange={(val) => attendenceForm.setData('status', val)}
                                value={attendenceForm.data.status || undefined}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Present">Present</SelectItem>
                                    <SelectItem value="Absent">Absent</SelectItem>
                                    <SelectItem value="Late">Late</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="remark">Remark</Label>
                            <Input
                                id="remark"
                                placeholder="Enter remark"
                                value={attendenceForm.data.remarks!}
                                onChange={e => attendenceForm.setData('remarks', e.target.value)}
                                required
                            />

                        </div>

                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsCreateAttendanceOpen(false); setIsSelectStudentOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={isSelectStudentOpen} onOpenChange={setIsSelectStudentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Student</DialogTitle>
                        <DialogDescription>
                            Please select a student to proceed with creating attendance for the class session.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="student_id">Student ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Student | undefined = minimal_students!.find(m => m.student_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("student name") as HTMLInputElement)!.value = found!.student_name
                                attendenceForm.setData('student_id', parseInt(val));
                            }}>
                                <SelectTrigger id="student_id">
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_students!.map(x =>
                                            <SelectItem key={x.student_id} value={x.student_id.toString()}>
                                                {x.student_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Student Name</Label>
                            <Input id="student name" readOnly></Input>

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
                        <DialogTitle>Edit Session</DialogTitle>
                        <DialogDescription>
                            Update the session information.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <div className="space-y-2">

                                <Label htmlFor="session_date">Session Date</Label>
                                <Input
                                    id="session_date"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    value={form.data.session_date}
                                    onChange={e => form.setData('session_date', e.target.value)}
                                    required
                                />
                                {form.errors.session_date && (
                                    <p className="text-sm text-destructive">{form.errors.session_date}</p>
                                )}
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                    id="start_time"
                                    type="time"
                                    placeholder="HH:MM:SS"
                                    value={form.data.start_time}
                                    onChange={e => form.setData('start_time', e.target.value)}
                                    required
                                />
                                {form.errors.start_time && (
                                    <p className="text-sm text-destructive">{form.errors.start_time}</p>
                                )}
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                    id="end_time"
                                    type="time"
                                    placeholder="HH:MM:SS"
                                    value={form.data.end_time}
                                    onChange={e => form.setData('end_time', e.target.value)}
                                    required
                                />
                                {form.errors.end_time && (
                                    <p className="text-sm text-destructive">{form.errors.end_time}</p>
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
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.status && (
                                    <p className="text-sm text-destructive">{form.errors.status}</p>
                                )}

                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { e.preventDefault(); setIsEditOpen(false); setIsEditClassSubjectOpen(true) }} disabled={form.processing}>
                                Next
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditClassSubjectOpen} onOpenChange={setIsEditClassSubjectOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Class Subject</DialogTitle>
                        <DialogDescription>
                            Please select a class subject to proceed with creating a class session.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Subject ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Subject | undefined = minimal_subjects!.find(m => m.subject_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("subject name") as HTMLInputElement)!.value = found!.name
                                form.setData('subject_id', parseInt(val));
                            }}>
                                <SelectTrigger id="subject_id">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_subjects!.map(x =>
                                            <SelectItem key={x.subject_id} value={x.subject_id.toString()}>
                                                {x.subject_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <Label>Subject Name</Label>
                            <Input id="subject name" readOnly></Input>

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="teacher_id">Subject ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Teacher | undefined = minimal_teachers!.find(m => m.teacher_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("teacher name") as HTMLInputElement)!.value = found!.teacher_name
                                form.setData('teacher_id', parseInt(val));
                            }}>
                                <SelectTrigger id="teacher_id">
                                    <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_teachers!.map(x =>
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
                        <div className="space-y-2">
                            <Label htmlFor="">Class ID</Label>
                            <Select onValueChange={(val) => {
                                form.setData('class_id', parseInt(val));
                            }}>
                                <SelectTrigger id="class_id">
                                    <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_classes!.map(x =>
                                            <SelectItem key={x.class_id} value={x.class_id.toString()}>
                                                {x.class_id}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>


                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Submit
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