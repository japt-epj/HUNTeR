package ch.japt.epj.api;

import ch.japt.epj.model.dto.ExerciseDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;

public interface PaginatedExercise {
    @ApiOperation(value = "Get all exercises", nickname = "exerciseGet", notes = "", response = ExerciseDto.class, responseContainer = "List", tags={ "exercise", })
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "All exercises", response = ExerciseDto.class, responseContainer = "List") })
    @RequestMapping(value = "/exercise",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<Page<ExerciseDto>> exerciseGet(
            @ApiParam(value = "Page index from where to start pagination") @Valid @RequestParam(value = "first", required = false) Integer first,
            @ApiParam(value = "Number of pages to fetch") @Valid @RequestParam(value = "limit", required = false) Integer limit);

}
