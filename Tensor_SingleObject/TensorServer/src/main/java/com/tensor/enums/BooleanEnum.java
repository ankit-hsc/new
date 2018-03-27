package com.tensor.enums;

public enum BooleanEnum {
	YES(1,"YES"),
	NO(0,"NO");
	
	private int value;
	private String displayString;
	
	public int getValue() {
		return value;
	}
	
	public String getDisplayString() {
		return displayString;
	}

	private BooleanEnum(int value,String display){
		this.value=value;
		this.displayString = display;
	}
	
	public static BooleanEnum getEnum(int val){
		
		for(BooleanEnum type:BooleanEnum.values()){
			if(type.value==val){
				return type;				
			}
		}
		return null;
	}
	
	public static int getValue(String type){
		
		for(BooleanEnum status:BooleanEnum.values()){
			if(status.toString().equalsIgnoreCase(type)){
				return status.value;				
			}
		}
		return 0;
	}
}
