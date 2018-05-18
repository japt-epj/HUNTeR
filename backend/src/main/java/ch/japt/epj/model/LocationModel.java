package ch.japt.epj.model;

import ch.japt.epj.library.LocationSorter;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Location;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.NextExerciseLocationDto;
import ch.japt.epj.repository.LocationRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import ch.japt.epj.repository.ResponseRepository;
import java.util.ArrayList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {

  private final LocationRepository locations;
  private final QuizRepository quizzes;
  private final ResponseRepository responses;
  private final PersonRepository persons;

  public LocationModel(
      @Autowired LocationRepository locations,
      @Autowired QuizRepository quizzes,
      @Autowired ResponseRepository responses,
      @Autowired PersonRepository persons) {
    this.locations = locations;
    this.quizzes = quizzes;
    this.responses = responses;
    this.persons = persons;
  }

  public NextExerciseLocationDto getExerciseLocation(int id) {
    ArrayList<Exercise> solvedExercises = new ArrayList<>();
    // TODO: Change static userId to user Id sent from frontend
    persons
        .findByPersonId(1L)
        .ifPresent(
            p ->
                solvedExercises.addAll(
                    responses
                        .getAll()
                        .filter(response -> response.getPerson().getPersonId() == p.getPersonId())
                        .map(Response::getExercise)
                        .collect(Collectors.toCollection(ArrayList::new))));
    ArrayList<Location> allLocationsSorted = new ArrayList<>();
    quizzes
        .findQuizByQuizId((long) id)
        .ifPresent(
            quiz -> allLocationsSorted.addAll(LocationSorter.nearestNeighbor(quiz.getLocations())));
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
