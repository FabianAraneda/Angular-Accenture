import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    loadChildren: () =>
    import('./login/login.module').then( m => m.LoginModule )
  },
  { path: 'tareas', component: TasksComponent, canActivate: [AuthGuard] ,
    loadChildren: () =>
    import('./tasks/tasks.module').then( m => m.TasksModule )
  },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule { }
