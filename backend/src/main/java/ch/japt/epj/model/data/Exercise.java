package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;
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

  @OneToMany(mappedBy = "exercise")
  @LazyCollection(LazyCollectionOption.FALSE)
  private Collection<Location> locations = new ArrayList<>();

  @ManyToMany(mappedBy = "exercises")
  @LazyCollection(LazyCollectionOption.FALSE)
  private Collection<Quiz> quizzes = new ArrayList<>();

  private String question;

  public void addAnswerTemplate(Answer answerTemplate) {
    answerTemplates.add(answerTemplate);
  }

  public void setAnswers(Collection<Answer> answers) {
    this.answerTemplates = answers;
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

  public Collection<Quiz> getQuizzes() {
    return quizzes;
  }

  public void addQuiz(Quiz quiz) {
    this.quizzes.add(quiz);
  }

  public Collection<Long> getAnswerIds() {
    return answerTemplates
        .stream()
        .map(Answer::getAnswerId)
        .collect(Collectors.toCollection(ArrayList::new));
  }
}
