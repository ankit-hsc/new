package com.tensor.utilities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtill {

	public static String getStringFromDate(Date date){
		String dateString = null;
		if(date!=null) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		dateString = dateFormat.format(date); 
		}
		return dateString;

	}
	
	public static String getHourlyStringFromDate(Date date){
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH");
		String dateString = dateFormat.format(date); 
		return dateString;

	}
	
	public static Date getNextDate(Date date)
	{
		Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, 1);
        return cal.getTime();
	}


}