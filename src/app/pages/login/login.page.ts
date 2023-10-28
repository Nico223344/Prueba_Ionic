import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, 
    private router: Router, 
    public storage: Storage, 
    private authService: AuthService) { }

  user: string = ""
  pass: string = "";
  
  async ngOnInit() {
    await this.storage.create
  }
  //Logica que valida los datos registardos en el page de "registro" y te dirigue al home cuanto estas son validadas
  inicioSesion() {
    this.authService.login(this.user, this.pass).then(loginExitoso => {
      if (this.user.length > 0 && this.pass.length > 0) {
        if(loginExitoso){
          this.router.navigateByUrl('scan');
        } else {
          this.alertFunc('Error', 'El Usuario y/o la Contraseña ingresados son incorrectos');
        }
      }else{
        this.alertFunc('Ingrese Usuario y/o Contraseña', 'Porfavor ingrese los datos correspondientes');
      }
    })

    this.storage.get('usuario').then(userGuardado => {
      if (this.user.length > 0 && this.pass.length > 0) {
        if (this.user === userGuardado.user && this.pass === userGuardado.pass) {
          this.router.navigateByUrl('scan');
        } else {
          this.alertFunc('Error', 'El Usuario y/o la Contraseña ingresados son incorrectos');
        }
      } else {
        this.alertFunc('Ingrese Usuario y/o Contraseña', 'Porfavor ingrese los datos correspondientes');
      };
    });
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
