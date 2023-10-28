import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/public_api';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular'; 
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  
  scannerEnabled: boolean = true;
  qrResultString: string = "";
  allowedFormats = [ BarcodeFormat.QR_CODE ];

  constructor(private router: Router, public storage: Storage) { }
  ngOnInit() {
    this.storage.create();
  }

  readFunc(res:string, status:string){
    
    if (status == 'success'){
      this.scannerEnabled = false;
      this.storage.set('qrData', res)
      this.router.navigateByUrl('datosclase');

    } else if (res == 'failure'){
      console.log('error, intente nuevamente')
    }
  }

}
