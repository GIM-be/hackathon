package be.gim.hackathon.web.jackson.wfs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vividsolutions.jts.geom.Geometry;

import java.util.Map;

/**
 * Representation of a Feature.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Feature {
  private String type;
  private String id;
  private Geometry geometry;
  private Map<String, Object> properties;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Geometry getGeometry() {
    return geometry;
  }

  public void setGeometry(Geometry geometry) {
    this.geometry = geometry;
  }

  public Map<String, Object> getProperties() {
    return properties;
  }

  public void setProperties(Map<String, Object> properties) {
    this.properties = properties;
  }
}
