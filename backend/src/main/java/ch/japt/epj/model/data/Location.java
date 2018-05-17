package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  @ManyToMany
  @JoinTable(
    name = "LocationExercise",
    joinColumns = {@JoinColumn(name = "locationId")},
    inverseJoinColumns = {@JoinColumn(name = "exerciseId")}
  )
  private Collection<Exercise> exercises = new ArrayList<>();

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

  public Collection<Exercise> getExercises() {
    return exercises;
  }

  public void addExercise(Exercise exercise) {
    this.exercises.add(exercise);
  }
}
