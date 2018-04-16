package ch.japt.epj.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest(includeFilters = @ComponentScan.Filter(Component.class))
public class TaskModelTests {
    @Autowired
    private TaskModel model;

    @Test
    public void shouldContainTasks() {
        assertThat(model.allExercises().size()).isEqualTo(10);
    }

    @Test
    public void shouldAddNewTask() {
    }
}
