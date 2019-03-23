package be.gim.hackathon.ejb.service.api;

import be.gim.hackathon.ejb.model.Proposal;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Local
public interface ProposalService {
  Optional<Proposal> findById(Integer id);

  Proposal create(Proposal toCreate);

  List<Proposal> findAllProposals();

  Proposal vote(Integer proposalId, boolean vote);
}
