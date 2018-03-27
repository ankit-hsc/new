package com.tensor.examples;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

public class RestTemp {

	
	public static void main(String args[]) throws JSONException  {
		
		
		String postUrl = "http://10.11.26.13:8080/tensor/imageRecgnition";

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
        
		List<JSONObject> listJson=new ArrayList<>();
		JSONObject json = new JSONObject();
		json.put("model", "tensorflow_inception_graph");
		json.put("imageObjectFileName", "imageData");
		json.put("imageURL","https://img.autobytel.com/2016/lamborghini/aventador/2-800-oemexteriorfront1300-80058.jpg");
		listJson.add(json);
		
		HttpEntity <String> httpEntity = new HttpEntity <String> (listJson.toString(), httpHeaders);

		RestTemplate restTemplate = new RestTemplate();
		String response = restTemplate.postForObject(postUrl, httpEntity, String.class);
		System.out.println(response);
		
		/*JSONObject jsonObj = new JSONObject(response);
		String balance = jsonObj.get("data").toString();*/
	}
}
