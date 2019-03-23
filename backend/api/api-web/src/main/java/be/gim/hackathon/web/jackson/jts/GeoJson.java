package be.gim.hackathon.web.jackson.jts;

/**
 * GeoJSON is a format for encoding a variety of geographic data structures.
 * This class holds a collection of static geospatial keywords for use with GeoJSON.
 */
public final class GeoJson {

  private GeoJson() {
  }

  public static final String POINT = "Point";
  public static final String LINE_STRING = "LineString";
  public static final String POLYGON = "Polygon";

  public static final String MULTI_POINT = "MultiPoint";
  public static final String MULTI_LINE_STRING = "MultiLineString";
  public static final String MULTI_POLYGON = "MultiPolygon";

  public static final String GEOMETRY_COLLECTION = "GeometryCollection";

  public static final String TYPE = "type";

  public static final String GEOMETRIES = "geometries";

  public static final String COORDINATES = "coordinates";

  public static final String CRS = "crs";

  public static final String PROPERTIES = "properties";

  public static final String NAME = "name";

  public static final String BBOX = "bbox";
}
