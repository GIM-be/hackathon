package be.gim.hackathon.web.jackson.jts.serialization;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;

import java.io.IOException;
import java.util.Arrays;

import static be.gim.hackathon.web.jackson.jts.GeoJson.BBOX;
import static be.gim.hackathon.web.jackson.jts.GeoJson.COORDINATES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.CRS;
import static be.gim.hackathon.web.jackson.jts.GeoJson.GEOMETRIES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.GEOMETRY_COLLECTION;
import static be.gim.hackathon.web.jackson.jts.GeoJson.LINE_STRING;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_LINE_STRING;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_POINT;
import static be.gim.hackathon.web.jackson.jts.GeoJson.MULTI_POLYGON;
import static be.gim.hackathon.web.jackson.jts.GeoJson.NAME;
import static be.gim.hackathon.web.jackson.jts.GeoJson.POINT;
import static be.gim.hackathon.web.jackson.jts.GeoJson.POLYGON;
import static be.gim.hackathon.web.jackson.jts.GeoJson.PROPERTIES;
import static be.gim.hackathon.web.jackson.jts.GeoJson.TYPE;

/**
 * GeoJSON serializer for geometry types.
 */
public class GeometrySerializer extends JsonSerializer<Geometry> {

  @Override
  public void serialize(Geometry value, JsonGenerator jgen, SerializerProvider provider) throws IOException {

    writeGeometry(jgen, value);
  }

  @Override
  public Class<Geometry> handledType() {
    return Geometry.class;
  }

  /**
   * Write the geometry in GeoJSON format.
   *
   * @param jgen  the JSON generator
   * @param value the geometry value
   * @throws IOException IOException
   */
  public void writeGeometry(JsonGenerator jgen, Geometry value) throws IOException {
    jgen.writeStartObject();
    writeType(jgen, value.getClass());
    writeCRS(jgen, value.getSRID());
    if (value != null) {
      writeBbox(jgen, value.getEnvelopeInternal());
    }
    if (value instanceof Polygon) {
      writePolygon(jgen, (Polygon) value);
    } else if (value instanceof Point) {
      writePoint(jgen, (Point) value);
    } else if (value instanceof MultiPoint) {
      writeMultiPoint(jgen, (MultiPoint) value);
    } else if (value instanceof MultiPolygon) {
      writeMultiPolygon(jgen, (MultiPolygon) value);
    } else if (value instanceof LineString) {
      writeLineString(jgen, (LineString) value);
    } else if (value instanceof MultiLineString) {
      writeMultiLineString(jgen, (MultiLineString) value);
    } else if (value instanceof GeometryCollection) {
      writeGeometryCollection(jgen, (GeometryCollection) value);
    } else {
      throw new JsonMappingException("Geometry type " + value.getClass().getName()
        + " cannot be serialized as GeoJSON." + "Supported types are: "
        + Arrays.asList(Point.class.getName(), LineString.class.getName(), Polygon.class.getName(),
        MultiPoint.class.getName(), MultiLineString.class.getName(), MultiPolygon.class.getName(),
        GeometryCollection.class.getName()));
    }
    jgen.writeEndObject();
  }

  private void writeType(JsonGenerator jgen, Class<? extends Geometry> clazz) throws IOException {
    if (Polygon.class.equals(clazz)) {
      jgen.writeStringField(TYPE, POLYGON);
    } else if (Point.class.equals(clazz)) {
      jgen.writeStringField(TYPE, POINT);
    } else if (MultiPoint.class.equals(clazz)) {
      jgen.writeStringField(TYPE, MULTI_POINT);
    } else if (MultiPolygon.class.equals(clazz)) {
      jgen.writeStringField(TYPE, MULTI_POLYGON);
    } else if (LineString.class.equals(clazz)) {
      jgen.writeStringField(TYPE, LINE_STRING);
    } else if (MultiLineString.class.equals(clazz)) {
      jgen.writeStringField(TYPE, MULTI_LINE_STRING);
    } else if (GeometryCollection.class.equals(clazz)) {
      jgen.writeStringField(TYPE, GEOMETRY_COLLECTION);
    }
  }

