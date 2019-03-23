import {Component, OnInit} from '@angular/core';
import {FormDataService} from '../../services/form-data.service';
import {Proposition} from '../../classes/proposition';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  TABS = {
    LOGIN: 1,
    FORM: 2
  };

  formDataToTreat: Proposition = new Proposition(null, null, null, null);
  openedTab = null;

  constructor(private formDataService: FormDataService, private loginService: LoginService) { }

  ngOnInit() {}

  isLeftPanelOpen() {
    if (this.formDataService.getFormDataToTreat().feature !== null) {
      this.formDataToTreat = this.formDataService.getFormDataToTreat();
      this.openedTab = this.TABS.FORM;
      return true;
    }
    if (this.loginService.getDoConnect()) {
      this.openedTab = this.TABS.LOGIN;
      return true;
    }
    this.openedTab = null;
    return false;
  }
}
