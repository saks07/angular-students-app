import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentFormComponent } from '../../../components/StudentComponents/Form/Form.component';

@Component({
  selector: 'student-edit',
  standalone: true,
  imports: [RouterOutlet, StudentFormComponent],
  templateUrl: './StudentEdit.component.html',
  styleUrl: './StudentEdit.component.css',
})
export class StudentEditComponent {
  formType: string = 'edit';
  formTitle: string = 'edit student';
}
