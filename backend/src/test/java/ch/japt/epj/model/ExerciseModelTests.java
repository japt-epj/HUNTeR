package ch.japt.epj.model;

import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest(includeFilters = @ComponentScan.Filter(Component.class))
public class ExerciseModelTests {
    @Autowired
    private ExerciseModel model;

    @Test
    public void shouldContainTasks() {
        assertThat(model.allExercises().size()).isEqualTo(10);
    }

    @Test
    public void emptyWhenNotFound() {
        assertThat(model.getExercise(10_000_000L)).isEmpty();
    }

    @Test
    public void shouldAddNewTask() {
        int size = model.allExercises().size();
        model.addExercise(makeTestDto());
        assertThat(model.getExercise(size + 1L)).isNotEmpty();
        assertThat(model.allExercises().size()).isEqualTo(size + 1);
    }

    @Test
    public void newTaskReturned() {
        NewExerciseDto testDto = makeTestDto();
        model.addExercise(testDto);
        ExerciseDto returnDto = model.allExercises().get(model.allExercises().size() - 1);
        assertThat(returnDto)
                .hasFieldOrPropertyWithValue("name", "Unit Test Question")
                .hasFieldOrPropertyWithValue("question", "Is this a unit test?");

        assertThat(returnDto.getAnswers()).isEqualTo(Arrays.asList(new String[]{"Yes", "No"}));
    }

    @Test
    public void failWithInvalidPayload() {
        NewExerciseDto fail = new NewExerciseDto().name("This should fail");
        Assertions
                .assertThatExceptionOfType(NullPointerException.class)
                .isThrownBy(() -> model.addExercise(fail));
    }

    private NewExerciseDto makeTestDto() {
        NewAnswerDto yes = new NewAnswerDto().text("Yes").checked(true);
        NewAnswerDto no = new NewAnswerDto().text("No").checked(false);

        return new NewExerciseDto()
                .name("Unit Test Question")
                .question("Is this a unit test?")
                .answers(Arrays.asList(new NewAnswerDto[]{yes, no}));
    }
}
