import AppLayout from '@/layouts/app';
import type { Teacher, Department } from '../types';
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


interface TeacherPageProps {
    teachers: Teacher[];
    minimal_departments: Minimal_Department[];

}

type TeacherFormData = Omit<Teacher, 'teacher_id' | 'created_at' | 'updated_at'>;
export default function TeacherPage({ teachers, minimal_departments }: TeacherPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectDepartmentOpen, setIsSelectDepartmentOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTeacher, setselectedTeacher] = useState<Teacher | null>(null);


    // 
    const form: InertiaFormProps<TeacherFormData> = useForm<TeacherFormData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: null,
        department_id: null,
        hire_date: null, // YYYY-MM-DD
        status: null
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
        form.post(route("teachers.store"), {
            preserveScroll: true,
            fresh: true,
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: null,
                    department_id: null,
                    hire_date: null, // YYYY-MM-DD
                    status: null
                });
                form.reset();
                setIsSelectDepartmentOpen(false);
                toast.success('Teacher created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                form.clearErrors();

            }
        })


    }


    const handleEditClick = (teacher: Teacher) => {
        setselectedTeacher(teacher);

        form.setData({
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email,
            phone: teacher.phone,
            department_id: teacher.department_id,
            hire_date: teacher.hire_date, // YYYY-MM-DD
            status: teacher.status
        });
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeacher) return;
        form.put(route('teachers.update', selectedTeacher.teacher_id), {
            onSuccess: () => {
                form.setDefaults({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: null,
                    department_id: null,
                    hire_date: null, // YYYY-MM-DD
                    status: null
                });
                setIsEditOpen(false);
                setselectedTeacher(null);
                form.reset();
                toast.success('Teacher updated successfully');
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
    const handleDeleteClick = (subject: Teacher) => {
        setselectedTeacher(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedTeacher) return;
        router.delete(route('teachers.destroy', selectedTeacher.teacher_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedTeacher(null);
                toast.success('Teacher deleted successfully');
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
            <Head title="Teachers" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Teacher</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Teacher
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Teacher</DialogTitle>
                                <DialogDescription>
                                    Create a new course in the system.
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
                                    <Label htmlFor='hire_date'>Hire Date</Label>
                                    <Input
                                        id="hire_date"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.hire_date || ''}
                                        onChange={e => form.setData('hire_date', e.target.value)}
                                        required
                                    />
                                    {form.errors.hire_date && (
                                        <p className="text-sm text-destructive">{form.errors.hire_date}</p>
                                    )}
                                    <Label htmlFor="status">Status</Label>
                                    <Select onValueChange={(val) => {
                                        form.setData('status', val);
                                    }}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                            <SelectItem value="On Sabbatical">On Sabbatical</SelectItem>
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
                        <CardTitle>Teacher List</CardTitle>
                        <CardDescription>
                            Manage and organize teachers in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Teacher ID</TableHead>
                                    <TableHead>Department ID</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Hire Date</TableHead>
                                    <TableHead>Status</TableHead>   

                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {teachers.map((teacher) => (
                                    <TableRow key={teacher.teacher_id}>
                                        <TableCell>{teacher.teacher_id}</TableCell>
                                        <TableCell>{teacher.department_id}</TableCell>
                                        <TableCell>{teacher.first_name}</TableCell>
                                        <TableCell>{teacher.last_name}</TableCell>
                                        <TableCell>{teacher.email}</TableCell>
                                        <TableCell>{teacher.phone || 'N/A'}</TableCell>
                                        <TableCell>{teacher.hire_date || 'N/A'}</TableCell>
                                        <TableCell>{teacher.status}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleEditClick(teacher)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(teacher)}>
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
                            Choose a department to associate with the teacher.
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
                                    <Label htmlFor='hire_date'>Hire Date</Label>
                                    <Input
                                        id="hire_date"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.hire_date || ''}
                                        onChange={e => form.setData('hire_date', e.target.value)}
                                        required
                                    />
                                    {form.errors.hire_date && (
                                        <p className="text-sm text-destructive">{form.errors.hire_date}</p>
                                    )}
                                    <Label htmlFor="status">Status</Label>
                                    <Select onValueChange={(val) => {
                                        form.setData('status', val);
                                    }}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                            <SelectItem value="On Sabbatical">On Sabbatical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="text-sm text-destructive">{form.errors.status}</p>
                                    )}

                                </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update Teacher
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