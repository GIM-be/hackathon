package be.gim.hackathon.ejb.dao.impl;

import be.gim.hackathon.ejb.dao.api.ProposalDao;
import be.gim.hackathon.ejb.model.Proposal;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Stateless
public class ProposalDaoImpl implements ProposalDao {

  @PersistenceContext(unitName = "hackathon")
  private EntityManager entityManager;

  @Override
  public Optional<Proposal> findById(Integer id) {
    return entityManager.createNamedQuery(Proposal.FIND_PROPOSAL_BY_ID_QUERY_NAME, Proposal.class)
      .setParameter(Proposal.ID_FIELD_NAME, id)
      .getResultList()
      .stream()
      .findFirst();
  }

  @Override
  public Proposal insertOrUpdate(Proposal toInsert) {
    return entityManager.merge(toInsert);
  }

  @Override
  public List<Proposal> findAll() {
    return entityManager.createNamedQuery(Proposal.FIND_ALL_PROPOSALS_QUERY_NAME, Proposal.class)
      .getResultList();
  }
}
