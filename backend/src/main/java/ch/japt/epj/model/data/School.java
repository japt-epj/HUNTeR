package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class School {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long schoolId;

  private String name;

  private String domain;

  @OneToMany private Collection<Location> locations = new ArrayList<>();

  @ManyToMany
  @JoinTable(
    name = "PersonSchool",
    joinColumns = {@JoinColumn(name = "SchoolId")},
    inverseJoinColumns = {@JoinColumn(name = "PersonId")}
  )
  private Collection<Person> persons = new ArrayList<>();

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return name + " " + domain;
  }

  public Collection<Location> getLocations() {
    return locations;
  }

  public void addLocation(Location location) {
    locations.add(location);
  }

  public long getSchoolId() {
    return schoolId;
  }
}
