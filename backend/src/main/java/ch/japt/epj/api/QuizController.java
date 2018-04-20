package ch.japt.epj.api;


import ch.japt.epj.model.QuizModel;
import ch.japt.epj.model.dto.NewQuizDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Api
@RequestMapping("/api")
public class QuizController implements ch.japt.epj.api.QuizApi {
    private final QuizModel quizModel;

    public QuizController(@Autowired QuizModel quizModel) { this.quizModel = quizModel; }

    @Override
    public ResponseEntity<Void> addQuiz(NewQuizDto body) {
        quizModel.addQuiz(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<NewQuizDto>> quizGet() {
        return new ResponseEntity<>(quizModel.allQuizes(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<NewQuizDto> quizIdGet(Integer id) {
        return new ResponseEntity<>(quizModel.getQuiz(id.longValue()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> updateQuiz(NewQuizDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateQuizWithForm(Long id) {
        return null;
    }
}
