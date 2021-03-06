package ch.japt.epj.model;

import ch.japt.epj.library.LocationSorter;
import ch.japt.epj.library.PersonHandler;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Location;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.NextExerciseLocationDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.ResponseRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {

  private final ResponseRepository responses;
  private final ExecutionRepository executions;

  public LocationModel(
      @Autowired ResponseRepository responses, @Autowired ExecutionRepository executions) {
    this.responses = responses;
    this.executions = executions;
  }

  public NextExerciseLocationDto getExerciseLocation(long executionId) {
    Long personId = PersonHandler.getCurrentPersonId();
    List<Location> locations = getSortedLocationsByExecutionId(personId, executionId);
    if (locations.isEmpty()) {
      return null;
    }
    List<Exercise> solvedExercises = getSolvedExercisesByPersonId(personId);
    return createExerciseLocationDto(filterLocationsBySolvedExercises(locations, solvedExercises));
  }

  private static NextExerciseLocationDto createExerciseLocationDto(List<Location> locations) {
    if (locations.isEmpty()) {
      return null;
    }
    Location nextLocationToGo = locations.get(0);
    Exercise nextExerciseToDo = nextLocationToGo.getExercise();

    NextExerciseLocationDto dto = new NextExerciseLocationDto();
    dto.setExerciseTitle(nextExerciseToDo.getName());
    dto.setLng(nextLocationToGo.getLng());
    dto.setLat(nextLocationToGo.getLat());
    return dto;
  }

  private static List<Location> filterLocationsBySolvedExercises(
      List<Location> locations, List<Exercise> solvedExercises) {
    locations.removeIf(location -> solvedExercises.contains(location.getExercise()));
    return locations;
  }

  private List<Exercise> getSolvedExercisesByPersonId(Long personId) {
    ArrayList<Response> allResponses = new ArrayList<>();
    responses.findAll().forEach(allResponses::add);
    return allResponses
        .stream()
        .filter(response -> personId.equals(response.getPerson().getPersonId()))
        .map(Response::getExercise)
        .collect(Collectors.toList());
  }

  private List<Location> getSortedLocationsByExecutionId(Long personId, Long executionId) {
    List<Location> locations = new ArrayList<>();
    executions
        .findByExecutionId(executionId)
        .ifPresent(
            execution -> {
              if (execution
                  .getParticipants()
                  .stream()
                  .map(Person::getPersonId)
                  .anyMatch(i -> i.equals(personId))) {
                locations.addAll(
                    LocationSorter.nearestNeighbor(execution.getQuiz().getLocations()));
              }
            });
    return locations;
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
