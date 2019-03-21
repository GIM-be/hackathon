package be.gim.hackathon.web;

import java.util.HashSet;
import java.util.Set;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
public class AppConfig extends javax.ws.rs.core.Application {

  @Override
  public Set<Class<?>> getClasses() {
    Set<Class<?>> classes = new HashSet<>();

    classes.add(TestEndPoint.class);
    return classes;
  }

}
