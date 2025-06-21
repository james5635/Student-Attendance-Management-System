import type { ClassSession } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import AppLayout from '@/layouts/app';

interface ClassSessionDetail {
    attendance_id: number;
    attendance_status: string;
    remarks: string | null;

    class_id: number | null;

    student_id: number;
    student_first_name: string;
    student_last_name: string;
    dob: string | null; // use `Date` if you parse it
    gender: string | null;
    student_email: string;
    student_phone: string | null;
    address: string | null;
    student_department_id: number | null;
    enrollment_year: number | null;
    student_status: string | null;

    subject_id: number | null;
    subject_name: string | null;

    teacher_id: number | null;
    teacher_first_name: string | null;
    teacher_last_name: string | null;
}
interface ClassSessionDetailProps {
    class_session: ClassSession;
    class_session_details: ClassSessionDetail[];

}
export default function ClassSessionDetail({ class_session, class_session_details }: ClassSessionDetailProps) {
    console.log(class_session, class_session_details);
    return (
        <AppLayout>
            <Card className=" shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Student Detail</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Detail of the class session <strong>ID {class_session.session_id}</strong> including their attendance and student details.
                    </CardDescription>
                </CardHeader>

                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Attendance ID</TableHead>
                                <TableHead className="text-center">Attendance Status</TableHead>
                                <TableHead className="text-center">Remarks</TableHead>
                                <TableHead className="text-center">Class ID</TableHead>
                                <TableHead className="text-center">Student ID</TableHead>
                                <TableHead className="text-center">Student Name</TableHead>
                                {/* <TableHead className="text-center">First Name</TableHead> */}
                                {/* <TableHead className="text-center">Last Name</TableHead> */}
                                <TableHead className="text-center">DOB</TableHead>
                                <TableHead className="text-center">Gender</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                                <TableHead className="text-center">Phone</TableHead>
                                <TableHead className="text-center">Address</TableHead>
                                <TableHead className="text-center">Department ID</TableHead>
                                <TableHead className="text-center">Enrollment Year</TableHead>
                                <TableHead className="text-center">Student Status</TableHead>
                                <TableHead className="text-center">Subject ID</TableHead>
                                <TableHead className="text-center">Subject Name</TableHead>
                                <TableHead className="text-center">Teacher ID</TableHead>
                                <TableHead className="text-center">Teacher Name</TableHead>
                                {/* <TableHead className="text-center">Teacher First Name</TableHead>
                                <TableHead className="text-center">Teacher Last Name</TableHead> */}

                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {class_session_details.map((detail) => (
                                <TableRow key={detail.attendance_id}>
                                    <TableCell className="text-center">{detail.attendance_id}</TableCell>
                                    <TableCell className="text-center">{detail.attendance_status}</TableCell>
                                    <TableCell className="text-center">{detail.remarks ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.class_id ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.student_id}</TableCell>
                                    <TableCell className="text-center">{detail.student_first_name} {detail.student_last_name}</TableCell>
                                    <TableCell className="text-center">{detail.dob ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.gender ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.student_email}</TableCell>
                                    <TableCell className="text-center">{detail.student_phone ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.address ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.student_department_id ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.enrollment_year ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.student_status ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.subject_id ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.subject_name ?? '-'}</TableCell>
                                    <TableCell className="text-center">{detail.teacher_id ?? '-'}</TableCell>
                                    <TableCell className="text-center">
                                        {detail.teacher_first_name && detail.teacher_last_name
                                            ? `${detail.teacher_first_name} ${detail.teacher_last_name}`
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {class_session_details.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center text-muted-foreground">
                                        No class session details found for this class session.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}