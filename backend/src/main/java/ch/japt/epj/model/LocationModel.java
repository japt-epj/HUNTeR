package ch.japt.epj.model;


import ch.japt.epj.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {
    private final LocationRepository locations;

    public LocationModel(@Autowired LocationRepository locations) {
        this.locations = locations;
    }
}
