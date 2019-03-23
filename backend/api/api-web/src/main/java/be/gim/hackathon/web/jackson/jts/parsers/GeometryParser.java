package be.gim.hackathon.web.jackson.jts.parsers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.Geometry;

/**
 * GeoJSON geometry parser interface.
 *
 * @param <T> the generic type parameter
 */
public interface GeometryParser<T extends Geometry> {

  /**
   * Parse a geometry from a JSON node.
   *
   * @param node the JSON node
   * @return the generic type
   * @throws JsonMappingException JsonMappingException
   */
  T geometryFromJson(JsonNode node) throws JsonMappingException;

}
