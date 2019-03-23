package be.gim.hackathon.web;

import be.gim.hackathon.web.jackson.jts.JtsModule;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author rhardenne
 * @since 21/03/2019
 */
public class AppConfig extends javax.ws.rs.core.Application {


  public static final String DD_MM_YYYY_HH_MM_SS = "dd/MM/yyyy HH:mm:ss";
  private static final Logger LOGGER = Logger.getLogger(AppConfig.class.getName());

  @Override
  public Set<Object> getSingletons() {
    // Register the Jackson provider for JSON
    JacksonJaxbJsonProvider jaxbProvider = new JacksonJaxbJsonProvider();
    jaxbProvider.setMapper(createObjectMapper());
    LOGGER.log(Level.SEVERE, "module initialized");
    return Collections.singleton(jaxbProvider);
  }

  @Override
  public Set<Class<?>> getClasses() {
    Set<Class<?>> classes = new HashSet<>();

    classes.add(TestEndPoint.class);
    classes.add(ProposalEndPoint.class);
    return classes;
  }

  public static ObjectMapper createObjectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.setDateFormat(new SimpleDateFormat(DD_MM_YYYY_HH_MM_SS));
    mapper.registerModule(new SimpleModule())
      .registerModule(new ParameterNamesModule())
      .registerModule(new Jdk8Module())
      .registerModule(new JavaTimeModule())
      .registerModule(new JtsModule());
    return mapper;
  }

}
