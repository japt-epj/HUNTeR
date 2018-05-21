package ch.japt.epj.model.data;

public class Coordinates {

  private final double lat;
  private final double lng;

  public Coordinates(double lat, double lng) {
    this.lat = lat;
    this.lng = lng;
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }
}
