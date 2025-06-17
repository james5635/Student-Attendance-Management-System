import AppLayout from '@/layouts/app';
import type { Classroom } from '../types';
// import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { toast } from '@/components/ui/use-toast';
// import { Toaster, toast } from 'react-hot-toast';
// import { Toaster, toast } from 'sonner';
import { ToastContainer, toast } from 'react-toastify';

interface ClassroomProps {
    classrooms: Classroom[];
}
export default function Classroom({ classrooms }: ClassroomProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Classroom | null>(null);


    const form = useForm({
        building: '',
        room_number: '',
        capacity: null
    });
    const handleSubmit = (e: React.FormEvent) => {
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
    const handleCreate = () => {
        setIsCreateOpen(true);
    }
    const handleEdit = (department: Classroom) => {
        setSelectedDepartment(department);
    }
    const handleDelete = (department: Classroom) => {
        setSelectedDepartment(department);
        setIsDeleteOpen(true);
    }
    return (
        <AppLayout>
            <Head title="Classrooms" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Classroom Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter department name"
                                        value={form.data.building}
                                        onChange={e => form.setData('building', e.target.value)}
                                        required
                                    />
                                    {form.errors.building && (
                                        <p className="text-sm text-destructive">{form.errors.building}</p>
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
                                                onClick={() => handleEdit(department)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(department)}
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


        </AppLayout>

    );
}