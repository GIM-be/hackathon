import { Injectable } from '@angular/core';
import * as qrcode from 'qrcode-generator';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  constructor() {
  }

  generateQRCodeURL(URL: string): string {
    var qr = qrcode(4, 'L');
    qr.addData(URL);
    qr.make();
    return qr.createDataURL(10, 5);
  }
}
