package com.happyhouse.api.common.email.dto;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class EmailDto {
    private String receiveAddress;
    private String title;
    private String templateName;
    private Map<String, String> data;
    
	public EmailDto(String receiveAddress, String title, String templateName, Map<String, String> data) {
		super();
		this.receiveAddress = receiveAddress;
		this.title = title;
		this.templateName = templateName;
		this.data = data;
	}
}