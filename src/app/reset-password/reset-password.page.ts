import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
})
export class ResetPasswordPage {
  usuario: any;
  nombreUsuarioBuscado: string = '';

  constructor() {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    this.usuario = usuarioString ? JSON.parse(usuarioString) : null;
  }

  buscarUsuario() {
    const nombreUsuario = this.nombreUsuarioBuscado;

    this.usuario = this.buscarUsuarioPorNombre(nombreUsuario);
  }

  buscarUsuarioPorNombre(nombreUsuario: string): any {
    const usuariosString = localStorage.getItem('usuarios');
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

    return usuarios.find((user: any) => user.Usuario === nombreUsuario);
  }
}

