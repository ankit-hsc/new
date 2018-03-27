/**
 ****************************************************************************************
 --  FILENAME      : VGSException.java
 --  DESCRIPTION   : Generic Exception for the project
 --
 --  Copyright	  : Copyright (c) 2016.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author		    	|	Reason for Changes		|
 -- -------------------------------------------------------------------------------------
 -- |	0.1 | Nov 22, 2017  	|	Rashmi Singh		|	Initial draft  			|
 -- -------------------------------------------------------------------------------------
 --
 *****************************************************************************************
 **/

package com.tensor.exceptions;

public class VGSException extends Exception {

	private static final long serialVersionUID = 1L;

	private final int errorCode;

	private final Exception exception;

	public VGSException() {
		super();
		this.errorCode = 0;
		this.exception = null;
	}

	public VGSException(String message) {
		super(message);
		this.errorCode = 0;
		this.exception = null;
	}

	public VGSException(Throwable cause) {
		super(cause);
		this.errorCode = 0;
		this.exception = null;
	}
	
	public VGSException(final Exception exception) {
		super(exception);
		this.errorCode = 0;
		this.exception = exception;
	}


	public VGSException(String message, int errorCode) {
		super(message);
		this.errorCode = errorCode;
		this.exception = null;

	}

	public VGSException(final String message, int errorCode, final Exception exception) {
		super(message, exception);
		this.errorCode = errorCode;
		this.exception = exception;
	}

	public VGSException(final String message, final Exception exception) {
		super(message, exception);
		this.exception = exception;
		this.errorCode = 0;
	}

	public VGSException(String message, Throwable cause) {
		super(message, cause);
		this.errorCode = 0;
		this.exception = null;
	}

	public VGSException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
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

