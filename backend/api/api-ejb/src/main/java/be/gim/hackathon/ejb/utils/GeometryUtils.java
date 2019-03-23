package be.gim.hackathon.ejb.utils;

import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.WKTReader;
import com.vividsolutions.jts.io.WKTWriter;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
public class GeometryUtils {

  public static final WKTReader WKT_READER = new WKTReader(new GeometryFactory(new PrecisionModel(), 3857));
  public static final WKTWriter WKT_WRITER = new WKTWriter();
}
