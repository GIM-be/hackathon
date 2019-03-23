import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsivenessServiceService {

  constructor() { }

  isMobileScreen() {
    return window.innerWidth < 768;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.isMobileScreen();
  // }
}
