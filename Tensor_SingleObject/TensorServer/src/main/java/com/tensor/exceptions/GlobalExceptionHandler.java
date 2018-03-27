package com.tensor.exceptions;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tensor.enums.JSONOutputEnum;
import com.tensor.models.JSONOutputModel;
import com.tensor.models.RestApiOutputModel;
import com.tensor.utilities.VGSConstants;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	private static final Logger LOGGER = (Logger) LogManager.getLogger(GlobalExceptionHandler.class);

	/**
	 * Function to handle IllegalArgumentException globally.
	 * 
	 * @param ex
	 * @param ex
	 * @param request
	 * @return ResponseEntity
	 */
	@ExceptionHandler(value = { IllegalStateException.class })
	public ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {

		JSONOutputModel responseDTO = new JSONOutputModel();
		responseDTO.setMessage(VGSConstants.EXCEPTION_ILLEGAL_ARGUMENT);
		return handleExceptionInternal(ex, responseDTO, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
	}

	/**
	 * Function to handle Business Exception globally.
	 * 
	 * @param ex
	 * @param request
	 * @return ResponseEntity
	 */
	@ExceptionHandler(value = { VGSException.class })
	public ResponseEntity<Object> handleBusinessException(VGSException ex, WebRequest request) {
		JSONOutputModel responseDTO = new JSONOutputModel();
		responseDTO.setMessage(ex.getMessage());
		
		LOGGER.error(ex.getMessage(), ex.getException());

		return handleExceptionInternal(ex, responseDTO, new HttpHeaders(), HttpStatus.OK, request);
	}
	
	/**
	 * Function to handle Rest api exception
	 * @Description 
	 * @param ex
	 * @param request
	 * @return  ResponseEntity<Object>
	 */
	@ExceptionHandler(value = { RestApiException.class })
	public ResponseEntity<Object> handleRestApiException(VGSException ex, WebRequest request) {
		RestApiOutputModel responseDTO = new RestApiOutputModel();
		responseDTO.setMessage(ex.getMessage());
		LOGGER.error(ex.getMessage(), ex.getException());
		//LOGGER.error("Returned responseCode is: {} response message is: {} ", HttpStatus.INTERNAL_SERVER_ERROR.value(), responseDTO.getMessage());

		return handleExceptionInternal(ex, responseDTO, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
	}

}
