package ch.japt.epj.repository.data;

public class ExecutionScore {
  private final Long id;
  private final String name;
  private final Long score;
  private final Boolean currentUser;

  public ExecutionScore(
      Long id, String firstName, String lastName, Long score, Boolean currentParticipant) {
    this.id = id;
    this.name = firstName + " " + lastName;
    this.score = score;
    this.currentUser = currentParticipant;
  }

  public ExecutionScore(
      Long id, String firstName, String lastName, Integer score, Boolean currentParticipant) {
    this.id = id;
    this.name = firstName + " " + lastName;
    this.score = score.longValue();
    this.currentUser = currentParticipant;
  }

  public String getId() {
    return id.toString();
  }

  public String getUserName() {
    return name;
  }

  public Long getUserScore() {
    return score;
  }

  public Boolean getMe() {
    return currentUser;
  }
}
