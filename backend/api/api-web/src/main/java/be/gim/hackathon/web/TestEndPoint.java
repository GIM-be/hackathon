package be.gim.hackathon.web;

import be.gim.hackathon.ejb.api.TestService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
@Stateless
@Path("test")
public class TestEndPoint {

  @EJB
  private TestService testService;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String test() {
    return testService.hello();
  }
}
