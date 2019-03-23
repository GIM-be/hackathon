import { Component, OnInit } from '@angular/core';
import {InteractionService} from '../services/interaction.service';

@Component({
  selector: 'app-confirm-panel',
  templateUrl: './confirm-panel.component.html',
  styleUrls: ['./confirm-panel.component.less']
})
export class ConfirmPanelComponent implements OnInit {

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
  }

  shouldCheckConfirm() {
    return this.interactionService.confirmBeformAction;
  }

  confirm() {
    this.interactionService.confirmBeformAction.ok();
  }

  cancel() {
    this.interactionService.confirmBeformAction.cancel();
  }
}
