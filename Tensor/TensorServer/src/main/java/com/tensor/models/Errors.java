package com.tensor.models;

import com.tensor.enums.ErrorType;

public class Errors {
	ErrorType type;
	String msg;
	
	public Errors(ErrorType error, String string) {
		type =error;
		msg = string;
	}
	public ErrorType getType() {
		return type;
	}
	public void setType(ErrorType type) {
		this.type = type;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	

}
