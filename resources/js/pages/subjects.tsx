import AppLayout from '@/layouts/app';
import type { Subject } from '../types';
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

interface SubjectPageProps {
    subjects: Subject[];
    minimal_courses: { course_id: number, name: string }[]
}

type SubjectFormData = Omit<Subject, 'subject_id' | 'created_at' | 'updated_at'>;

export default function Subject({ subjects, minimal_courses }: SubjectPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSubject, setselectedSubject] = useState<Subject | null>(null);

    // minimal_courses.forEach((x) => console.log(x))
// 
    const form: InertiaFormProps<SubjectFormData> = useForm<SubjectFormData>({
        course_id: 0,
        name: '',
        code: '',
        credits: null,
        description: null,
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
        form.post(route("subjects.store"), {
            onSuccess: () => {
                setIsCreateOpen(false);
                form.reset();
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
                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="Course ID">Course ID</Label>
                                    <Select onValueChange={(value) => console.log("Selected:", value)}>
                                        <SelectTrigger id="Course ID">
                                            <SelectValue placeholder="Select a fruit" />
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
                                        Create Subject
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
                            <Label htmlFor="Course ID">Course ID</Label>
                            <Input
                                id="Course ID"

                                placeholder="Enter Course ID"
                                value={form.data.course_id ? form.data.course_id : ''}
                                onChange={e => form.setData('course_id', parseInt(e.target.value))}
                                required
                            />
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