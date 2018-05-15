package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Response {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long responseId;

  @OneToOne private Person person;

  @OneToMany private Collection<Answer> answersFromPerson = new ArrayList<>();

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public Collection<Answer> getAnswersFromPerson() {
    return answersFromPerson;
  }

  public void setAnswersFromPerson(Collection<Answer> answersFromPerson) {
    this.answersFromPerson = answersFromPerson;
  }
}
