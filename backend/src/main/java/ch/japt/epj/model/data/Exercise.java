package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
public class Exercise {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long exerciseId;

  private String name;

  @OneToMany private Collection<Answer> answerTemplates = new ArrayList<>();

  @ManyToMany(mappedBy = "exercises")
  @LazyCollection(LazyCollectionOption.FALSE)
  private Collection<Location> locations = new ArrayList<>();

  private String question;

  public void addAnswerTemplate(Answer answerTemplate) {
    answerTemplates.add(answerTemplate);
  }

  public void removeAnswerTemplate(Answer answerTemplate) {
    answerTemplates.remove(answerTemplate);
  }

  public Collection<Answer> getAnswerTemplates() {
    return answerTemplates;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public long getExerciseId() {
    return exerciseId;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public Collection<Location> getLocations() {
    return locations;
  }

  public void addLocation(Location location) {
    this.locations.add(location);
  }
}
