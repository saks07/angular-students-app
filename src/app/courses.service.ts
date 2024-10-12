import { Injectable } from '@angular/core';
import { Course, CourseDisplay } from '../interfaces/course.interface';
import { Student } from '../interfaces/student.interface';
import { ICoursesService } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService implements ICoursesService {
  private baseUrl: string = 'http://localhost:3000/courses';

  async getCourses(): Promise<Course[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error((err as Error).message);
      return [];
    }
  }

  mapCourses(studentData: Student, courses: Course[]): CourseDisplay[] {
    return courses.map((item: Course) => {
      const newItem: CourseDisplay = { ...item, active: false };
      const checkCourse = studentData.courses?.find(
        (id: number) => id.toString() == item.id
      );
      if (checkCourse) {
        newItem.active = true;
      }

      return newItem;
    });
  }
}
