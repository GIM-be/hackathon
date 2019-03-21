package be.gim.hackathon.ejb;

import be.gim.hackathon.ejb.api.TestService;

import javax.ejb.Stateless;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Stateless
public class TestServiceImpl implements TestService {

  @Override
  public String hello() {
    return "Hello";
  }
}
