package be.gim.hackathon.ejb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Entity
@Table(name = "notification_zone")
public class NotificationZone implements WithGeometry {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_zone_seq")
  @SequenceGenerator(name = "notification_zone_seq", sequenceName = "notification_zone_id_seq", allocationSize = 1)
  private Integer id;
  @Column(name = "geometry", columnDefinition = "geometry(Polygon, 3857)")
  private Geometry geometry;
  @Basic
  @Column(name = "name")
  private String name;
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "id_user")
  private User user;

  public Integer getId() {
    return id;
  }

  public NotificationZone setId(Integer id) {
    this.id = id;
    return this;
  }

  @JsonIgnore
  public Geometry getGeometry() {
    return geometry;
  }

  @JsonIgnore
  public void setGeometry(Geometry geometry) {
    this.geometry = geometry;
  }

  public String getName() {
    return name;
  }

  public NotificationZone setName(String name) {
    this.name = name;
    return this;
  }

  @JsonIgnore
  public User getUser() {
    return user;
  }

  @JsonIgnore
  public NotificationZone setUser(User user) {
    this.user = user;
    return this;
  }
}
