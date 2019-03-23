package be.gim.hackathon.ejb.dao.api;

import be.gim.hackathon.ejb.model.User;

import javax.ejb.Local;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Local
public interface UserDao {
  Optional<User> findById(Integer id);

  Optional<User> findByLogin(String login);

  User insertOrUpdate(User toInsert);
}
