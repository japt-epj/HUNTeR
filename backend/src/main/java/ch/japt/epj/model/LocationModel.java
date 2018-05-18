package ch.japt.epj.model;

import ch.japt.epj.model.dto.NextExerciseLocationDto;
import ch.japt.epj.repository.LocationRepository;
import ch.japt.epj.repository.QuizRepository;
import ch.japt.epj.repository.ResponseRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationModel {

  private final LocationRepository locations;
  private final QuizRepository quizzes;
  private final ResponseRepository responses;

  public LocationModel(
      @Autowired LocationRepository locations,
      @Autowired QuizRepository quizzes,
      @Autowired ResponseRepository responses) {
    this.locations = locations;
    this.quizzes = quizzes;
    this.responses = responses;
  }

  public Optional<NextExerciseLocationDto> getExerciseLocation(Long id) {
    // TODO: Change static userId to user Id sent from frontend
    //    ArrayList<Exercise> solvedExercises = responses.findByPersonId(1L)
    //        .stream().map(Response::getExercise).collect(Collectors.toCollection(ArrayList::new));
    //    ArrayList<Exercise> leftOverExercises = new ArrayList<>();
    //    quizzes
    //        .findQuizByQuizId(id)
    //        .ifPresent(
    //            quiz -> {
    //              leftOverExercises.addAll(quiz.getTasks());
    //              leftOverExercises.removeAll(solvedExercises);
    //              leftOverExercises.forEach(e -> {
    //                e.getLocations().removeAll(quiz.getLocations());
    //                validExercises.put(e.getLocations().toArray()[0])
    //              });
    //
    //            });
    //
    //    Collection<Exercise> sortedExercises =
    // LocationSorter.nearestNeighborFromExercises(leftOverExercises);
    //    Exercise nearestExercise = (Exercise)sortedExercises.toArray()[1];
    //    NextExerciseLocationDto nextLocation = new NextExerciseLocationDto();
    //    nextLocation.setExerciseTitle(nearestExercise.getExerciseTitle());
    //    nextLocation.setLat(nearestExercise.get);
    //    nextLocation.setLng(nearestExercise);

    return null;
  }
}
