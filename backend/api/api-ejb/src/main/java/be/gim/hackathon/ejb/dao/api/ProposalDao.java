package be.gim.hackathon.ejb.dao.api;

import be.gim.hackathon.ejb.model.Proposal;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Local
public interface ProposalDao {

  Optional<Proposal> findById(Integer id);

  Proposal insertOrUpdate(Proposal toInsert);

  List<Proposal> findAll();
}
