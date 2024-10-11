import { Component, input, output, computed, Signal } from '@angular/core';
import { Student } from '../../../../interfaces/student.interface';
import { RouterLink } from '@angular/router';
import { AppLinkButtonComponent } from '../../../App/LinkButton/AppLinkButton.component';
import { AppButtonComponent } from '../../../App/Button/AppButton.component';
import { AppButton } from '../../../../interfaces/app.interface';
import { Course } from '../../../../interfaces/course.interface';
import { AppDotsButtonComponent } from '../../../App/DotsButton/AppDotsButton.component';

@Component({
  selector: 'student-table-row',
  standalone: true,
  imports: [
    RouterLink,
    AppLinkButtonComponent,
    AppButtonComponent,
    AppDotsButtonComponent,
  ],
  templateUrl: './Row.component.html',
  styleUrl: './Row.component.css',
})
export class StudentTableRowComponent {
  // Parent component data
  studentRow = input<Student>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    courses: [],
  });
  rowIndex = input<number>(0);
  courses = input<Course[]>([]);

  deleteStudentEvent = output<string>();

  buttonOptions: AppButton = {
    buttonType: 'button',
    buttonText: 'delete',
    buttonClasses: [],
  };

  oddRow: Signal<string> = computed<string>(() =>
    this.rowIndex() % 2 !== 0 ? 'odd-row' : ''
  );
  mapCourses: Signal<string> = computed(() => {
    return this.studentRow()
      .courses?.map((id: number) => {
        const getCourse = this.courses().find(
          (course: Course) => id.toString() === course.id
        );
        return getCourse?.name ?? '';
      })
      .join(', ');
  });
  linkButtonTo: Signal<string> = computed(
    () => `/edit/${this.studentRow().id}`
  );

  onDeleteStudent(event: Event): void {
    if (!event?.target) {
      return;
    }

    this.deleteStudentEvent.emit(this.studentRow().id);
  }
}
