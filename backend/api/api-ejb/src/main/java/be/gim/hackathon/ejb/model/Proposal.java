package be.gim.hackathon.ejb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Entity
@Table(name = "proposal")
@NamedQuery(name = Proposal.FIND_BY_ID_QUERY_NAME, query = "SELECT p FROM Proposal p WHERE p." + Proposal.ID_FIELD_NAME + " = :id ")
public class Proposal {

  public static final String FIND_BY_ID_QUERY_NAME = "findById";
  public static final String ID_FIELD_NAME = "id";
  @Id
  @Column(name = ID_FIELD_NAME)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proposal_seq")
  @SequenceGenerator(name = "proposal_seq", sequenceName = "proposal_" + ID_FIELD_NAME + "_seq", allocationSize = 1)
  private Integer id;
  @Column(name = "geometry")
  private String geometry;
  @Column(name = "name")
  private String name;
  @Column(name = "description")
  private String description;

  public Integer getId() {
    return id;
  }

  public Proposal setId(Integer id) {
    this.id = id;
    return this;
  }

  public String getName() {
    return name;
  }

  public Proposal setName(String name) {
    this.name = name;
    return this;
  }

  public String getDescription() {
    return description;
  }

  public Proposal setDescription(String description) {
    this.description = description;
    return this;
  }

  public String getGeometry() {
    return geometry;
  }

  public Proposal setGeometry(String geometry) {
    this.geometry = geometry;
    return this;
  }
}
