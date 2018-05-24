package ch.japt.epj.model;

import ch.japt.epj.library.LocationSorter;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Location;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.NextExerciseLocationDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.ResponseRepository;
import ch.japt.epj.security.CustomUserDetails;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {

  private final ResponseRepository responses;
  private final PersonRepository persons;
  private final ExecutionRepository executions;

  public LocationModel(
      @Autowired ResponseRepository responses,
      @Autowired PersonRepository persons,
      @Autowired ExecutionRepository executions) {
    this.responses = responses;
    this.persons = persons;
    this.executions = executions;
  }

  public NextExerciseLocationDto getExerciseLocation(long id) {
    ArrayList<Exercise> solvedExercises = new ArrayList<>();
    ArrayList<Response> allResponses = new ArrayList<>();
    responses.findAll().forEach(allResponses::add);
    Long personId =
        ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getPersonId();
    persons
        .findByPersonId(personId)
        .ifPresent(
            p ->
                solvedExercises.addAll(
                    allResponses
                        .stream()
                        .filter(response -> response.getPerson().getPersonId() == p.getPersonId())
                        .map(Response::getExercise)
                        .collect(Collectors.toCollection(ArrayList::new))));

    ArrayList<Location> allLocationsSorted = new ArrayList<>();
    executions
        .findByExecutionId(id)
        .ifPresent(
            execution1 -> {
              if (execution1
                  .getParticipants()
                  .stream()
                  .map(Person::getPersonId)
                  .anyMatch(i -> i.equals(personId))) {
                allLocationsSorted.addAll(
                    LocationSorter.nearestNeighbor(execution1.getQuiz().getLocations()));
              }
            });
    if (allLocationsSorted.isEmpty()) {
      return null;
    }
    ArrayList<Location> filteredAndSortedLocations = new ArrayList<>(allLocationsSorted);
    filteredAndSortedLocations.removeIf(
        location -> solvedExercises.contains(location.getExercise()));
    Location nextLocationToGo = filteredAndSortedLocations.get(0);
    Exercise nextExerciseToDo = nextLocationToGo.getExercise();
    NextExerciseLocationDto dto = new NextExerciseLocationDto();
    dto.setExerciseTitle(nextExerciseToDo.getName());
    dto.setLng(nextLocationToGo.getLng());
    dto.setLat(nextLocationToGo.getLat());
    return dto;
  }

  public List<NextExerciseLocationDto> getExerciseLocations() {
    ArrayList<NextExerciseLocationDto> locations = new ArrayList<>();
    executions
        .findAll()
        .forEach(
            execution -> {
              NextExerciseLocationDto location = getExerciseLocation(execution.getExecutionId());
              if (location != null) {
                locations.add(location);
              }
            });
    return locations;
  }
}
