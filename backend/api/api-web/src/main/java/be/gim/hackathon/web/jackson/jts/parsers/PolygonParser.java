package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LinearRing;
import com.vividsolutions.jts.geom.Polygon;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GEOSJON parser for type Polygon.
 */
public class PolygonParser extends BaseParser implements GeometryParser<Polygon> {

  /**
   * Constructs a new PolygonParser.
   *
   * @param geometryFactory the geometry factory
   */
  public PolygonParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
  }

  /**
   * Parse the Polygon from a JSON node.
   *
   * @param node the JSON node
   * @return the Polygon
   */
  public Polygon polygonFromJson(JsonNode node) {
    JsonNode arrayOfRings = node.get(COORDINATES);
    return polygonFromJsonArrayOfRings(arrayOfRings);
  }

  /**
   * Parse the Polygon from a JSON array of rings.
   *
   * @param arrayOfRings the JSON array of rings
   * @return the Polygon
   */
  public Polygon polygonFromJsonArrayOfRings(JsonNode arrayOfRings) {
    LinearRing shell = linearRingsFromJson(arrayOfRings.get(0));
    int size = arrayOfRings.size();
    LinearRing[] holes = new LinearRing[size - 1];
    for (int i = 1; i < size; i++) {
      holes[i - 1] = linearRingsFromJson(arrayOfRings.get(i));
    }
    return geometryFactory.createPolygon(shell, holes);
  }

  private LinearRing linearRingsFromJson(JsonNode coordinates) {
    assert coordinates.isArray() : "expected coordinates array";
    return geometryFactory.createLinearRing(PointParser.coordinatesFromJson(coordinates));
  }

  @Override
  public Polygon geometryFromJson(JsonNode node) throws JsonMappingException {
    return polygonFromJson(node);
  }
}
