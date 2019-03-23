package be.gim.hackathon.ejb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Entity
@Table(name = "proposal")
@NamedQueries({
  @NamedQuery(name = Proposal.FIND_PROPOSAL_BY_ID_QUERY_NAME, query = "SELECT p FROM Proposal p WHERE p." + Proposal.ID_FIELD_NAME + " = :id "),
  @NamedQuery(name = Proposal.FIND_ALL_PROPOSALS_QUERY_NAME, query = "SELECT p FROM Proposal p")
})
public class Proposal implements WithGeometry {

  public static final String FIND_PROPOSAL_BY_ID_QUERY_NAME = "findProposalById";
  public static final String FIND_ALL_PROPOSALS_QUERY_NAME = "findAllProposals";
  public static final String ID_FIELD_NAME = "id";
  @Id
  @Column(name = ID_FIELD_NAME)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proposal_seq")
  @SequenceGenerator(name = "proposal_seq", sequenceName = "proposal_" + ID_FIELD_NAME + "_seq", allocationSize = 1)
  private Integer id;
  @Column(name = "geometry", columnDefinition = "geometry(Polygon, 3857)")
  private Geometry geometry;
  @Column(name = "name")
  private String name;
  @Column(name = "description")
  private String description;
  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private ProposalType type;

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

  @JsonIgnore
  public Geometry getGeometry() {
    return geometry;
  }

  @JsonIgnore
  public void setGeometry(Geometry geometry) {
    this.geometry = geometry;
  }

  public ProposalType getType() {
    return type;
  }

  public Proposal setType(ProposalType type) {
    this.type = type;
    return this;
  }
}
