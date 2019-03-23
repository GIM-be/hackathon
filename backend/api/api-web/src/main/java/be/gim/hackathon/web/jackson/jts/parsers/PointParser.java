package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GeoJSON parser for type Point.
 */
public class PointParser extends BaseParser implements GeometryParser<Point> {

  /**
   * Constructs a new PointParser.
   *
   * @param geometryFactory the geometry factory
   */
  public PointParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
  }

  /**
   * Parse the Coordinate from a JSON node array.
   *
   * @param array the JSON node array
   * @return the Coordinate
   */
  public static Coordinate coordinateFromJson(JsonNode array) {
    assert array.isArray() && (array.size() == 2
      || array.size() == 3) : "expecting coordinate array with single point [ x, y, |z| ]";

    if (array.size() == 2) {
      return new Coordinate(array.get(0).asDouble(), array.get(1).asDouble());
    }

    return new Coordinate(array.get(0).asDouble(), array.get(1).asDouble(), array.get(2).asDouble());
  }

  /**
   * Parse Coordinate array from a JSON node array.
   *
   * @param array the JSON ode array
   * @return the Coordinate array
   */
  public static Coordinate[] coordinatesFromJson(JsonNode array) {
    Coordinate[] points = new Coordinate[array.size()];
    for (int i = 0; i != array.size(); ++i) {
      points[i] = PointParser.coordinateFromJson(array.get(i));
    }
    return points;
  }

  /**
   * Parse the Point from a JSON node.
   *
   * @param node the JSON node
   * @return the Point
   */
  public Point pointFromJson(JsonNode node) {
    return geometryFactory.createPoint(coordinateFromJson(node.get(COORDINATES)));
  }

  @Override
  public Point geometryFromJson(JsonNode node) throws JsonMappingException {
    return pointFromJson(node);
  }
}
