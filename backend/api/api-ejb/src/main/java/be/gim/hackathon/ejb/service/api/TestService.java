package be.gim.hackathon.ejb.service.api;

import be.gim.hackathon.ejb.model.Test;

import javax.ejb.Local;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Local
public interface TestService {
  Test hello();
}
