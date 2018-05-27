package ch.japt.epj.repository.data;

public class ExecutionScore {
  private final Long id;
  private final String participantName;
  private final Double participantScore;
  private final Boolean isParticipantMe;

  public ExecutionScore(
      Long id, String firstName, String lastName, Double score, Boolean currentParticipant) {
    this.id = id;
    this.participantName = firstName + " " + lastName;
    this.participantScore = score;
    this.isParticipantMe = currentParticipant;
  }

  public Long getId() {
    return id;
  }

  public String getParticipantName() {
    return participantName;
  }

  public Double getParticipantScore() {
    return participantScore;
  }

  public Boolean getIsParticipantMe() {
    return isParticipantMe;
  }
}
