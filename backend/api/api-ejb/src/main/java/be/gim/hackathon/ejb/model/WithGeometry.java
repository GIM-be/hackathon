package be.gim.hackathon.ejb.model;

import be.gim.hackathon.ejb.utils.GeometryUtils;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
public interface WithGeometry {
  Geometry getGeometry();

  void setGeometry(Geometry geometry);

  @JsonProperty("geometry")
  default String getGeometryWkt() {
    return GeometryUtils.WKT_WRITER.write(this.getGeometry());
  }

  @JsonProperty("geometry")
  default void setGeometryWkt(String wkt) {
    try {
      setGeometry(GeometryUtils.WKT_READER.read(wkt));
    } catch (ParseException e) {
      String message = "Could not read wkt";
      throw new RuntimeException(message, e);
    }

  }
}
