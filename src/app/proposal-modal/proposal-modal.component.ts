import { Component, OnInit } from '@angular/core';
import {InteractionService} from '../services/interaction.service';
import {Proposition} from '../classes/proposition';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-proposal-modal',
  templateUrl: './proposal-modal.component.html',
  styleUrls: ['./proposal-modal.component.less']
})
export class ProposalModalComponent implements OnInit {
  proposal: Proposition;

  constructor(private interactionService: InteractionService, private dataService: DataService) { }

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

  getPositiveCount(){
    return this.proposal.positiveCount;
  }

  upvote(){
    this.dataService.upvote(this.proposal).subscribe(proposal =>{
      this.proposal.positiveCount = proposal.positiveCount;
    });
  }

  downvote(){
    this.dataService.downvote(this.proposal).subscribe(proposal =>{
      this.proposal.negativeCount = proposal.negativeCount;
    });
  }
}
