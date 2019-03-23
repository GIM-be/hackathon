package be.gim.hackathon.ejb.service.api;

import be.gim.hackathon.ejb.model.User;

import java.util.Optional;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
public interface UserService {

  Optional<User> findById(Integer id);

  User createUser(User user);
}
