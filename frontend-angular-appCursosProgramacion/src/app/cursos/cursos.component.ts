import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
 

 cursos: Curso[];
 


  constructor(private cursoService: CursoService,
              public authService: AuthService) { }

  ngOnInit(): void {

    this.cursoService.getCursos().pipe(
      tap(cursos => {
        console.log('CursosComponent: tap 3');
        cursos.forEach(curso => {
          console.log(curso.nombre);
        });
      }))
      .subscribe(data => this.cursos = data);
    
  }
 delete(curso: Curso): void {
     Swal.fire({
      title: 'Esta seguro que quiere eliminarlo?',
      text: '¡Si lo elimina no podrá recuperarlo el curso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínelo!',
      confirmButtonColor: '#oaeba5',
      cancelButtonText: 'No'
  }).then(result => {
    if (result.value) {

      this.cursoService.delete(curso.id).subscribe(
        () => {
          this.cursos = this.cursos.filter(cli => cli !== curso)
         Swal.fire(
            'Cliente Eliminado!',
            `Cliente ${curso.nombre} eliminado con éxito.`,
            'success'
          )
        }
      )

    }
  });
}

}
