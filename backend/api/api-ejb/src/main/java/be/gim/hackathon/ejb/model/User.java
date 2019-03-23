package be.gim.hackathon.ejb.model;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Entity
@Table(name = "user")
@NamedQueries({
  @NamedQuery(name = User.FIND_USER_BY_ID_QUERY_NAME, query = "SELECT u FROM User u WHERE u.id = :" + User.ID_FIELD_NAME),
  @NamedQuery(name = User.FIND_USER_BY_LOGIN_QUERY_NAME, query = "SELECT u FROM User u WHERE u.login = :" + User.LOGIN_FIELD_NAME)
})
public class User {
  public static final String FIND_USER_BY_ID_QUERY_NAME = "findUserById";
  public static final String FIND_USER_BY_LOGIN_QUERY_NAME = "findLoginById";
  public static final String ID_FIELD_NAME = "id";
  public static final String LOGIN_FIELD_NAME = "login";

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
  @SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 1)
  private Integer id;
  @Basic
  @Column(name = "login")
  private String login;
  @OneToMany(
    cascade = {CascadeType.ALL},
    fetch = FetchType.EAGER,
    mappedBy = "user",
    orphanRemoval = true)
  private List<NotificationZone> notificationZones;


  public Integer getId() {
    return id;
  }

  public User setId(Integer id) {
    this.id = id;
    return this;
  }
  public String getLogin() {
    return login;
  }

  public User setLogin(String login) {
    this.login = login;
    return this;
  }

  public List<NotificationZone> getNotificationZones() {
    if (notificationZones == null) {
      notificationZones = new ArrayList<>();
    }
    return notificationZones;
  }

  public User setNotificationZones(List<NotificationZone> notificationZones) {
    this.notificationZones = notificationZones;
    return this;
  }

  public User addNotificationZone(NotificationZone notificationZone) {
    notificationZone.setUser(this);
    getNotificationZones().add(notificationZone);
    return this;
  }
}
