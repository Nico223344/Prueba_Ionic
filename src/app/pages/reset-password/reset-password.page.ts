import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
})
export class ResetPasswordPage {

  constructor(private alertController: AlertController, private router: Router, public storage: Storage) { }
  user: string = "";
  newpass: string = "";

  ngOnInit() {
    
  }

  reestablecerPass() {
    if (this.user.length > 0 && this.newpass.length > 0) {
      this.storage.get('usuario').then(userGuardado => {
        if (userGuardado.user === this.user) {
          userGuardado.pass = this.newpass;
          this.storage.set('usuario', userGuardado).then(() => {
            this.alertFunc('Éxito', 'La contraseña ha sido reestablecida correctamente');
            this.router.navigateByUrl('login');
          });
        } else {
          this.alertFunc('Error', 'El usuario ingresado no existe');
        }
      });
    } else {
      this.alertFunc('Error', 'Ingrese Usuario y/o Contraseña');
    }
  }

  async alertFunc(headerMsg:string, bodyMsg: string) {
    const alert = await this.alertController.create({
      header: headerMsg,
      message: bodyMsg,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
