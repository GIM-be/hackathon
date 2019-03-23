package be.gim.hackathon.web;

import be.gim.hackathon.ejb.model.NotificationZone;
import be.gim.hackathon.ejb.model.User;
import be.gim.hackathon.ejb.service.api.UserService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
@Stateless
@Path("user")
public class UserEndPoint {

  @EJB
  private UserService userService;

  @GET
  @Path("{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public User get(@PathParam("id") Integer id) {
    return userService.findById(id).orElse(null);
  }

  @POST
  @Path("create")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public User create(User user) {
    return userService.createUser(user);
  }

  @POST
  @Path("{id}/notificationZone/add")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public User addNotificationZone(@PathParam("id") Integer id, NotificationZone notificationZone) {
    return userService.addNotificationZone(id, notificationZone).orElse(null);
  }

}
