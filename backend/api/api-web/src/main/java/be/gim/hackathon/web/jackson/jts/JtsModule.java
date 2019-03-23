package be.gim.hackathon.web.jackson.jts;

import be.gim.hackathon.web.jackson.jts.parsers.GenericGeometryParser;
import be.gim.hackathon.web.jackson.jts.parsers.GeometryCollectionParser;
import be.gim.hackathon.web.jackson.jts.parsers.LineStringParser;
import be.gim.hackathon.web.jackson.jts.parsers.MultiLineStringParser;
import be.gim.hackathon.web.jackson.jts.parsers.MultiPointParser;
import be.gim.hackathon.web.jackson.jts.parsers.MultiPolygonParser;
import be.gim.hackathon.web.jackson.jts.parsers.PointParser;
import be.gim.hackathon.web.jackson.jts.parsers.PolygonParser;
import be.gim.hackathon.web.jackson.jts.serialization.GeometryDeserializer;
import be.gim.hackathon.web.jackson.jts.serialization.GeometrySerializer;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;

import java.util.logging.Logger;

/**
 * JtsModule holding serializers and deserializers for various geometry types.
 */
public class JtsModule extends SimpleModule {

  private static final long serialVersionUID = 4024847633016645747L;
  private static final Logger LOGGER = Logger.getLogger(JtsModule.class.getName());

  /**
   * Constructs a new JtsModule.
   */
  public JtsModule() {
    this(new GeometryFactory());
  }

  /**
   * Constructs a new JtsModule.
   *
   * @param geometryFactory the geometry factory
   */
  public JtsModule(GeometryFactory geometryFactory) {
    super("JtsModule", new Version(1, 1, 0, null, "be.gim", "jackson-datatype-jts-extended"));
    LOGGER.severe("Creating JTS module");
    addSerializer(Geometry.class, new GeometrySerializer());
    GenericGeometryParser genericGeometryParser = new GenericGeometryParser(geometryFactory);
    addDeserializer(Geometry.class, new GeometryDeserializer<Geometry>(genericGeometryParser));
    addDeserializer(Point.class, new GeometryDeserializer<Point>(new PointParser(geometryFactory)));
    addDeserializer(MultiPoint.class, new GeometryDeserializer<MultiPoint>(new MultiPointParser(geometryFactory)));
    addDeserializer(LineString.class, new GeometryDeserializer<LineString>(new LineStringParser(geometryFactory)));
    addDeserializer(MultiLineString.class, new GeometryDeserializer<MultiLineString>(new MultiLineStringParser(geometryFactory)));
    addDeserializer(Polygon.class, new GeometryDeserializer<Polygon>(new PolygonParser(geometryFactory)));
    addDeserializer(MultiPolygon.class, new GeometryDeserializer<MultiPolygon>(new MultiPolygonParser(geometryFactory)));
    addDeserializer(GeometryCollection.class, new GeometryDeserializer<GeometryCollection>(new GeometryCollectionParser(geometryFactory, genericGeometryParser)));
  }

  @Override
  public void setupModule(SetupContext context) {
    super.setupModule(context);
  }
}
