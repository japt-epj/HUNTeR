package ch.japt.epj.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

//@Entity
public class School {

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String domain;

    private ArrayList<Location> locations = new ArrayList<>();


    public School(String name, String domain) {
        this.name = name;
        this.domain = domain;
    }

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

    public ArrayList<Location> getLocations() {
        return locations;
    }

    public void addLocation(Location location){
        locations.add(location);
    }

    public void removeLocation(Location location){
        locations.remove(location);
    }
}
