package ch.japt.epj.model.data;

import javax.persistence.*;

@Entity
public class Response {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long responseId;

  @ManyToOne(cascade = CascadeType.ALL)
  private Person person;

  @ManyToOne(cascade = CascadeType.ALL)
  private Exercise exercise;

  @ManyToOne(cascade = CascadeType.ALL)
  private Answer answerFromPerson;

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public long getResponseId() {
    return responseId;
  }

  public Exercise getExercise() {
    return exercise;
  }

  public void setExercise(Exercise exercise) {
    this.exercise = exercise;
  }

  public Answer getAnswerFromPerson() {
    return answerFromPerson;
  }

  public void setAnswerFromPerson(Answer answerFromPerson) {
    this.answerFromPerson = answerFromPerson;
  }
}
