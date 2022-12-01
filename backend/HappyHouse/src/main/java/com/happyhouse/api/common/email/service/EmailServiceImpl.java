package com.happyhouse.api.common.email.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.happyhouse.api.common.email.dto.EmailDto;

@Service
public class EmailServiceImpl implements EmailService {

	@Value("${spring.mail.username}")
	private String sendAddress;
	
	@Autowired
    private JavaMailSender emailSender;
	
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	public boolean sendMail(EmailDto emailDto){
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailDto.getReceiveAddress());            
            
            //템플릿에 전달할 데이터 설정
            Context context = new Context();
            
            emailDto.getData().forEach((key, value)->{
                context.setVariable(key, value);
            });
            //메일 내용 설정 : 템플릿 프로세스
            String html = templateEngine.process(emailDto.getTemplateName(), context);

            helper.setSubject(emailDto.getTitle()); 
            helper.setText(html, true);
            emailSender.send(message);
    		return true;
        } catch (Exception e) {
        	e.printStackTrace();
        	return false;
		}
	}
}
