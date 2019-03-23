package be.gim.hackathon.web.jackson.wfs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * Representation of a FeatureCollection.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FeatureCollection {
  private String type;
  private Integer totalFeatures;
  private List<Feature> features;
  private List<Integer> bbox;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Integer getTotalFeatures() {
    return totalFeatures;
  }

  public void setTotalFeatures(Integer totalFeatures) {
    this.totalFeatures = totalFeatures;
  }

  public List<Feature> getFeatures() {
    return features;
  }

  public void setFeatures(List<Feature> features) {
    this.features = features;
  }

  public List<Integer> getBbox() {
    return bbox;
  }

  public void setBbox(List<Integer> bbox) {
    this.bbox = bbox;
  }
}
