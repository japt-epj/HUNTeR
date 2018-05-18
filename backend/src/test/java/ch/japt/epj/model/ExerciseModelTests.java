package ch.japt.epj.model;

import static org.assertj.core.api.Assertions.assertThat;

import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.ExerciseRepository;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@Transactional
public class ExerciseModelTests {

  @Autowired private ExerciseModel model;
  @Autowired private ExerciseRepository repository;

  @Test
  public void shouldContainTasks() {
    assertThat(model.pageExercise(0, 5, new Sort(Sort.Direction.ASC, "exerciseId"))).isNotEmpty();
  }

  @Test
  public void emptyWhenNotFound() {
    assertThat(model.getExercise(10_000_000L)).isEmpty();
  }

  @Test
  public void shouldAddNewTask() {
    Page<ExerciseDto> before = model.pageExercise(0, 5, new Sort(Sort.Direction.ASC, "exerciseId"));

    long size = before.getTotalElements();
    model.addExercise(makeTestDto());

    Page<ExerciseDto> after = model.pageExercise(0, 5, new Sort(Sort.Direction.ASC, "exerciseId"));

    assertThat(model.getExercise(size + 1L)).isNotEmpty();
    assertThat(after.getTotalElements()).isEqualTo(size + 1);
  }

  @Test
  public void newTaskReturned() {
    NewExerciseDto testDto = makeTestDto();
    model.addExercise(testDto);
    ExerciseDto returnDto =
        model.pageExercise(0, 1, new Sort(Sort.Direction.DESC, "exerciseId")).getContent().get(0);

    assertThat(returnDto)
        .hasFieldOrPropertyWithValue("name", "Unit Test Question")
        .hasFieldOrPropertyWithValue("question", "Is this a unit test?");

    assertThat(returnDto.getAnswers()).isEqualTo(Arrays.asList("Yes", "No"));
  }

  @Test
  public void failWithInvalidPayload() {
    NewExerciseDto fail = new NewExerciseDto().name("This should fail");
    Assertions.assertThatExceptionOfType(NullPointerException.class)
        .isThrownBy(() -> model.addExercise(fail));
  }

  @Test
  public void getFirstPageDescending() {
    List<ExerciseDto> expected =
        repository
            .getAll()
            .sorted((x, y) -> Long.compare(y.getExerciseId(), x.getExerciseId()))
            .limit(5)
            .map(e -> Mappings.exerciseMapper().map(e, ExerciseDto.class))
            .collect(Collectors.toList());

    Page<ExerciseDto> actual =
        model.pageExercise(0, 5, new Sort(Sort.Direction.DESC, "exerciseId"));

    assertThat(actual.getContent()).isNotEmpty().isEqualTo(expected);
  }

  @Test
  public void getEmptyPage() {
    Page<ExerciseDto> page =
        model.pageExercise(10_000_000, 1, new Sort(Sort.Direction.ASC, "exerciseId"));
    assertThat(page).isEmpty();
  }

  @Test
  public void getExercisesByList() {
    // TODO: Refactor this
    List<Integer> ids = Arrays.asList(1, 2, 3, 300);
    List<ExerciseDto> exercises = model.getExercises(ids);

    assertThat(exercises)
        .isNotEmpty()
        .hasSize(3)
        .extracting(e -> e.getId())
        .isEqualTo(Arrays.asList(1L, 2L, 3L));
  }

  private NewExerciseDto makeTestDto() {
    NewAnswerDto yes = new NewAnswerDto().text("Yes").checked(true);
    NewAnswerDto no = new NewAnswerDto().text("No").checked(false);

    return new NewExerciseDto()
        .name("Unit Test Question")
        .question("Is this a unit test?")
        .answers(Arrays.asList(yes, no));
  }
}
