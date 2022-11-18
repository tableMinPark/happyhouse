package com.happyhouse.api.common.email.service;

import com.happyhouse.api.common.email.dto.EmailDto;

public interface EmailService {
	boolean sendMail(EmailDto emailDto);
}
