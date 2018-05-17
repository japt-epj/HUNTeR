package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Quiz {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long quizId;

  private String name;

  @OneToMany private Collection<Location> locations = new ArrayList<>();

  @ManyToMany
  @JoinTable(
    name = "QuizExercise",
    joinColumns = {@JoinColumn(name = "quizId")},
    inverseJoinColumns = {@JoinColumn(name = "exerciseId")}
  )
  private Collection<Exercise> exercises = new ArrayList<>();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void addTask(Exercise exercise) {
    exercises.add(exercise);
  }

  public void removeTask(Exercise exercise) {
    exercises.remove(exercise);
  }

  public long getQuizId() {
    return quizId;
  }

  public Collection<Exercise> getTasks() {
    return exercises;
  }

  public Collection<Location> getLocations() {
    return locations;
  }

  public void addLocation(Location location) {
    this.locations.add(location);
  }
}
