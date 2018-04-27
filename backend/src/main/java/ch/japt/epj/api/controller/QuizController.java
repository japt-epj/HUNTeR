package ch.japt.epj.api.controller;


import ch.japt.epj.api.PaginatedQuiz;
import ch.japt.epj.library.SortParameterHandler;
import ch.japt.epj.model.QuizModel;
import ch.japt.epj.model.dto.NewQuizDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;

@Controller
@Api
@RequestMapping("/api")
public class QuizController implements ch.japt.epj.api.QuizApi, PaginatedQuiz {
    private final QuizModel quizModel;

    public QuizController(@Autowired QuizModel quizModel) { this.quizModel = quizModel; }

    @Override
    public ResponseEntity<Void> addQuiz(NewQuizDto body) {
        quizModel.addQuiz(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Page<NewQuizDto>> quizGet(
            @Valid @RequestParam(value = "page", defaultValue = "0") int page,
            @Valid @RequestParam(value = "limit", defaultValue = "5") int limit,
            @Valid @RequestParam(value = "sort", defaultValue = "name") String sortOptions) {
        return new ResponseEntity<>(
                quizModel.pageQuiz(page, limit, SortParameterHandler.makeSort(sortOptions)),
                HttpStatus.OK);
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
