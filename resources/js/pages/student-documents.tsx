import AppLayout from '@/layouts/app';
import type { StudentDocument, Student } from '../types';
import { useState } from 'react';
import { Head, useForm, router, InertiaFormProps } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2, Eye, Download } from 'lucide-react';
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

type Minimal_Student = Pick<Student, 'student_id' | 'first_name' | 'last_name'>;


interface StudentDocumentPageProps {
    student_documents: StudentDocument[];
    minimal_students: Minimal_Student[];

}

type StudentDocumentFormData = Omit<StudentDocument, 'file_path' | 'created_at' | 'updated_at'> & {
    file?: File | null;
}
export default function StudentDocumentPage({ student_documents, minimal_students }: StudentDocumentPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectStudentOpen, setIsSelectStudentOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedStudentDocument, setselectedStudentDocument] = useState<StudentDocument | null>(null);

    console.log(minimal_students)
    // 
    const form: InertiaFormProps<StudentDocumentFormData> = useForm<StudentDocumentFormData>({
        student_id: 0,
        document_type: '',
        file: null,
        issue_date: '',
        submitted_date: null,
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
        form.post(route("student-documents.store"), {
            preserveScroll: true,
            fresh: true,
            forceFormData: true, // Needed for file uploads with Inertia
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    student_id: 0,
                    document_type: '',
                    file: null,
                    issue_date: '',
                    submitted_date: null,
                });
                form.reset();
                setIsSelectStudentOpen(false);
                toast.success('Student Document created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                form.clearErrors();

            }
        })


    }


    const handleEditClick = (student_document: StudentDocument) => {
        setselectedStudentDocument(student_document);

        form.setData({
            student_id: student_document.student_id,
            document_type: student_document.document_type,
            file: null,
            issue_date: student_document.issue_date,
            submitted_date: student_document.submitted_date,
        });
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudentDocument) return;
        console.log(form.data)
        console.log(route('student_documents.update', [selectedStudentDocument.student_id, selectedStudentDocument.document_type]))
        form.put(route('student_documents.update', [selectedStudentDocument.student_id, selectedStudentDocument.document_type]),

            {
                onSuccess: () => {
                    form.setDefaults({
                        student_id: 0,
                        document_type: '',
                        file: null,
                        issue_date: '',
                        submitted_date: null,
                    });
                    setIsEditOpen(false);
                    setselectedStudentDocument(null);
                    form.reset();
                    toast.success('StudentDocument updated successfully');
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
    const handleDeleteClick = (subject: StudentDocument) => {
        setselectedStudentDocument(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedStudentDocument) return;
        router.delete(route('student_documents.destroy', [selectedStudentDocument.student_id, selectedStudentDocument.installment_no]), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedStudentDocument(null);
                toast.success('StudentDocument deleted successfully');
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
            <Head title="StudentDocuments" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Student Document</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add student document
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add new student document</DialogTitle>
                                <DialogDescription>
                                    create a student document in your institution.

                                </DialogDescription>
                            </DialogHeader>


                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="installment_no">Document Type</Label>
                                    <Input
                                        id="document_type"
                                        placeholder="Enter document type"
                                        value={form.data.document_type}
                                        onChange={e => form.setData('document_type', (e.target.value))}
                                        required
                                    />
                                    {form.errors.document_type && (
                                        <p className="text-sm text-destructive">{form.errors.document_type}</p>
                                    )}
                                    <Label htmlFor="file">File</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        placeholder="Enter file"
                                        // value={form.data.file}
                                        onChange={e => form.setData('file', e.target.files?.[0])}
                                        required
                                    />
                                    {form.errors.file && (
                                        <p className="text-sm text-destructive">{form.errors.file}</p>
                                    )}
                                    <Label htmlFor="issue_date">Issue Date</Label>
                                    <Input
                                        id="issue_date"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.issue_date!}
                                        onChange={e => form.setData('issue_date', e.target.value)}
                                        required
                                    />
                                    {form.errors.issue_date && (
                                        <p className="text-sm text-destructive">{form.errors.issue_date}</p>
                                    )}
                                    <Label htmlFor="submitted_date">Submitted Date</Label>
                                    <Input
                                        id="submitted_date"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        value={form.data.submitted_date || ''}
                                        onChange={e => form.setData('submitted_date', e.target.value)}
                                    />
                                    {form.errors.submitted_date && (
                                        <p className="text-sm text-destructive">{form.errors.submitted_date}</p>
                                    )}


                                </div>

                                <DialogFooter>
                                    <Button onClick={(e) => { e.preventDefault(); setIsCreateOpen(false); setIsSelectStudentOpen(true) }} disabled={form.processing}>
                                        Next
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>StudentDocument List</CardTitle>
                        <CardDescription>
                            Manage and organize student document in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Document Type</TableHead>
                                    <TableHead>File</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Submitted Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {student_documents.map((student_document, index) => (
                                    <TableRow key={index}>

                                        <TableCell>{student_document.student_id}</TableCell>
                                        <TableCell>{student_document.document_type}</TableCell>
                                        <TableCell>
                                            {/* {"View"} */}
                                            <div className="flex items-center gap-4">
                                                <a
                                                    href={`/storage/${student_document.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </a>

                                                <a
                                                    href={`/storage/${student_document.file_path}`}
                                                    download
                                                    className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    <span>Download</span>
                                                </a>
                                            </div>

                                        </TableCell>
                                        <TableCell>{student_document.issue_date}</TableCell>
                                        <TableCell>{student_document.submitted_date}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleEditClick(student_document)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(student_document)}>
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

            <Dialog open={isSelectStudentOpen} onOpenChange={setIsSelectStudentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select student</DialogTitle>
                        <DialogDescription>
                            Choose a student for the document.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Student ID</Label>
                            <Select onValueChange={(val) => {
                                let found: Minimal_Student | undefined = minimal_students.find(m => m.student_id === parseInt(val)); // must use this semicolon to distingush the calling function ()
                                (document.getElementById("student name") as HTMLInputElement)!.value = `${found!.first_name} ${found!.last_name}`
                                form.setData('student_id', parseInt(val));
                            }}>
                                <SelectTrigger id="student_id">
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        minimal_students.map(x =>
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
                        <DialogTitle>Edit fee installment</DialogTitle>
                        <DialogDescription>
                            Update the fee installment information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="space-y-2">
                            {/* <div className="space-y-2">
                                <Label htmlFor="student_id">Student ID</Label>
                                <Select onValueChange={(val) => {
                                    form.setData('student_id', parseInt(val));
                                }}>
                                    <SelectTrigger id="student_id">
                                        <SelectValue placeholder="Select a student" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {
                                            minimal_students.map(x =>
                                                <SelectItem key={x.student_id} value={x.student_id.toString()}>
                                                    {x.student_id}
                                                </SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>

                            </div> */}
                            <div className="space-y-2">
                                {/* <Label htmlFor="installment_no">Installment No</Label>
                                    <Input
                                        id="installment_no"
                                        type="number"
                                        placeholder="Enter installment number"
                                        value={form.data.installment_no}
                                        onChange={e => form.setData('installment_no', parseInt(e.target.value))}
                                        required
                                    />
                                    {form.errors.installment_no && (
                                        <p className="text-sm text-destructive">{form.errors.installment_no}</p>
                                    )} */}
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={form.data.amount}
                                    onChange={e => form.setData('amount', parseFloat(e.target.value))}
                                    required
                                />
                                {form.errors.amount && (
                                    <p className="text-sm text-destructive">{form.errors.amount}</p>
                                )}
                                <Label htmlFor="due_date">Due Date</Label>
                                <Input
                                    id="due_date"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    value={form.data.due_date}
                                    onChange={e => form.setData('due_date', e.target.value)}
                                    required
                                />
                                {form.errors.due_date && (
                                    <p className="text-sm text-destructive">{form.errors.due_date}</p>
                                )}
                                <Label htmlFor="payment_date">Payment Date</Label>
                                <Input
                                    id="payment_date"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    value={form.data.payment_date || ''}
                                    onChange={e => form.setData('payment_date', e.target.value)}
                                />
                                {form.errors.payment_date && (
                                    <p className="text-sm text-destructive">{form.errors.payment_date}</p>
                                )}
                                <Label htmlFor='status'>Status</Label>
                                <Select onValueChange={(val) => {
                                    form.setData('status', val);
                                }}>
                                    <SelectTrigger id='status'>
                                        <SelectValue placeholder='Select status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Pending'>Pending</SelectItem>
                                        <SelectItem value='Paid'>Paid</SelectItem>
                                        <SelectItem value='Overdue'>Overdue</SelectItem>
                                        <SelectItem value='Cancelled'>Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.status && (
                                    <p className="text-sm text-destructive">{form.errors.status}</p>
                                )}

                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Update StudentDocument
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