import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  {path : '' , redirectTo : "login" , pathMatch : "full"},
  {path : 'login' , component : LoginComponent},
  
  {path : 'home' , component : HomepageComponent},
  {path : 'archive' , component : ArchiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
