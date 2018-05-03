package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.NewQuizDto;
import ch.japt.epj.repository.QuizRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class QuizModel {
    private static final Type QUIZ_DTO_LIST = new TypeToken<List<NewQuizDto>>() {}.getType();

    private final QuizRepository quizzes;
    private final ModelMapper mapper = new ModelMapper();

    public QuizModel(@Autowired QuizRepository quizzes) {
        this.quizzes = quizzes;
    }

    public Page<NewQuizDto> pageQuiz(int page, int limit, Sort sort) {
        return quizzes.findAll(new PageRequest(page, limit, sort))
                .map(quiz -> mapper.map(quiz, NewQuizDto.class));
    }

    public NewQuizDto getQuiz(long id) {
        Quiz quiz = quizzes.findOne(id);
        return mapper.map(quiz, NewQuizDto.class);
    }

    public void addQuiz(NewQuizDto quizDto) {
        Quiz quiz = mapper.map(quizDto, Quiz.class);

        quizzes.save(quiz);
    }

    public List<NewQuizDto> getQuizzes(List<Integer> ids) {
        List<Long> longs = ListConverter.toLong(ids);
        return mapper.map(quizzes.findAll(longs), QUIZ_DTO_LIST);
    }
}
