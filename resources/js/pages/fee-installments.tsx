import AppLayout from '@/layouts/app';
import type { FeeInstallment, Student } from '../types';
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

type Minimal_Student = Pick<Student, 'student_id' | 'first_name' | 'last_name'>;


interface FeeInstallmentPageProps {
    fee_installments: FeeInstallment[];
    minimal_students: Minimal_Student[];

}

type FeeInstallmentFormData = Omit<FeeInstallment,  'created_at' | 'updated_at'>;
export default function FeeInstallmentPage({ fee_installments, minimal_students }: FeeInstallmentPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSelectStudentOpen, setIsSelectStudentOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedFeeInstallment, setselectedFeeInstallment] = useState<FeeInstallment | null>(null);

    console.log(minimal_students)
    // 
    const form: InertiaFormProps<FeeInstallmentFormData> = useForm<FeeInstallmentFormData>({
        student_id: 0,
        installment_no: 0,
        amount: 0,
        due_date: '',
        payment_date: null,
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
        form.post(route("fee-installments.store"), {
            preserveScroll: true,
            fresh: true,
            onSuccess: () => {
                // must set the default to prevent reset to previous submit
                form.setDefaults({
                    student_id: 0,
                    installment_no: 0,
                    amount: 0,
                    due_date: '',
                    payment_date: null,
                    status: null
                });
                form.reset();
                setIsSelectStudentOpen(false);
                toast.success('FeeInstallment created successfully')
            },
            onError: (err: Object) => {

                Object.values(err).forEach((val) => {
                    toast.error(val);
                })
                form.clearErrors();

            }
        })


    }


    const handleEditClick = (fee_installment: FeeInstallment) => {
        setselectedFeeInstallment(fee_installment);

        form.setData({
            student_id: fee_installment.student_id,
            installment_no: fee_installment.installment_no,
            amount: fee_installment.amount,
            due_date: fee_installment.due_date,
            payment_date: fee_installment.payment_date || null,
            status: fee_installment.status || null
        });
        setIsEditOpen(true);
    }
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFeeInstallment) return;
        console.log(form.data)
        console.log(route('fee-installments.update', [selectedFeeInstallment.student_id, selectedFeeInstallment.installment_no]))
        form.put(route('fee-installments.update', [selectedFeeInstallment.student_id, selectedFeeInstallment.installment_no]), 
       
        {
            onSuccess: () => {
                form.setDefaults({
                    student_id: 0,
                    installment_no: 0,
                    amount: 0,
                    due_date: '',
                    payment_date: null,
                    status: null
                });
                setIsEditOpen(false);
                setselectedFeeInstallment(null);
                form.reset();
                toast.success('FeeInstallment updated successfully');
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
    const handleDeleteClick = (subject: FeeInstallment) => {
        setselectedFeeInstallment(subject);
        setIsDeleteOpen(true);
    }
    const handleOKDeleteClick = () => {
        if (!selectedFeeInstallment) return;
        router.delete(route('fee_installments.destroy', selectedFeeInstallment.fee_installment_id), {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setselectedFeeInstallment(null);
                toast.success('FeeInstallment deleted successfully');
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
            <Head title="FeeInstallments" />
            <ToastContainer />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">FeeInstallment</h1>
                    <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add fee installment
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add new fee installment</DialogTitle>
                                <DialogDescription>
                                    create a fee installment for a student in your institution.

                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="installment_no">Installment No</Label>
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
                                    )}
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
                        <CardTitle>FeeInstallment List</CardTitle>
                        <CardDescription>
                            Manage and organize fee installments in your institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Installment No</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {fee_installments.map((fee_installment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{fee_installment.installment_no}</TableCell>
                                        <TableCell>{fee_installment.student_id}</TableCell>
                                        <TableCell>{'$' + fee_installment.amount}</TableCell>
                                        <TableCell>{fee_installment.due_date}</TableCell>
                                        <TableCell>{fee_installment.payment_date || 'Not Paid'}</TableCell>
                                        <TableCell>{fee_installment.status || 'Pending'}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleEditClick(fee_installment)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(fee_installment)}>
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
                            Choose a student to associate with the fee installment.
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
                                Update FeeInstallment
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