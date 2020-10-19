import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { CursosComponent } from './cursos/cursos.component';
import { FormComponent } from './cursos/form.component';
import { CursoService } from './cursos/curso.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptor } from './usuarios/interceptor/token.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CursosComponent,
    FormComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
   
  ],
  providers: [CursoService,
            { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
