import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  //nombres: string = '';
  //apellidos: string = '';
  //nivelEducacion: string = 'basico';
  //fechaNacimiento: string = '';
  //mostrarDatosIngresados: boolean = false;
  nombreUsuario: string="";

  constructor(private navCtrl: NavController, private modalController: ModalController, private router: Router) {}

  /*limpiarFormulario() {
    this.nombres = '';
    this.apellidos = '';
    this.nivelEducacion = 'basico';
    this.fechaNacimiento = '';
    this.mostrarDatosIngresados = false;
  }*/

  /*mostrarDatos() {
    this.mostrarDatosIngresados = true;
  }*/
  ionViewWillEnter() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    if (usuario) {
      this.nombreUsuario = usuario.Usuario;
    }
  }
  redirigirAVistaQR() {
    this.router.navigate(['/scan']);
  }
}
