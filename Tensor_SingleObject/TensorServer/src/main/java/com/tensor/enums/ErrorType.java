package com.tensor.enums;

public enum ErrorType {
	WARNING(1),ERROR(2);
	private int value;
	
	
	public int getValue() {
		return value;
	}
	
	ErrorType(int s){
		value=s;
	}
	
public static ErrorType getEnum(int val){
		
		for(ErrorType status:ErrorType.values()){
			if(status.value==val){
				return status;				
			}
		}
		return null;
	}
}