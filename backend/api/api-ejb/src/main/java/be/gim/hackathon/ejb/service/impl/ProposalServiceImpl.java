package be.gim.hackathon.ejb.service.impl;

import be.gim.hackathon.ejb.dao.api.ProposalDao;
import be.gim.hackathon.ejb.model.Proposal;
import be.gim.hackathon.ejb.service.api.ProposalService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Stateless
public class ProposalServiceImpl implements ProposalService {

  @EJB
  private ProposalDao proposalDao;

  @Override
  public Optional<Proposal> findById(Integer id) {
    return proposalDao.findById(id);
  }

  @Override
  public Proposal create(Proposal toCreate) {
    return proposalDao.insertOrUpdate(toCreate);
  }

  @Override
  public List<Proposal> findAllProposals() {
    return proposalDao.findAll();
  }

}
