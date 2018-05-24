package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  @ManyToOne private Exercise exercise;

  @ManyToMany
  @JoinTable(
    name = "QuizLocation",
    joinColumns = {@JoinColumn(name = "locationId")},
    inverseJoinColumns = {@JoinColumn(name = "quizId")}
  )
  private Collection<Location> locations = new ArrayList<>();

  private double lat;
  private double lng;

  public void setCoordinates(double lat, double lng) {
    this.lat = lat;
    this.lng = lng;
  }

  public Coordinates getCoordinates() {
    return new Coordinates(lat, lng);
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }

  public long getLocationId() {
    return locationId;
  }

  public Exercise getExercise() {
    return exercise;
  }

  public void setExercise(Exercise exercise) {
    this.exercise = exercise;
  }
}
