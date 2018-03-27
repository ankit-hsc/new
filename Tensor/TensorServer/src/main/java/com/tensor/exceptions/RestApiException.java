/**
 ****************************************************************************************
 --  FILENAME      : RestApiException.java
 --  DESCRIPTION   : Exception for the rest api's only
 --
 --  Copyright	  : Copyright (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author		    	|	Reason for Changes		|
 -- -------------------------------------------------------------------------------------
 -- |	0.1 | Nov 22, 2017  		    |	Rashmi Singh			    |	Initial draft   |
 -- -------------------------------------------------------------------------------------
 --
 *****************************************************************************************
 **/

package com.tensor.exceptions;

public class RestApiException extends VGSException {

	private static final long serialVersionUID = 1L;

	private final int errorCode;

	private final Exception exception;

	public RestApiException() {
		super();
		this.errorCode = 0;
		this.exception = null;
	}

	public RestApiException(String message) {
		super(message);
		this.errorCode = 0;
		this.exception = null;
	}

	public RestApiException(Throwable cause) {
		super(cause);
		this.errorCode = 0;
		this.exception = null;
	}
	
	public RestApiException(final Exception exception) {
		super(exception);
		this.errorCode = 0;
		this.exception = exception;
	}


	public RestApiException(String message, int errorCode) {
		super(message);
		this.errorCode = errorCode;
		this.exception = null;

	}

	public RestApiException(final String message, int errorCode, final Exception exception) {
		super(message, exception);
		this.errorCode = errorCode;
		this.exception = exception;
	}

	public RestApiException(final String message, final Exception exception) {
		super(message, exception);
		this.exception = exception;
		this.errorCode = 0;
	}

	public RestApiException(String message, Throwable cause) {
		super(message, cause);
		this.errorCode = 0;
		this.exception = null;
	}

	public RestApiException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.errorCode = 0;
		this.exception = null;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public Exception getException() {
		return exception==null?this:exception;
	}

}

