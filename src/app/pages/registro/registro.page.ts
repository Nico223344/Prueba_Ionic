import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController, private router: Router,  private toastController: ToastController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      'Usuario': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      'password': new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  ngOnInit() {
  }
  //mensaje de exito
  async mostrarMensajeRegistroExitoso() {
    const toast = await this.toastController.create({
      message: '¡Registro exitoso!',
      duration: 2000, 
      position: 'bottom', 
      color: 'success' 
    });
  
    await toast.present();
  }
  //guardar los datos del formulario 
  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos, y asegurarte de que el usuario no supere los 8 digitos y el contraseña los 4 digitos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
    var f = this.formularioRegistro.value;
    var usuario = {
      nombre:f.nombre,
      Usuario: f.Usuario,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.mostrarMensajeRegistroExitoso();
    this.router.navigate(['/login']);
    
  }

}
