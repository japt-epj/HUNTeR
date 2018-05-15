package ch.japt.epj.model.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long locationId;

  private double lat;
  private double ing;

  public void setCoordinates(double lat, double ing) {

    this.lat = lat;
    this.ing = ing;
  }

  public Location() {}

  public double getLat() {
    return lat;
  }

  public double getIng() {
    return ing;
  }

  public long getLocationId() {
    return locationId;
  }
}
