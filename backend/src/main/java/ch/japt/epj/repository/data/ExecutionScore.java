package ch.japt.epj.repository.data;

public class ExecutionScore {
  private final Long id;
  private final String name;
  private final Double score;
  private final Boolean currentUser;

  public ExecutionScore(
      Long id, String firstName, String lastName, Double score, Boolean currentParticipant) {
    this.id = id;
    this.name = firstName + " " + lastName;
    this.score = score;
    this.currentUser = currentParticipant;
  }

  public Long getId() {
    return id;
  }

  public String getUserName() {
    return name;
  }

  public Double getUserScore() {
    return score;
  }

  public Boolean getMe() {
    return currentUser;
  }
}
