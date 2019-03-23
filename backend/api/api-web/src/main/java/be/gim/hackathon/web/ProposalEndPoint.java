package be.gim.hackathon.web;

import be.gim.hackathon.ejb.model.Proposal;
import be.gim.hackathon.ejb.model.ProposalType;
import be.gim.hackathon.ejb.service.api.ProposalService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author rhardenne
 * @since 22/03/2019
 */
@Stateless
@Path("proposal")
public class ProposalEndPoint {

  @EJB
  private ProposalService proposalService;

  @GET
  @Path("{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public Proposal get(@PathParam("id") Integer id) {
    return proposalService.findById(id).orElse(null);
  }

  @POST
  @Path("create")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public Proposal create(Proposal proposal) {
    return proposalService.create(proposal);
  }

  @GET
  @Path("all")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Proposal> getAll() {
    return proposalService.findAllProposals();
  }

  @GET
  @Path("type/all")
  @Produces(MediaType.APPLICATION_JSON)
  public Map<ProposalType, String> getAllTypes() {
    return Arrays.stream(ProposalType.values())
      .collect(Collectors.toMap(Function.identity(), ProposalType::getLabel));
  }

}
