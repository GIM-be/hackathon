package be.gim.hackathon.ejb.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Entity
@Table(name = "test")
public class Test {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "test_seq")
  @SequenceGenerator(name = "test_seq", sequenceName = "test_id_seq", allocationSize = 1)
  private Long id;
  @Basic
  @Column(name = "description")
  private String description;

  public Long getId() {
    return id;
  }

  public Test setId(Long id) {
    this.id = id;
    return this;
  }

  public String getDescription() {
    return description;
  }

  public Test setDescription(String description) {
    this.description = description;
    return this;
  }
}
