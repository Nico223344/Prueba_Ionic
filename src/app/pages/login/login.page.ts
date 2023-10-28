import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, AnimationController, IonCard, IonCardContent } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //@ViewChild("cardElement", { static: true }) cardElement: ElementRef;

  formularioLogin: FormGroup;


  constructor(public fb: FormBuilder,
    public alertController: AlertController,private router: Router, private animationCtrl: AnimationController) { 

    this.formularioLogin = this.fb.group({
      'Usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });

  }

  ngOnInit() {
  }
  //Logica que valida los datos registardos en el page de "registro" y te dirigue al home cuanto estas son validadas
  async ingresar() {
    if (this.formularioLogin.valid) {
      const usuarioString = localStorage.getItem('usuario');
      const f = this.formularioLogin.value;

      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        if (usuario.Usuario === f.Usuario && usuario.password === f.password) {
          // Inicio de sesión exitoso, redirige a la página de inicio (home)
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Datos incorrectos', 'Los datos que ingresaste son incorrectos.');
        }
      } else {
        this.mostrarAlerta('Usuario no registrado', 'No existe un usuario registrado.');
      }
    } else {
      this.mostrarAlerta('Campos incompletos', 'Por favor, complete todos los campos.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  
}
