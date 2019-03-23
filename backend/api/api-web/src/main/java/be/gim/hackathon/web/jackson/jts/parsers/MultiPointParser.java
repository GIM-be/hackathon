package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPoint;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GeoJSON parser for the MultiPoint.
 */
public class MultiPointParser extends BaseParser implements GeometryParser<MultiPoint> {

  /**
   * Constructs a new MultiPointParser.
   *
   * @param geometryFactory the geometry factory
   */
  public MultiPointParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
  }

  /**
   * Parse the MultiPoint from the JSON node.
   *
   * @param root the JSON node
   * @return the MultiPoint
   */
  public MultiPoint multiPointFromJson(JsonNode root) {
    return geometryFactory.createMultiPoint(PointParser.coordinatesFromJson(root.get(COORDINATES)));
  }

  @Override
  public MultiPoint geometryFromJson(JsonNode node) throws JsonMappingException {
    return multiPointFromJson(node);
  }
}