  private void writeCRS(JsonGenerator jgen, Integer SRID) throws JsonGenerationException, IOException {
    writeCRSString(jgen, SRID);
  }

  private void writeBbox(JsonGenerator jgen, Envelope envelope) throws IOException {
    jgen.writeArrayFieldStart(BBOX);
    jgen.writeNumber(envelope.getMinX());
    jgen.writeNumber(envelope.getMinY());
    jgen.writeNumber(envelope.getMaxX());
    jgen.writeNumber(envelope.getMaxY());
    jgen.writeEndArray();
  }

  private void writeGeometryCollection(JsonGenerator jgen, GeometryCollection value) throws IOException {
    jgen.writeArrayFieldStart(GEOMETRIES);

    for (int i = 0; i != value.getNumGeometries(); ++i) {
      writeGeometry(jgen, value.getGeometryN(i));
    }

    jgen.writeEndArray();
  }

  private void writeMultiPoint(JsonGenerator jgen, MultiPoint value) throws IOException {
    jgen.writeArrayFieldStart(COORDINATES);

    for (int i = 0; i != value.getNumGeometries(); ++i) {
      writePointCoords(jgen, (Point) value.getGeometryN(i));
    }

    jgen.writeEndArray();
  }

  private void writeMultiLineString(JsonGenerator jgen, MultiLineString value) throws IOException {
    jgen.writeArrayFieldStart(COORDINATES);

    for (int i = 0; i != value.getNumGeometries(); ++i) {
      writeLineStringCoords(jgen, (LineString) value.getGeometryN(i));
    }

    jgen.writeEndArray();
  }

  private void writeMultiPolygon(JsonGenerator jgen, MultiPolygon value) throws IOException {
    jgen.writeArrayFieldStart(COORDINATES);

    for (int i = 0; i != value.getNumGeometries(); ++i) {
      writePolygonCoordinates(jgen, (Polygon) value.getGeometryN(i));
    }

    jgen.writeEndArray();
  }

  private void writePolygon(JsonGenerator jgen, Polygon value) throws IOException {
    jgen.writeFieldName(COORDINATES);
    writePolygonCoordinates(jgen, value);
  }

  private void writeLineString(JsonGenerator jgen, LineString lineString) throws IOException {
    jgen.writeFieldName(COORDINATES);
    writeLineStringCoords(jgen, lineString);
  }

  private void writePoint(JsonGenerator jgen, Point p) throws IOException {
    jgen.writeFieldName(COORDINATES);
    writePointCoords(jgen, p);
  }

  private void writePolygonCoordinates(JsonGenerator jgen, Polygon value) throws IOException {
    jgen.writeStartArray();
    writeLineStringCoords(jgen, value.getExteriorRing());

    for (int i = 0; i < value.getNumInteriorRing(); ++i) {
      writeLineStringCoords(jgen, value.getInteriorRingN(i));
    }
    jgen.writeEndArray();
  }

  private void writeLineStringCoords(JsonGenerator jgen, LineString ring) throws IOException {
    jgen.writeStartArray();
    for (int i = 0; i != ring.getNumPoints(); ++i) {
      Point p = ring.getPointN(i);
      writePointCoords(jgen, p);
    }
    jgen.writeEndArray();
  }

  private void writePointCoords(JsonGenerator jgen, Point p) throws IOException {
    jgen.writeStartArray();

    jgen.writeNumber(p.getCoordinate().x);
    jgen.writeNumber(p.getCoordinate().y);

    if (!Double.isNaN(p.getCoordinate().z)) {
      jgen.writeNumber(p.getCoordinate().z);
    }
    jgen.writeEndArray();
  }

  private void writeCRSString(JsonGenerator jgen, int srid) throws JsonGenerationException, IOException {
    if (srid > 0) {
      jgen.writeFieldName(CRS);
      jgen.writeStartObject();
      jgen.writeStringField(TYPE, NAME);
      jgen.writeFieldName(PROPERTIES);
      jgen.writeStartObject();
      jgen.writeStringField(NAME, "urn:ogc:def:crs:EPSG::" + srid);
      jgen.writeEndObject();
      jgen.writeEndObject();
    }
  }
}
