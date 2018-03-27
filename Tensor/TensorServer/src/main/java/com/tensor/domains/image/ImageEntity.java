package com.tensor.domains.image;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;


/**
 * @author Ankit
 *
 */
@Entity
@Table(name = "IMAGE_DATA")
public class ImageEntity implements Serializable {
	
	
	
	private int id ;
	private String object ;
	private String probability ;
	private String token;
	private Date timeStamp;
	
	
	
	public ImageEntity() {
		super();
	}

	public ImageEntity(int id, String object, String probability, String token, Date timeStamp) {
		super();
		this.id = id;
		this.object = object;
		this.probability = probability;
		this.token = token;
		this.timeStamp = timeStamp;
	}



	@Id  
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	@Column(name="object")
	public String getObject() {
		return object;
	}
	public void setObject(String object) {
		this.object = object;
	}
	@Column(name="probability")
	public String getProbability() {
		return probability;
	}

	public void setProbability(String probability) {
		this.probability = probability;
	}
	@Column(name="token")
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	@Column(name="timeStamp")	
	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	@PrePersist
	private void generateSecret(){
	    this.setToken(UUID.randomUUID().toString());
	}



}
