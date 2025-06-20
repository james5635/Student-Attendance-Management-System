import type { Student, Enrollment, Teacher, SchoolClass } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import AppLayout from '@/layouts/app';

type StudentDetail = Pick<Enrollment, 'enrollment_date'> &
  Pick<SchoolClass, 'course_id' | 'year' | 'section'> &
{
  teacher_name: string;
  teacher_email: string;
  teacher_phone: string;
  teacher_department_id: number;
  teacher_hire_date: string;
  teacher_status: string;
}

interface StudentDetailProps {
  student_details: StudentDetail[];
  student: Student;
}

export default function StudentDetail({ student_details, student }: StudentDetailProps) {
  console.log(student);
  return (
    <AppLayout>
      <Card className=" shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Student Detail</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detail of the student <strong>ID {student.student_id}</strong> including their enrollment and class details.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Enrollment Date</TableHead>
                <TableHead className="text-center">Course ID</TableHead>
                <TableHead className="text-center">Year</TableHead>
                <TableHead className="text-center">Section</TableHead>
                <TableHead className="text-center">Teacher Name</TableHead>
                <TableHead className="text-center">Teacher Email</TableHead>
                <TableHead className="text-center">Teacher Phone</TableHead>
                <TableHead className="text-center">Teacher Department ID</TableHead>
                <TableHead className="text-center">Teacher Hire Date</TableHead>
                <TableHead className="text-center">Teacher Status</TableHead>
               
              </TableRow>
            </TableHeader>

            <TableBody>
              {student_details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{detail.enrollment_date}</TableCell>
                  <TableCell className="text-center">{detail.course_id}</TableCell>
                  <TableCell className="text-center">{detail.year}</TableCell>
                  <TableCell className="text-center">{detail.section}</TableCell>
                  <TableCell className="text-center">{detail.teacher_name}</TableCell>
                  <TableCell className="text-center">{detail.teacher_email}</TableCell>
                  <TableCell className="text-center">{detail.teacher_phone}</TableCell>
                  <TableCell className="text-center">{detail.teacher_department_id}</TableCell>
                  <TableCell className="text-center">{detail.teacher_hire_date}</TableCell>
                  <TableCell className="text-center">{detail.teacher_status}</TableCell>
                </TableRow>
              ))}
              {student_details.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    No enrollment details found for this student.
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
