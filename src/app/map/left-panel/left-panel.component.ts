import {Component, OnInit} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';
import {Proposition} from '../../classes/proposition';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  formDataToTreat: Proposition = new Proposition(null, null, null, null);

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {}

  isLeftPanelOpen() {
    if (this.formDataService.getFormDataToTreat().feature !== null) {
      this.formDataToTreat = this.formDataService.getFormDataToTreat();
      return true;
    }
    return false;
  }

  // toggleRightPanel() {
  //   this.openLeftPanel = !this.openLeftPanel;
  // }
}
