package com.tensor.template;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

public class TensorTemplate {

	
	
	public   String singleObjectTensor(String name,String path) throws JSONException   {
		
		
		String postUrl = "http://10.11.26.13:8080/tensor/imageRecgnition";

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
        
		JSONObject json = new JSONObject();
		json.put("fileName",name);
		json.put("filePath", path);
		
		HttpEntity <String> httpEntity = new HttpEntity <String> (json.toString(), httpHeaders);

		RestTemplate restTemplate = new RestTemplate();
		String response = restTemplate.postForObject(postUrl, httpEntity, String.class);
		return response;
	}
	
	
	
public  String multipleObjectTensor(String name,String path) throws JSONException   {
		
		
		String postUrl = "http://10.11.26.55:8080/tensor/imageRecgnition";

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
        
		JSONObject json = new JSONObject();
		json.put("fileName",name);
		json.put("filePath", path);
		
		HttpEntity <String> httpEntity = new HttpEntity <String> (json.toString(), httpHeaders);

		RestTemplate restTemplate = new RestTemplate();
		String response = restTemplate.postForObject(postUrl, httpEntity, String.class);
		return response;
	}
}
