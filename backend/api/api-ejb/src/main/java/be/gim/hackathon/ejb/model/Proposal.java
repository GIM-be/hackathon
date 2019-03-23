package be.gim.hackathon.ejb.model;

import be.gim.hackathon.ejb.utils.GeometryUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.logging.Level;
import java.util.logging.Logger;

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
  private static final Logger LOGGER = Logger.getLogger(Proposal.class.getName());
  @Id
  @Column(name = ID_FIELD_NAME)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proposal_seq")
  @SequenceGenerator(name = "proposal_seq", sequenceName = "proposal_" + ID_FIELD_NAME + "_seq", allocationSize = 1)
  private Integer id;
  @Column(name = "geometry", columnDefinition = "geometry(Polygon, 3857)")
  @JsonIgnore
  private Geometry geometry;
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

  public Geometry getGeometry() {
    return geometry;
  }

  public Proposal setGeometry(Geometry geometry) {
    this.geometry = geometry;
    return this;
  }

  @JsonProperty("geometry")
  public String getGeometryWkt() {
    return GeometryUtils.WKT_WRITER.write(this.getGeometry());
  }

  @JsonProperty("geometry")
  public void setGeometryWkt(String wkt) {
    try {
      setGeometry(GeometryUtils.WKT_READER.read(wkt));
    } catch (ParseException e) {
      String message = "Could not read wkt";
      LOGGER.log(Level.SEVERE, message, e);
      throw new RuntimeException(message, e);
    }

  }

}
