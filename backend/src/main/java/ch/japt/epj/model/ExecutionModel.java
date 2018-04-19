package ch.japt.epj.model;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import ch.japt.epj.model.data.Execution;
import org.springframework.stereotype.Component;
import java.lang.reflect.Type;
import java.util.List;

@Component
public class ExecutionModel {
    private final ExecutionRepository executions;
    private final PersonRepository users;
    private final ModelMapper mapper = new ModelMapper();

    public ExecutionModel(
            @Autowired ExecutionRepository executions,
            @Autowired PersonRepository users

    ) {
        this.executions = executions;
        this.users = users;
    }

    public List<ExecutionDto> allExecutions() {
        Type type = new TypeToken<List<ExecutionDto>>() {}.getType();
        Iterable<Execution> all = executions.findAll();
        return mapper.map(all, type);
    }

    public ExecutionDto getExecution(Long id) {
        Execution execution = executions.findOne(id);
        return mapper.map(execution, ExecutionDto.class);
    }

    public void addExecution(NewExecutionDto executionDto) {
        Execution execution = mapper.map(executionDto, Execution.class);
        executions.save(execution);
    }

}
