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
    // TODO: find out how to create custom application properties, and extract the default values
    @ApiOperation(
            value = "Get all exercises",
            nickname = "exerciseGet",
            notes = "",
            response = ExerciseDto.class,
            responseContainer = "List", tags={ "exercise", })
    @ApiResponses(value = {
            @ApiResponse(
                    code = 200,
                    message = "All exercises",
                    response = ExerciseDto.class,
                    responseContainer = "List") })
    @RequestMapping(value = "/exercise",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<Page<ExerciseDto>> exerciseGet(
            @ApiParam(value = "Page index from where to start pagination")
            @Valid @RequestParam(value = "page", defaultValue = "0")
                    int page,
            @ApiParam(value = "Number of pages to fetch")
            @Valid @RequestParam(value = "limit", defaultValue = "5")
                    int limit,
//            @ApiParam(value = "Sorting options")
//            @Valid @RequestParam(value = "sort", defaultValue = "name,asc")
                    String sort);
}
