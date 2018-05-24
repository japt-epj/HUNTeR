package ch.japt.epj.api.controller;

import ch.japt.epj.api.PaginatedQuiz;
import ch.japt.epj.library.SortParameterHandler;
import ch.japt.epj.model.QrModel;
import ch.japt.epj.model.QuizModel;
import ch.japt.epj.model.dto.NewQuizDto;
import io.swagger.annotations.Api;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Api
@RequestMapping("/api")
public class QuizController implements ch.japt.epj.api.QuizApi, PaginatedQuiz {
  private final QuizModel quizModel;
  private final QrModel qrModel;

  public QuizController(@Autowired QuizModel quizModel, @Autowired QrModel qrModel) {
    this.quizModel = quizModel;
    this.qrModel = qrModel;
  }

  @Override
  public ResponseEntity<Void> addQuiz(@Valid @RequestBody NewQuizDto body) {
    quizModel.addQuiz(body);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<List<NewQuizDto>> quizIdGet(@Valid @PathVariable("id") List<Integer> id) {
    return new ResponseEntity<>(quizModel.getQuizzes(id), HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Resource> quizIdPrintGet(@Valid @PathVariable("id") Long id) {
    return qrModel
        .generatePdf(id)
        .map(b -> new ResponseEntity<Resource>(new ByteArrayResource(b), HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @Override
  public ResponseEntity<Page<NewQuizDto>> quizGet(
      @Valid @RequestParam(value = "page", defaultValue = "0") int page,
      @Valid @RequestParam(value = "limit", defaultValue = "5") int limit,
      @Valid @RequestParam(value = "sort", defaultValue = "name") String sortOptions) {
    return new ResponseEntity<>(
        quizModel.pageQuiz(page, limit, SortParameterHandler.makeSort(sortOptions)), HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Void> updateQuiz(NewQuizDto body) {
    return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
  }

  @Override
  public ResponseEntity<Void> updateQuizWithForm(Long id) {
    return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
  }
}
