import { Component, OnInit } from '@angular/core';
import {InteractionService} from '../services/interaction.service';
import {Proposition} from '../classes/proposition';

@Component({
  selector: 'app-proposal-modal',
  templateUrl: './proposal-modal.component.html',
  styleUrls: ['./proposal-modal.component.less']
})
export class ProposalModalComponent implements OnInit {
  proposal: Proposition;

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
  }
  showProposalModal() {
    if (this.interactionService.showProposalModal().value) {
      this.proposal = this.interactionService.getSelectedProposal();
      return true;
    }
    return false;
  }

  deselectProposal() {
    this.interactionService.deselectProposal();
  }
}
