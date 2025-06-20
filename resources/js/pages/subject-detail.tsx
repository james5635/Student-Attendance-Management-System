import type { Classroom, ClassSubject, Schedule, Subject } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import AppLayout from '@/layouts/app';
import { Bold } from 'lucide-react';

type SubjectDetail = Pick<ClassSubject, 'class_id' | 'teacher_id'> &
  Pick<Schedule, 'classroom_id' | 'day_of_week' | 'start_time' | 'end_time'> &
  Pick<Classroom, 'building' | 'room_number' | 'capacity'>;

interface SubjectDetailProps {
  subject_details: SubjectDetail[];
  subject: Subject;
}

export default function SubjectDetail({ subject_details, subject }: SubjectDetailProps) {
  console.log(subject);
  return (
    <AppLayout>
      <Card className=" shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Subject Detail</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detail of the subject <strong>ID {subject.subject_id}</strong> including classroom and schedule.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center whitespace-nowrap">Class ID</TableHead>
                <TableHead className="text-center whitespace-nowrap">Teacher ID</TableHead>
                <TableHead className="text-center whitespace-nowrap">Building</TableHead>
                <TableHead className="text-center whitespace-nowrap">Room Number</TableHead>
                <TableHead className="text-center whitespace-nowrap">Capacity</TableHead>
                <TableHead className="text-center whitespace-nowrap">Classroom ID</TableHead>
                <TableHead className="text-center whitespace-nowrap">Day of Week</TableHead>
                <TableHead className="text-center whitespace-nowrap">Start Time</TableHead>
                <TableHead className="text-center whitespace-nowrap">End Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {subject_details.map((detail, index) => (
                <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-center">{detail.class_id}</TableCell>
                  <TableCell className="text-center">{detail.teacher_id}</TableCell>
                  <TableCell className="text-center">{detail.building}</TableCell>
                  <TableCell className="text-center">{detail.room_number}</TableCell>
                  <TableCell className="text-center">{detail.capacity}</TableCell>
                  <TableCell className="text-center">{detail.classroom_id}</TableCell>
                  <TableCell className="text-center">{detail.day_of_week}</TableCell>
                  <TableCell className="text-center">{detail.start_time}</TableCell>
                  <TableCell className="text-center">{detail.end_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
