package ch.japt.epj.model;

import ch.japt.epj.library.LocationSorter;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Location;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.NextExerciseLocationDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import ch.japt.epj.repository.ResponseRepository;
import java.util.ArrayList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {

  private final QuizRepository quizzes;
  private final ResponseRepository responses;
  private final PersonRepository persons;
  private final ExecutionRepository executions;

  public LocationModel(
      @Autowired QuizRepository quizzes,
      @Autowired ResponseRepository responses,
      @Autowired PersonRepository persons,
      @Autowired ExecutionRepository executions) {
    this.quizzes = quizzes;
    this.responses = responses;
    this.persons = persons;
    this.executions = executions;
  }

  public NextExerciseLocationDto getExerciseLocation(int id) {
    ArrayList<Exercise> solvedExercises = new ArrayList<>();
    ArrayList<Response> allResponses = new ArrayList<>();
    responses.findAll().forEach(allResponses::add);
    // TODO: Change static userId to user Id sent from frontend
    persons
        .findByPersonId(1L)
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
        .findByExecutionId((long) id)
        .ifPresent(
            execution1 ->
                allLocationsSorted.addAll(
                    LocationSorter.nearestNeighbor(execution1.getQuiz().getLocations())));
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
}
