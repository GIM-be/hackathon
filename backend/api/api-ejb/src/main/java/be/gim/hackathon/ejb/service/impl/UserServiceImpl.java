package be.gim.hackathon.ejb.service.impl;

import be.gim.hackathon.ejb.dao.api.UserDao;
import be.gim.hackathon.ejb.model.NotificationZone;
import be.gim.hackathon.ejb.model.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.Optional;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Stateless
public class UserServiceImpl implements be.gim.hackathon.ejb.service.api.UserService {

  @EJB
  private UserDao userDao;

  @Override
  public Optional<User> findById(Integer id) {
    return userDao.findById(id);
  }

  @Override
  public User createUser(User user) {
    NotificationZone notificationZone = new NotificationZone();
    notificationZone.setName("notificationZone name");
    notificationZone.setGeometryWkt("POLYGON ((184051.17 128704.2,184171.66 128704.2,184171.66 128741.31,184051.17 128741.31,184051.17 128704.2))");
    user.addNotificationZone(notificationZone);
    return userDao.insertOrUpdate(user);
  }

  @Override
  public Optional<User> addNotificationZone(Integer id, NotificationZone notificationZone) {
    Optional<User> userOpt = userDao.findById(id);
    if (userOpt.isPresent()) {
      User user = userOpt.get();
      user.addNotificationZone(notificationZone);
      return Optional.ofNullable(userDao.insertOrUpdate(user));
    }
    return Optional.empty();
  }
}
