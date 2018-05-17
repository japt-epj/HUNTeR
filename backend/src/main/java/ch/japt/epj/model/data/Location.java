package ch.japt.epj.model.data;

import javax.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  @OneToOne private Quiz quiz;

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

  public Quiz getQuiz() {
    return quiz;
  }

  public void setQuiz(Quiz quiz) {
    this.quiz = quiz;
  }
}
