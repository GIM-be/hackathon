package be.gim.hackathon.ejb.model;

/**
 * @author rhardenne
 * @since 23/03/2019
 */
public enum ProposalType {
  BENCH("Banc"),
  BUS_STATION("Arrêt de bus"),
  TRASH_BIN("Poubelle"),
  CROSSWALK("Passage piétons");

  private String label;

  ProposalType(String label) {
    this.label = label;
  }

  public String getLabel() {
    return label;
  }
}
