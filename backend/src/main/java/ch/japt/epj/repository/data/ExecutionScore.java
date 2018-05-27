package ch.japt.epj.repository.data;

public class ExecutionScore {
  private final Long id;
  private final String name;
  private final Double score;
  private final Boolean currentParticipant;

  public ExecutionScore(
      Long id, String firstName, String lastName, Double score, Boolean currentParticipant) {
    this.id = id;
    this.name = firstName + " " + lastName;
    this.score = score;
    this.currentParticipant = currentParticipant;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Double getScore() {
    return score;
  }

  public Boolean getCurrentParticipant() {
    return currentParticipant;
  }
}
