import { Course, CourseDisplay } from './course.interface';
import {
  Student,
  StudentPaginated,
  StudentTableHeading,
} from './student.interface';

export interface IStudentService {
  getStudents: () => Promise<StudentPaginated>;
  buildTableHeading: () => StudentTableHeading;
  getStudent: (id: string) => Promise<Student | null>;
  createStudent: (body: Student) => Promise<Student | null>;
  updateStudent: (id: string, body: Student) => Promise<Student | null>;
  deleteStudent: (id: string) => Promise<Student | null>;
}

export interface ICoursesService {
  getCourses: () => Promise<Course[]>;
  mapCourses: (studentData: Student, courses: Course[]) => CourseDisplay[];
}
