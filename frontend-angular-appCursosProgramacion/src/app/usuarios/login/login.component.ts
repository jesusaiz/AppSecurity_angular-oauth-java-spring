import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario : Usuario;
  titulo : string = "Identifíquese";
  
  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire({
        imageUrl: '../assets/images/login_erron.png',
        title: 'Error Login',
        text: 'Usuario y password incorrectos!',
        imageHeight: 50,
        background: '#c5c5c5',
      })
      return;
    }
    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/cursos']);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400 || err.status == 401) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }
  
    
      

    

    
      
    

  }
