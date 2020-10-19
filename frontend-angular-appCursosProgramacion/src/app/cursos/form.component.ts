import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

public curso: Curso = new Curso();


  constructor(private cursoService: CursoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.cursoService.getCurso(id).subscribe( (curso) => this.curso = curso)
      }
    })
  }




  create(): void {
    this.cursoService.create(this.curso).subscribe(data =>{
      this.router.navigate(["/cursos"])
      Swal.fire('Curso Nuevo Creado', `Curso ${data.nombre} creado con éxito!`, 'success')
      },
        err => {
          if (err.status == 400 || err.status == 401) {
            Swal.fire('Error Al Crear Curso', 'Vuelva a intentarlo! ' + err.status, 'error');
          }
      }
    );
  }


  update(): void{
    this.cursoService.update(this.curso).subscribe(() =>{
      this.router.navigate(['/cursos']);
      Swal.fire('Curso Actualizado', `${this.curso.nombre} actualizado con éxito!`, 'success')
    },
    err => {
      if (err.status == 400 || err.status == 401) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    
    }
  );
  }



}
