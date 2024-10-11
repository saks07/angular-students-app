import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StudentService } from '../../../app/student.service';
import { CoursesService } from '../../../app/courses.service';
import {
  Student,
  StudentPagination,
  StudentTableHeading,
} from '../../../interfaces/student.interface';
import { AppPaginationComponent } from '../../../components/App/Pagination/AppPagination.component';
import { StudentTableHeadingComponent } from '../../../components/StudentComponents/Table/Heading/Heading.component';
import { StudentTableRowComponent } from '../../../components/StudentComponents/Table/Row/Row.component';
import { Course } from '../../../interfaces/course.interface';
import { AppButtonComponent } from '../../../components/App/Button/AppButton.component';
import {
  AppButton,
  AppMessage,
  AppMessageActions,
  AppMessageType,
} from '../../../interfaces/app.interface';
import { AppMessageComponent } from '../../../components/App/Message/AppMessage.component';

@Component({
  selector: 'student-overview',
  standalone: true,
  imports: [
    RouterOutlet,
    AppPaginationComponent,
    StudentTableHeadingComponent,
    StudentTableRowComponent,
    RouterLink,
    AppButtonComponent,
    AppMessageComponent,
  ],
  templateUrl: './StudentOverview.component.html',
  styleUrl: './StudentOverview.component.css',
  providers: [StudentService, CoursesService],
})
export class StudentOverviewComponent {
  // Component state
  courses: Course[] = [];
  students: Student[] = [];
  pagination: StudentPagination | null = null;
  pageLimit: number = 0;
  headingCols: StudentTableHeading;
  deleteStudentId: string = '';

  constructor(
    private studentService: StudentService,
    private courseService: CoursesService,
    private router: Router
  ) {
    this.pageLimit = this.studentService.pageLimit;
    this.headingCols = this.studentService.buildTableHeading();
  }

  @ViewChild('messageDialog', { static: false })
  messageDialogEl: ElementRef | null = null;

  buttonOptions: AppButton = {
    buttonType: 'button',
    buttonText: 'Add new student',
    buttonClasses: [],
  };
  appMessageOptions: AppMessage = {
    messageType: 'info',
    messageText: '',
  };

  async ngOnInit(): Promise<void> {
    await this.getCoursesData();
    await this.getStudentsData();
  }

  async getCoursesData(): Promise<void> {
    const result = await this.courseService.getCourses();
    this.courses = result;
  }

  async getStudentsData(): Promise<void> {
    const result = await this.studentService.getStudents();
    this.students = result.data;
    this.pagination = result.pagination;
  }

  async handlePageClick(pageNum: number | null): Promise<void> {
    if (!pageNum) {
      return;
    }

    const query = pageNum > 1 ? { page: pageNum } : {};
    await this.router.navigate([''], { queryParams: { ...query } });
    this.getStudentsData();
  }

  async handleDeleteStudentEvent(id: string): Promise<void> {
    this.deleteStudentId = id;
    this.setAppMessageOptions(
      'warning',
      'Please confirm student delete',
      'YesNo'
    );
    this.messageDialogEl?.nativeElement.showModal();
  }

  handleAddStudentClick(event: Event): void {
    this.router.navigate(['/add']);
  }

  async handleDialogMessageClickEvent(event: Event): Promise<void> {
    const dataAction = (event.target as HTMLButtonElement)?.dataset['action'];
    if (!dataAction) {
      return;
    }

    switch (dataAction) {
      case 'no':
      case 'close':
        this.deleteStudentId = '';
        break;
      case 'yes':
        await this.studentService.deleteStudent(this.deleteStudentId);
        this.getStudentsData();
        break;
    }

    this.messageDialogEl?.nativeElement.close();
  }

  setAppMessageOptions(
    type: AppMessageType,
    text: string,
    action?: AppMessageActions
  ): void {
    this.appMessageOptions.messageType = type;
    this.appMessageOptions.messageText = text;
    this.appMessageOptions.messageActions = action;
  }
}
