package com.happyhouse.api.user.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.common.email.dto.EmailDto;
import com.happyhouse.api.common.email.service.EmailService;
import com.happyhouse.api.user.dao.UserDao;
import com.happyhouse.api.user.dto.UserDto;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao dao;
	
	@Autowired
	EmailService emailService;

	@Override
	public UserDto login(UserDto userDto) throws Exception {
		return dao.login(userDto);
	}
	
	@Override
	public int register(UserDto userDto) throws Exception {		
		// 이메일 인증코드 생성
		String authCode = UUID.randomUUID().toString();		
		// 이메일 전송 (인증코드 포함)
		emailService.sendMail(new EmailDto("tablemin_park@daum.net", "인증테스트", authCode));		
		// 인증코드 포함 Dto
		userDto.setAuth_code(authCode);		
		// 데이터베이스 저장		
		return dao.register(userDto);
	}
	
	@Override
	public UserDto getUserInfo(int userId) throws Exception {
		return dao.getUserInfo(userId);
	}

	@Override
	public int forgetPassword(UserDto userDto) throws Exception {
		// 새로운 랜덤 비밀번호 생성
		String randomPassword = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
		// 이메일전송
		emailService.sendMail(new EmailDto("tablemin_park@daum.net", "비밀번호변경 테스트", randomPassword));		
		// 새로운 비밀번호 포함 Dto
		userDto.setUserPassword(randomPassword);
		// 데이터베이스 저장
		return dao.forgetPassword(userDto);
	}
	
	@Override
	public int emailAuth(String authCode) throws Exception {
		// 인증코드 받아서 DB 로 던짐 -> 인증코드에 해당하는 계정 인증완료로 수정 -> 인증코드 날림
		
		// 인증코드와 일치하는 계정확인
		UserDto userDto = dao.emailAuthCheck(authCode);
				
		// 일치하는 계정이 있으면
		if (userDto != null) {
			System.out.println(userDto.getUserId());
			return dao.emailAuth(userDto.getUserId());	// 인증코드변경
		} else {
			return 0;
		}
	}
	
	@Override
	public void saveRefreshToken(int userId, String refreshToken) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("token", refreshToken);
		dao.saveRefreshToken(map);
	}

	@Override
	public Object getRefreshToken(int userId) throws Exception {
		return dao.getRefreshToken(userId);
	}

	@Override
	public void deleteRefreshToken(int userId) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("token", null);
		dao.deleteRefreshToken(map);
	}

}
