package ch.japt.epj.repository.custom;

import ch.japt.epj.model.data.Exercise;

import java.util.List;

public interface ExerciseRepositoryCustom {
    List<Exercise> findByIds(List<Integer> ids);
}
