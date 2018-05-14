package ch.japt.epj.model.data;

import javax.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  @ManyToOne(cascade = CascadeType.ALL)
  private Quiz quiz;

  @ManyToOne(cascade = CascadeType.ALL)
  private Exercise exercise;

  private double lat;
  private double ing;

  public Location() {}

  public void setCoordinates(double lat, double ing) {

    this.lat = lat;
    this.ing = ing;
  }

  public double getLat() {
    return lat;
  }

  public double getIng() {
    return ing;
  }

  public long getLocationId() {
    return locationId;
  }

  public Quiz getQuiz() {
    return quiz;
  }

  public void setQuiz(Quiz quiz) {
    this.quiz = quiz;
  }

  public Exercise getExercise() {
    return exercise;
  }

  public void setExercise(Exercise exercise) {
    this.exercise = exercise;
  }
}
