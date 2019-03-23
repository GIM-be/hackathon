package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GeoJSON parser for type MultiLineString.
 */
public class MultiLineStringParser extends BaseParser implements GeometryParser<MultiLineString> {

  /**
   * Constructs a new MultiLineStringParser.
   *
   * @param geometryFactory the geometry factory
   */
  public MultiLineStringParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
  }

  /**
   * Parse the MultiLineString from a JSON node.
   *
   * @param root the JSON node
   * @return the MultiLineString
   */
  public MultiLineString multiLineStringFromJson(JsonNode root) {
    return geometryFactory.createMultiLineString(lineStringsFromJson(root.get(COORDINATES)));
  }

  private LineString[] lineStringsFromJson(JsonNode array) {
    LineString[] strings = new LineString[array.size()];
    for (int i = 0; i != array.size(); ++i) {
      strings[i] = geometryFactory.createLineString(PointParser.coordinatesFromJson(array.get(i)));
    }
    return strings;
  }

  @Override
  public MultiLineString geometryFromJson(JsonNode node) throws JsonMappingException {
    return multiLineStringFromJson(node);
  }
}
