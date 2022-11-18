package com.happyhouse.api.user.service;

import com.happyhouse.api.user.dto.UserDto;

public interface UserService {
	
	UserDto login(UserDto userDto) throws Exception;
	int register(UserDto userDto) throws Exception;
	UserDto getUserInfo(int userId) throws Exception;	
	int forgetPassword(UserDto userDto) throws Exception;
	int emailAuth(String authCode) throws Exception;
	
	void saveRefreshToken(int userId, String refreshToken) throws Exception;
	Object getRefreshToken(int userId) throws Exception;
	void deleteRefreshToken(int userId) throws Exception; 
}
