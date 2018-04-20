package ch.japt.epj.model;

import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.NewQuizDto;
import ch.japt.epj.repository.QuizRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class QuizModel {
    private final QuizRepository quizzes;
    private final ModelMapper mapper = new ModelMapper();

    public QuizModel(@Autowired QuizRepository quizzes) {
        this.quizzes = quizzes;
    }

    public List<NewQuizDto> allQuizes() {
        Type type = new TypeToken<List<NewQuizDto>>() {}.getType();
        Iterable<Quiz> all = quizzes.findAll();
        return mapper.map(all, type);
    }

    public NewQuizDto getQuiz(long id) {
        Quiz quiz = quizzes.findOne(id);
        return mapper.map(quiz, NewQuizDto.class);
    }

    public void addQuiz(NewQuizDto quizDto) {
        Quiz quiz = mapper.map(quizDto, Quiz.class);
        quizzes.save(quiz);
    }


}
