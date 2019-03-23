package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;

import static be.gim.hackathon.web.jackson.jts.GeoJson.GEOMETRIES;

/**
 * GeoJSON parser for type GeometryCollection.
 */
public class GeometryCollectionParser extends BaseParser implements GeometryParser<GeometryCollection> {

  private GenericGeometryParser genericGeometriesParser;

  /**
   * Constructs a new GeometryCollectionParser.
   *
   * @param geometryFactory         the geometry factory
   * @param genericGeometriesParser the generic geometry parser
   */
  public GeometryCollectionParser(GeometryFactory geometryFactory, GenericGeometryParser genericGeometriesParser) {
    super(geometryFactory);
    this.genericGeometriesParser = genericGeometriesParser;
  }

  private Geometry[] geometriesFromJson(JsonNode arrayOfGeoms) throws JsonMappingException {
    Geometry[] items = new Geometry[arrayOfGeoms.size()];
    for (int i = 0; i != arrayOfGeoms.size(); ++i) {
      items[i] = genericGeometriesParser.geometryFromJson(arrayOfGeoms.get(i));
    }
    return items;
  }

  @Override
  public GeometryCollection geometryFromJson(JsonNode node) throws JsonMappingException {
    return geometryFactory.createGeometryCollection(geometriesFromJson(node.get(GEOMETRIES)));
  }
}
