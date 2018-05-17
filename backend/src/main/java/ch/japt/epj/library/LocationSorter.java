package ch.japt.epj.library;

import ch.japt.epj.model.data.Location;
import java.util.ArrayList;
import java.util.Collection;

public final class LocationSorter {
  private LocationSorter() {}

  /**
   * Very crude and brute force implementation of travelling salesman using the nearest neighbour
   * algorithm. This implementation is for demonstration purposes only, and must be replaced with
   * proper routing, either using an online mapping API, or a self hosted OSRM instance for
   * implementing proper routing.
   *
   * @param input Collection of locations create an "optimal" path for
   * @return Locations, sorted by nearest neighbor
   */
  public static Collection<Location> nearestNeighbor(Collection<Location> input) {
    ArrayList<Location> locations = new ArrayList<>(input);
    for (int i = 0; i < locations.size() - 1; i += 1) {
      Edge next = new Edge(locations.get(i), locations.get(i + 1));
      for (int j = i + 1; j < locations.size(); j += 1) {
        Edge option = new Edge(locations.get(i), locations.get(j));
        if (next.getLength() > option.getLength()) {
          swap(locations, i, j);
        }
      }
    }
    return locations;
  }

  private static void swap(ArrayList<Location> locations, int i, int j) {
    Location temp = locations.get(i + 1);
    locations.set(i + 1, locations.get(j));
    locations.set(j, temp);
  }

  private static class Edge {
    private final Location from;
    private final Location to;

    public Edge(Location from, Location to) {
      this.from = from;
      this.to = to;
    }

    public double getLength() {
      return Math.hypot(from.getLat() - to.getLat(), from.getLng() - to.getLng());
    }

    public Location getTo() {
      return to;
    }
  }
}
