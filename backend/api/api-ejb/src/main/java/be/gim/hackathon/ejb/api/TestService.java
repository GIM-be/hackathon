package be.gim.hackathon.ejb.api;

import javax.ejb.Local;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Local
public interface TestService {
  String hello();
}
