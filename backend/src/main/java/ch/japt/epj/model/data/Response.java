package ch.japt.epj.model.data;

import java.util.Objects;
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

  public Response() {
    /*
     * Not allowed to hide this constructor because of reflection
     */
  }

  public Response(Person person, Exercise exercise, Answer answerFromPerson) {
    this.person = person;
    this.exercise = exercise;
    this.answerFromPerson = answerFromPerson;
  }

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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Response response = (Response) o;
    return Objects.equals(person, response.person)
        && Objects.equals(exercise, response.exercise)
        && Objects.equals(answerFromPerson, response.answerFromPerson);
  }

  @Override
  public int hashCode() {
    return Objects.hash(person, exercise, answerFromPerson);
  }
}
