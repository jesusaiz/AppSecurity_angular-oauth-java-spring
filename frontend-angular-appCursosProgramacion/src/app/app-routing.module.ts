import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { FormComponent } from './cursos/form.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { LoginComponent } from './usuarios/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/form', component: FormComponent, canActivate : [AuthGuard, RoleGuard], data : {role: 'ROLE_ADMIN'}},
  { path: 'cursos/form/:id', component: FormComponent, canActivate : [AuthGuard, RoleGuard], data : {role: 'ROLE_ADMIN'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
