package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;

import java.util.HashMap;
import java.util.Map;

import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.GEOMETRIES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.GEOMETRY_COLLECTION;
import static be.gim.hackathon.web.jackson.jts.GeoJson.LINE_STRING;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_LINE_STRING;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_POINT;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_POLYGON;
import static be.gim.hackathon.web.jackson.jts.GeoJson.POINT;
import static be.gim.hackathon.web.jackson.jts.GeoJson.POLYGON;
import static be.gim.hackathon.web.jackson.jts.GeoJson.TYPE;


/**
 * Generic GeoJSON geometry parser.
 */
@SuppressWarnings("rawtypes")
public class GenericGeometryParser extends BaseParser implements GeometryParser<Geometry> {

  private Map<String, GeometryParser> parsers;

  /**
   * Constructs a new GenericGeometryParser.
   *
   * @param geometryFactory the geometry factory
   */
  public GenericGeometryParser(GeometryFactory geometryFactory) {
    super(geometryFactory);
    parsers = new HashMap<String, GeometryParser>();
    parsers.put(POINT, new PointParser(geometryFactory));
    parsers.put(MULTI_POINT, new MultiPointParser(geometryFactory));
    parsers.put(LINE_STRING, new LineStringParser(geometryFactory));
    parsers.put(MULTI_LINE_STRING, new MultiLineStringParser(geometryFactory));
    parsers.put(POLYGON, new PolygonParser(geometryFactory));
    parsers.put(MULTI_POLYGON, new MultiPolygonParser(geometryFactory));
    parsers.put(GEOMETRY_COLLECTION, new GeometryCollectionParser(geometryFactory, this));
  }

  @Override
  public Geometry geometryFromJson(JsonNode node) throws JsonMappingException {
    if (node != null && node.has(TYPE) && (node.has(COORDINATES) || node.has(GEOMETRIES))) {
      String typeName = node.get(TYPE).asText();
      GeometryParser parser = parsers.get(typeName);
      if (parser != null) {
        return parser.geometryFromJson(node);
      } else {
        throw new JsonMappingException("Invalid geometry type: " + typeName);
      }
    }
    return null;
  }
}
