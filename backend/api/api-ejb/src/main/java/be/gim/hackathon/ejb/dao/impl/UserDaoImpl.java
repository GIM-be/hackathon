package be.gim.hackathon.ejb.dao.impl;

import be.gim.hackathon.ejb.dao.api.UserDao;
import be.gim.hackathon.ejb.model.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Stateless
public class UserDaoImpl implements UserDao {

  @PersistenceContext(unitName = "hackathon")
  private EntityManager entityManager;

  @Override
  public Optional<User> findById(Integer id) {
    return entityManager.createNamedQuery(User.FIND_USER_BY_ID_QUERY_NAME, User.class)
      .setParameter(User.ID_FIELD_NAME, id)
      .getResultList()
      .stream()
      .findFirst();
  }

  @Override
  public User insertOrUpdate(User toInsert) {
    return entityManager.merge(toInsert);
  }

}
