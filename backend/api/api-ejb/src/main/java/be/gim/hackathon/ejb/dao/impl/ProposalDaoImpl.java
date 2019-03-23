package be.gim.hackathon.ejb.dao.impl;

import be.gim.hackathon.ejb.dao.api.ProposalDao;
import be.gim.hackathon.ejb.model.Proposal;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
  public Optional findById(Integer id) {
    return entityManager.createNamedQuery(Proposal.FIND_BY_ID_QUERY_NAME)
      .setParameter(Proposal.ID_FIELD_NAME, id)
      .getResultList()
      .stream()
      .findFirst();
  }

  @Override
  public Proposal insertOrUpdate(Proposal toInsert) {
    return entityManager.merge(toInsert);
  }
}
