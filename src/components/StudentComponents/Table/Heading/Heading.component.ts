import { Component, input } from '@angular/core';
import { StudentTableHeading } from '../../../../interfaces/student.interface';

@Component({
  selector: 'student-table-heading',
  standalone: true,
  templateUrl: './Heading.component.html',
  styleUrl: './Heading.component.css',
})
export class StudentTableHeadingComponent {
  // Parent component data
  headingCols = input<StudentTableHeading>({
    firstName: '',
    lastName: '',
    email: '',
    courses: '',
    commands: '',
  });
}
