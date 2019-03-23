import {Component, OnInit} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
  }

  getFormDataToTreat() {
    return this.formDataService.formDataToTreat;
  }

  isLeftPanelOpen() {
    return this.getFormDataToTreat() != null;
  }

  // toggleRightPanel() {
  //   this.openLeftPanel = !this.openLeftPanel;
  // }
}
