import {Component, OnInit} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';
import {Proposition} from '../../classes/proposition';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  formDataToTreat: Proposition;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.formDataToTreat = this.formDataService.getFormDataToTreat();
  }

  isLeftPanelOpen() {
    return this.formDataService.getFormDataToTreat().geometry !== null;
  }

  submitProposition() {
    this.formDataService.sendToBackend();
  }

  // toggleRightPanel() {
  //   this.openLeftPanel = !this.openLeftPanel;
  // }
}
