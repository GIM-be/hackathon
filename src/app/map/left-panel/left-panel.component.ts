import {Component, OnInit} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';
import {Proposition} from '../../classes/proposition';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  formDataToTreat: Proposition = {id: null, geometry: null, name: null, description: null};

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {}

  isLeftPanelOpen() {
    if(this.formDataService.getFormDataToTreat().geometry !== null){
      this.formDataToTreat = this.formDataService.getFormDataToTreat();
      return true;
    }
    return false;
  }

  // toggleRightPanel() {
  //   this.openLeftPanel = !this.openLeftPanel;
  // }
}
