package be.gim.hackathon.ejb.service.impl;

import be.gim.hackathon.ejb.model.Test;
import be.gim.hackathon.ejb.service.api.TestService;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Stateless
public class TestServiceImpl implements TestService {

  @PersistenceContext(unitName = "hackathon")
  private EntityManager entityManager;

  @Override
  public Test hello() {
    Test test = new Test();
    test.setDescription("hello");
    return entityManager.merge(test);
  }
}
