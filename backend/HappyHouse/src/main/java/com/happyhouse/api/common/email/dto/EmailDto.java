package com.happyhouse.api.common.email.dto;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class EmailDto {
	@Value("${spring.mail.username}")
	private String sendAddress;
    private String receiveAddress;
    private String title;
    private String content;
    
    public EmailDto(String receiveAddress, String title, String content) {
    	this.receiveAddress = receiveAddress;
    	this.title = title;
    	this.content = content;
    }
}