package be.gim.hackathon.web.jackson.jts.serialization;

import be.gim.hackathon.web.jackson.jts.parsers.GeometryParser;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.vividsolutions.jts.geom.Geometry;

import java.io.IOException;

import static be.gim.hackathon.web.jackson.jts.GeoJson.CRS;
import static be.gim.hackathon.web.jackson.jts.GeoJson.NAME;
import static be.gim.hackathon.web.jackson.jts.GeoJson.PROPERTIES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.TYPE;

/**
 * Generic GeoJSON deserializer for various geometry types.
 *
 * @param <T> the generic type parameter
 */
public class GeometryDeserializer<T extends Geometry> extends JsonDeserializer<T> {

  private GeometryParser<T> geometryParser;

  /**
   * Constructs a new GeometryDeserializer.
   *
   * @param geometryParser the generic geometry parser
   */
  public GeometryDeserializer(GeometryParser<T> geometryParser) {
    this.geometryParser = geometryParser;
  }

  @Override
  public T deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    ObjectCodec oc = jsonParser.getCodec();
    JsonNode root = oc.readTree(jsonParser);
    T result = geometryParser.geometryFromJson(root);
    if (root.has(CRS)) {
      result.setSRID(getCRS(root.get(CRS)));
    }
    return result;
  }

  private int getCRS(JsonNode node) {
    if (node != null && node.get(TYPE).asText().equals(NAME)) {
      JsonNode propertiesNode = node.get(PROPERTIES);
      String srsName = propertiesNode.get(NAME).asText();
      if (srsName.contains("EPSG")) {
        return Integer.parseInt(srsName.replaceAll(".*(?=.*\\D+)\\:", ""));
      }
    }
    return 0;
  }
}
