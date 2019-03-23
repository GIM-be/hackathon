import { Injectable } from '@angular/core';
import * as qrcode from 'qrcode-generator';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  constructor() {
  }

  generateQRCodeURL(content: string): string {
    var qr = qrcode(4, 'L');
    qr.addData(content);
    qr.make();
    return qr.createDataURL(10, 5);
  }
}
