package be.gim.hackathon.web.jackson.jts.parsers;

import com.vividsolutions.jts.geom.GeometryFactory;

/**
 * Parent BaseParser class.
 */
public class BaseParser {

  protected GeometryFactory geometryFactory;

  /**
   * Constructs a new BaseParser.
   *
   * @param geometryFactory the geometry factory
   */
  public BaseParser(GeometryFactory geometryFactory) {
    this.geometryFactory = geometryFactory;
  }

}
