package ch.japt.epj.model.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Execution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long executionId;

  private String name;

  private LocalDateTime startDate;

  private LocalDateTime endDate;

  @ManyToOne(cascade = CascadeType.ALL)
  private Quiz quiz;

  @OneToMany private Collection<Person> participants = new ArrayList<>();

  @OneToMany private Collection<Response> responses = new ArrayList<>();

  public void addParticipant(Person person) {
    participants.add(person);
  }

  public Collection<Person> getParticipants() {
    return participants;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public long getExecutionId() {
    return executionId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Quiz getQuiz() {
    return quiz;
  }

  public void setQuiz(Quiz quiz) {
    this.quiz = quiz;
  }

  public Collection<Response> getResponses() {
    return responses;
  }

  public void addResponse(Response response) {
    this.responses.add(response);
  }
}
