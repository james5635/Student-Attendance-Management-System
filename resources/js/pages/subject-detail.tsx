import type { Classroom, ClassSubject, Schedule } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import AppLayout from '@/layouts/app';

type SubjectDetail = Pick<ClassSubject, 'class_id' | 'teacher_id'> &
  Pick<Schedule, 'classroom_id' | 'day_of_week' | 'start_time' | 'end_time'> &
  Pick<Classroom, 'building' | 'room_number' | 'capacity'>
interface SubjectDetailProps {
  subject_details: SubjectDetail[];
}
export default function SubjectDetail({ subject_details }: SubjectDetailProps) {
  console.log(subject_details)

  return (
    <AppLayout>

      <Card>
        <CardHeader>
          <CardTitle>Subject Detail</CardTitle>
          <CardDescription>Detail of the subject including classroom and schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Teacher ID</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Classroom ID</TableHead>
                <TableHead>Day of Week</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subject_details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.class_id}</TableCell>
                  <TableCell>{detail.teacher_id}</TableCell>
                  <TableCell>{detail.building}</TableCell>
                  <TableCell>{detail.room_number}</TableCell>
                  <TableCell>{detail.capacity}</TableCell>
                  <TableCell>{detail.classroom_id}</TableCell>
                  <TableCell>{detail.day_of_week}</TableCell>
                  <TableCell>{detail.start_time}</TableCell>
                  <TableCell>{detail.end_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </AppLayout>
  );
}