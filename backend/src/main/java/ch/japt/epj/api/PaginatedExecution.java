package ch.japt.epj.api;

import ch.japt.epj.model.dto.ExecutionDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public interface PaginatedExecution {
  @ApiOperation(
    value = "Get all executions",
    nickname = "executionGet",
    response = ExecutionDto.class,
    responseContainer = "List",
    tags = {
      "execution",
    }
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        code = 200,
        message = "All executions",
        response = ExecutionDto.class,
        responseContainer = "List"
      )
    }
  )
  @RequestMapping(
    value = "/execution",
    produces = {"application/json"},
    method = RequestMethod.GET
  )
  ResponseEntity<Page<ExecutionDto>> executionGet(
      @ApiParam(value = "Page index from where to start pagination") int page,
      @ApiParam(value = "Number of pages to fetch") int limit,
      @ApiParam(value = "Property and direction by which to sort result set") String sort);
}
