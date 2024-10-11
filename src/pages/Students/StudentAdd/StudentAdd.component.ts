import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentFormComponent } from '../../../components/StudentComponents/Form/Form.component';

@Component({
  selector: 'student-add',
  standalone: true,
  imports: [RouterOutlet, StudentFormComponent],
  templateUrl: './StudentAdd.component.html',
  styleUrl: './StudentAdd.component.css',
})
export class StudentAddComponent {
  formType: string = 'add';
  formTitle: string = 'add new student';
}
