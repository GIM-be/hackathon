import { Component, OnInit } from '@angular/core';
import {$} from 'protractor';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  footerAnimate;

  constructor() { }

  ngOnInit() {
  }

  // startFooterAnimation() {
  //   if (!this.footerAnimate) {
  //     const triplets = $("#gim-loader").find("div.triplet").toArray();
  //     const nb = triplets.length;
  //     let upIdx = 0;
  //     let downIdx = 10;
  //     this.footerAnimate = setInterval(function(){
  //       $(triplets[upIdx++]).animate({'top':'-15px'}, 20);
  //       if (upIdx >= nb) upIdx = 0;
  //
  //       $(triplets[downIdx++]).animate({'top':'0'}, 20);
  //       if (downIdx >= nb) downIdx = 0;
  //     }, 100);
  //   }
  // }
  //
  // stopFooterAnimation() {
  //   const triplets = $("#gim-loader").find("div.triplet").toArray();
  //   window.clearInterval(this.footerAnimate);
  //   this.footerAnimate = null;
  //   for(let i=0; i<triplets.length; i++) {
  //     $(triplets[i]).animate({'top':'0'}, 20);
  //   }
  // }

}
