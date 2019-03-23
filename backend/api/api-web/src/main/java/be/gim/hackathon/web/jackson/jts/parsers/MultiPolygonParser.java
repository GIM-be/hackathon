package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Polygon;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;

/**
 * GeoJSON parser for type MultiPolygon.
 */
public class MultiPolygonParser extends BaseParser implements GeometryParser<MultiPolygon> {

  private PolygonParser helperParser;

  /**
   * Constructs a new MultiPolygonParser.
   *
   * @param geometryFactory the geometry factory
   */
  public MultiPolygonParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
    helperParser = new PolygonParser(geometryFactory);
  }

  /**
   * Parse the MultiPolygon from the JSON node.
   *
   * @param root the JSON node
   * @return the MultiPolygon
   */
  public MultiPolygon multiPolygonFromJson(JsonNode root) {
    JsonNode arrayOfPolygons = root.get(COORDINATES);
    return geometryFactory.createMultiPolygon(polygonsFromJson(arrayOfPolygons));
  }

  private Polygon[] polygonsFromJson(JsonNode arrayOfPolygons) {
    Polygon[] polygons = new Polygon[arrayOfPolygons.size()];
    for (int i = 0; i != arrayOfPolygons.size(); ++i) {
      polygons[i] = helperParser.polygonFromJsonArrayOfRings(arrayOfPolygons.get(i));
    }
    return polygons;
  }

  @Override
  public MultiPolygon geometryFromJson(JsonNode node) throws JsonMappingException {
    return multiPolygonFromJson(node);
  }
}
