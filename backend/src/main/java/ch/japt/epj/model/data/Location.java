package ch.japt.epj.model.data;

import javax.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  @ManyToOne
  //  @JoinTable(
  //    name = "LocationExercise",
  //    joinColumns = {@JoinColumn(name = "locationId")},
  //    inverseJoinColumns = {@JoinColumn(name = "exerciseId")}
  //  )
  private Exercise exercise;

  private double lat;
  private double lng;

  public Location() {}

  public void setCoordinates(double lat, double ing) {

    this.lat = lat;
    this.lng = ing;
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
