package ch.japt.epj.api;
import ch.japt.epj.model.ExecutionModel;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

@Controller
@RequestMapping("/api")
public class ExecutionController implements ch.japt.epj.api.ExecutionApi {
    private final ExecutionModel executionModel;

    public ExecutionController(@Autowired ExecutionModel executionModel) {
        this.executionModel = executionModel;
    }

    @Override
    public ResponseEntity<Void> addExecution(NewExecutionDto body) {
        executionModel.addExecution(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<ExecutionDto>> executionGet() {
        return new ResponseEntity<>(executionModel.allExecutions(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExecutionDto> executionIdGet(Integer id) {
        return new ResponseEntity<>(executionModel.getExecution(id.longValue()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> updateExecution(ExecutionDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateExecutionWithForm(Long id) {
        return null;
    }
}