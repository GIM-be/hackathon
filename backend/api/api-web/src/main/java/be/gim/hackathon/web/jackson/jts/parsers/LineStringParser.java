package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LineString;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GeoJSON parser for type LineString.
 */
public class LineStringParser extends BaseParser implements GeometryParser<LineString> {

  /**
   * Constructs a new LineStringParser.
   *
   * @param geometryFactory the geometry factory
   */
  public LineStringParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
  }

  /**
   * Parse the LineString from the JSON node.
   *
   * @param root the JSON node
   * @return the LineString
   */
  public LineString lineStringFromJson(JsonNode root) {
    return geometryFactory.createLineString(PointParser.coordinatesFromJson(root.get(COORDINATES)));
  }

  @Override
  public LineString geometryFromJson(JsonNode node) throws JsonMappingException {
    return lineStringFromJson(node);
  }
}
