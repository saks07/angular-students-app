import { Component, input, computed, Signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Student } from '../../../interfaces/student.interface';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../app/student.service';
import { CoursesService } from '../../../app/courses.service';
import { Course, CourseDisplay } from '../../../interfaces/course.interface';
import { AppMessageComponent } from '../../App/Message/AppMessage.component';
import {
  AppButton,
  AppLinkButton,
  AppMessage,
} from '../../../interfaces/app.interface';
import { AppButtonComponent } from '../../App/Button/AppButton.component';
import { AppLinkButtonComponent } from '../../App/LinkButton/AppLinkButton.component';

type RequestType = { POST: 'POST'; PUT: 'PUT' };

@Component({
  selector: 'student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppMessageComponent,
    AppButtonComponent,
    AppLinkButtonComponent,
  ],
  templateUrl: './Form.component.html',
  styleUrl: './Form.component.css',
  providers: [StudentService, CoursesService],
})
export class StudentFormComponent {
  // Parent component data
  formActionType = input<string>('add');
  formTitle = input<string>('add');

  // Children components data
  messageOptions: AppMessage = {
    messageType: 'info',
    messageText: '',
  };
  buttonOptions: AppButton = {
    buttonType: 'submit',
    buttonText: 'add',
    buttonClasses: ['full-width'],
  };
  linkButtonOptions: AppLinkButton = {
    to: '',
    linkText: 'back to overview',
  };

  // Component state
  studentId: string | null = null;
  courses: Course[] = [];
  coursesDisplay: CourseDisplay[] = [];
  formSubmitted: boolean = false;

  // Form data
  studentForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    courses: new FormArray([], Validators.required),
  });

  get formCourses(): FormArray {
    return this.studentForm.controls['courses'] as FormArray;
  }

  // Computed
  inputReadonly: Signal<boolean> = computed(
    () => this.formActionType() === 'edit'
  );
  requestMethod: Signal<keyof RequestType> = computed(() =>
    this.formActionType() === 'add' ? 'POST' : 'PUT'
  );
  formClass: Signal<string> = computed(
    () => `app-form-${this.formActionType()}`
  );

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CoursesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.setButtonText();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // Only number accepted
      if (!Number(id)) {
        this.studentId = null;
        return;
      }
      this.studentId = params['id'];
    });
    await this.getCourses();
    this.getStudent();
  }

  onCourseChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (!checkbox) {
      return;
    }

    const courseId = Number(checkbox.value);
    if (checkbox.checked) {
      this.formCourses.push(new FormControl(courseId));
    } else {
      const findIndex = this.formCourses.getRawValue().indexOf(courseId);
      if (findIndex === -1) {
        return;
      }
      this.formCourses.removeAt(findIndex);
    }
  }

  checkRequiredInput(studentFormControlKey: string): boolean {
    return (
      this.studentForm.controls[studentFormControlKey]?.errors?.['required'] ??
      false
    );
  }

  checkEmailInput(): boolean {
    return this.studentForm.controls['email'].errors?.['email'] ?? false;
  }

  setButtonText(): void {
    this.buttonOptions.buttonText = this.formActionType();
  }

  async getCourses(): Promise<void> {
    const result = await this.courseService.getCourses();
    this.courses = result;
  }

  async getStudent(): Promise<void> {
    // Handle /add route
    if (this.formActionType() !== 'edit' || !this.studentId) {
      this.coursesDisplay = this.courses;
      return;
    }

    // Handle /edit/:id route
    const result = await this.studentService.getStudent(this.studentId);
    if (!result) {
      return;
    }

    const studentData = result;
    this.setStudentFormData(studentData);
    this.coursesDisplay = this.courseService.mapCourses(
      studentData,
      this.courses
    );
  }

  async getStudents(): Promise<number> {
    const result = await this.studentService.getStudents();
    if (result) {
      return result.pagination.items;
    }

    return -1;
  }

  async onStudentSubmit(): Promise<void> {
    this.formSubmitted = true;

    // Reset form message
    this.setMessageOptions({
      messageType: 'info',
      messageText: '',
    });

    // VALIDATION SKIPPED BECAUSE OF ANGULAR FORM MODULE VALIDATION ISSUE
    if (!this.studentForm.valid) {
      return;
    }

    if (this.requestMethod() === 'POST') {
      // Create student
      await this.createStudent();
    } else {
      // Update student
      await this.updateStudent();
    }
  }

  async createStudent(): Promise<void> {
    const studentCount = await this.getStudents();
    if (studentCount === -1) {
      return;
    }

    this.studentForm.controls['id'].setValue(studentCount.toString());

    const result = await this.studentService.createStudent(
      this.studentForm.value
    );

    if (result) {
      this.setMessageOptions({
        messageType: 'success',
        messageText: 'Student was successfully saved',
      });

      this.formSubmitted = false;
    } else {
      this.setMessageOptions({
        messageType: 'error',
        messageText: 'Something went wrong!',
      });
    }
  }

  async updateStudent(): Promise<void> {
    if (!this.studentId) {
      return;
    }

    const result = await this.studentService.updateStudent(
      this.studentId,
      this.studentForm.value
    );

    if (result) {
      this.setMessageOptions({
        messageType: 'success',
        messageText: `Student was successfully updated`,
      });

      this.formSubmitted = false;
    } else {
      this.setMessageOptions({
        messageType: 'error',
        messageText: 'Something went wrong!',
      });
    }
  }

  setStudentFormData(data?: Student): void {
    if (data) {
      this.studentForm.controls['id'].setValue(data.id);
      this.studentForm.controls['firstName'].setValue(data.firstName);
      this.studentForm.controls['lastName'].setValue(data.lastName);
      this.studentForm.controls['email'].setValue(data.email);
      if (data.courses.length) {
        data.courses.forEach((id: number) => {
          this.formCourses.push(new FormControl(id));
        });
      } else {
        this.formCourses.clear();
      }
      return;
    }

    this.studentForm.controls['id'].setValue('');
    this.studentForm.controls['firstName'].setValue('');
    this.studentForm.controls['lastName'].setValue('');
    this.studentForm.controls['email'].setValue('');
    this.formCourses.clear();
  }

  setMessageOptions(options: AppMessage): void {
    this.messageOptions = options;
  }
}
