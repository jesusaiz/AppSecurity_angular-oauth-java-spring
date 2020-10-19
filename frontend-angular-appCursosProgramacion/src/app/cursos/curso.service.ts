
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndpoint: string = 'http://localhost:8080/api/cursos';

  

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }
             
  
  private isNotAuth(e): boolean{
    if(e.status == 401){
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
      
    }
    if (e.status == 403) {
     Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/cursos']);
      return true;
    }
    return false;

  }

/**METODOS**/

getCursos(): Observable<Curso[]>{
  return this.http.get(this.urlEndpoint).pipe(
   map(response => response as Curso[]),
   catchError(e => {
     if(this.isNotAuth(e)){
       return throwError(e);
     } 
     if(e.status == 400){
      return throwError(e);
     }
     console.error(e.error.message);
     Swal.fire('Error al editar', e.error.message, 'error');
     return throwError(e);
   })    
  );
}

getCurso(id: number): Observable<Curso>{
  return this.http.get<Curso>(`${this.urlEndpoint}/${id}`)
  .pipe(
    catchError(e =>{
      if(this.isNotAuth(e)){
        return throwError(e);
      } 
      this.router.navigate(['/cursos'])
      console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
    })
  )
  }


create(curso: Curso): Observable<Curso>{
  return this.http.post<Curso>(this.urlEndpoint, curso)
  .pipe(
   map((response: any) => response.curso as Curso),
   catchError(e =>{
    if(this.isNotAuth(e)){
      return throwError(e);
    } 
    if(e.status == 400){
     return throwError(e);
    }
    this.router.navigate(['/cursos']);
    console.error(e.error.message);
    Swal.fire('Error al editar', e.error.message, 'error');
    return throwError(e);
  })    
 );
}


update(curso: Curso): Observable<Curso>{
  return this.http.put<Curso>(`${this.urlEndpoint}/${curso.id}`, curso)
  .pipe(
    catchError(e => {
    if(this.isNotAuth(e)){
      return throwError(e);
    } 
    if(e.status == 400){
     return throwError(e);
    }
    this.router.navigate(['/cursos']);
    console.error(e.error.message);
    Swal.fire('Error al editar', e.error.message, 'error');
    return throwError(e);
  })    
 );
}

delete(id: number): Observable<Curso>{
  return this.http.delete<Curso>(`${this.urlEndpoint}/${id}`)
  .pipe(
    catchError(e => {
      if(this.isNotAuth(e)){
        return throwError(e);
      } 
      if(e.status == 400){
       return throwError(e);
      }
      console.error(e.error.message);
      Swal.fire('Error al editar', e.error.message, 'error');
      return throwError(e);
    })    
   );
}

}
