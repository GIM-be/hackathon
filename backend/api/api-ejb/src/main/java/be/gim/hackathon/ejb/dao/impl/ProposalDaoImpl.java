package be.gim.hackathon.ejb.dao.impl;

import be.gim.hackathon.ejb.dao.api.ProposalDao;
import be.gim.hackathon.ejb.model.Proposal;
import be.gim.hackathon.ejb.utils.GeometryUtils;
import org.hibernate.Session;

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

  @Override
  public boolean isInRelevantArea(Proposal proposal) {
    return getSession().createNativeQuery("select count(*) from isochrone i where st_contains(i.geom, ST_GEOMFROMTEXT(:parcelGeom, 3857))")
      .setParameter("parcelGeom", GeometryUtils.WKT_WRITER.write(proposal.getGeometry()))
      .getFirstResult() > 1;
  }

  private Session getSession() {
    return entityManager.unwrap(Session.class);
  }
}
