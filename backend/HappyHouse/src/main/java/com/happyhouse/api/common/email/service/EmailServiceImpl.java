package com.happyhouse.api.common.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.happyhouse.api.common.email.dto.EmailDto;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
    private JavaMailSender emailSender;
	
	public boolean sendMail(EmailDto emailDto){
        try {
        	SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(emailDto.getSendAddress());
            message.setTo(emailDto.getReceiveAddress());
            message.setSubject(emailDto.getTitle());
            message.setText(emailDto.getContent());
            emailSender.send(message);
    		return true;
        } catch (Exception e) {
        	e.printStackTrace();
        	return false;
		}
	}
}
