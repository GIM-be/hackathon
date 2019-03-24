import { Component, OnInit } from '@angular/core';
import {InteractionService} from '../services/interaction.service';
import {Proposition} from '../classes/proposition';
import {DataService} from '../services/data.service';
import {QrcodeService} from '../services/qrcode.service';

@Component({
  selector: 'app-proposal-modal',
  templateUrl: './proposal-modal.component.html',
  styleUrls: ['./proposal-modal.component.less']
})
export class ProposalModalComponent implements OnInit {
  proposal: Proposition;

  constructor(private interactionService: InteractionService, private dataService: DataService, private qrCodeService: QrcodeService) { }

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

  upvote() {
    this.dataService.upvote(this.proposal).subscribe(proposal => {
      this.proposal.positiveCount = proposal.positiveCount;
    });
  }

  downvote() {
    this.dataService.downvote(this.proposal).subscribe(proposal => {
      this.proposal.negativeCount = proposal.negativeCount;
    });
  }

  getQrCode() {
    return this.qrCodeService.generateQRCodeURL('http://localhost:4200?proposal=' + this.proposal.id);
  }
}
