import { Routes } from '@angular/router';
import { StudentAddComponent } from '../pages/Students/StudentAdd/StudentAdd.component';
import { StudentEditComponent } from '../pages/Students/StudentEdit/StudentEdit.component';
import { StudentOverviewComponent } from '../pages/Students/StudentOverview/StudentOverview.component';

export const routes: Routes = [
  { path: '', component: StudentOverviewComponent },
  { path: 'add', component: StudentAddComponent },
  { path: 'edit/:id', component: StudentEditComponent },
  // { path: "**", component: PageNotFoundComponent }
];
