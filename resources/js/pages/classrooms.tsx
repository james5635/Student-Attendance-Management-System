import AppLayout from '@/layouts/app';
import type { Classroom } from '../types';
import { useState } from 'react';
import { Head, useForm, router, InertiaFormProps } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
interface ClassroomProps {
    classrooms: Classroom[];
}

type ClassroomFormData = Omit<Classroom, 'classroom_id' | 'created_at' | 'updated_at'>;

export default function Classroom({ classrooms }: ClassroomProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedClassroom, setselectedClassroom] = useState<Classroom | null>(null);


    const form: InertiaFormProps<ClassroomFormData> = useForm<ClassroomFormData>({
        building: '',
        room_number: '',
        capacity: null

    });
    const handleCreateOpenChange = (open: boolean) => {
        setIsCreateOpen(open);
        if (open) {
            form.reset();
        }
    }
    const handleCreateSubmit = (e: React.FormEvent) => {
        console.log('form', form.data);
        e.preventDefault();
        form.post(route("classrooms.store"), {
            onSuccess: () => {
                setIsCreateOpen(false);
                form.reset();
                toast.success('Classroom created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })

            }
        })
    }

    const handleEditClick = (classroom: Classroom) => {
        setselectedClassroom(classroom);
        form.setData('building', classroom.building);
        form.setData('room_number', classroom.room_number);
        form.setData('capacity', classroom.capacity);
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClassroom) return;
        form.put(route('classrooms.update', selectedClassroom.classroom_id), {
            onSuccess: () => {
                setIsEditOpen(false);
                setselectedClassroom(null);
                form.reset();
                toast.success('Classroom updated successfully');
            },
            onError: (err: Object) => {
                // Object.values(err).forEach((val) => {
                //     toast.error(val);
                // })
                toast.error('Failed to update classroom');
            }
        });
    };
    const handleDeleteClick = (classroom: Classroom) => {
        setselectedClassroom(classroom);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedClassroom) return;
        router.delete(route('classrooms.destroy', selectedClassroom.classroom_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedClassroom(null);
                toast.success('Classroom deleted successfully');
            },
            onError: (err: Object) => {
                // Object.values(err).forEach((val) => {
                //     toast.error(val);
                // })
                toast.error('Failed to delete classroom');
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Classrooms" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Classroom
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Classroom</DialogTitle>
                                <DialogDescription>
                                    Create a new classroom in the system.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="building">Building</Label>
                                    <Input
                                        id="building"
                                        placeholder="Enter building"
                                        value={form.data.building}
                                        onChange={e => form.setData('building', e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="room_number">Room Number</Label>
                                    <Input
                                        id="room_number"
                                        placeholder="Enter room number"
                                        value={form.data.room_number}
                                        onChange={e => form.setData('room_number', e.target.value)}
                                        required
                                    />
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        placeholder="Enter capacity"
                                        value={form.data.capacity || ''}
                                        onChange={e => form.setData('capacity', e.target.value ? parseInt(e.target.value) : null)}
                                        required
                                    />

                                    {form.errors.building && (
                                        <p className="text-sm text-destructive">{form.errors.building}</p>
                                    )}
                                    {form.errors.room_number && (
                                        <p className="text-sm text-destructive">{form.errors.room_number}</p>)}
                                    {form.errors.capacity && (
                                        <p className="text-sm text-destructive">{form.errors.capacity}</p>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={form.processing}>
                                        Create Classroom
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Classroom List</CardTitle>
                        <CardDescription>
                            Manage and organize classrooms in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Building</TableHead>
                                    <TableHead>Room Number</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classrooms?.map((department) => (
                                    <TableRow key={department.classroom_id}>
                                        <TableCell className="font-medium">
                                            {department.classroom_id}
                                        </TableCell>
                                        <TableCell>{department.building}</TableCell>
                                        <TableCell>
                                            {department.room_number}
                                        </TableCell>
                                        <TableCell>
                                            {department.capacity}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleEditClick(department)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={(e) => handleDeleteClick(department)}
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
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                        <DialogDescription>
                            Update the department information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="building">Building</Label>
                            <Input
                                id="building"
                                placeholder="Enter building"
                                value={form.data.building}
                                onChange={e => form.setData('building', e.target.value)}
                                required
                            />
                            <Label htmlFor="room_number">Room Number</Label>
                            <Input
                                id="room_number"
                                placeholder="Enter room number"
                                value={form.data.room_number}
                                onChange={e => form.setData('room_number', e.target.value)}
                                required
                            />
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                                id="capacity"
                                type="number"
                                placeholder="Enter capacity"
                                value={form.data.capacity || ''}
                                onChange={e => form.setData('capacity', e.target.value ? parseInt(e.target.value) : null)}
                                required
                            />

                            {form.errors.building && (
                                <p className="text-sm text-destructive">{form.errors.building}</p>
                            )}
                            {form.errors.room_number && (
                                <p className="text-sm text-destructive">{form.errors.room_number}</p>)}
                            {form.errors.capacity && (
                                <p className="text-sm text-destructive">{form.errors.capacity}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update Classroom
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
                            classroom and remove it from our servers.
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

    );
}