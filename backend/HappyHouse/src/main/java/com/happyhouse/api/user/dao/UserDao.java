package com.happyhouse.api.user.dao;

import java.sql.SQLException;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.user.dto.UserDto;

@Mapper
public interface UserDao {	
	UserDto login(UserDto userDto);
	int register(UserDto userDto);
	UserDto getUserInfo(int userId);
	int forgetPassword(UserDto userDto);
	UserDto emailAuthCheck(String authCode);
	int emailAuth(int userId);
	
	void saveRefreshToken(Map<String, Object> map) throws SQLException;
	Object getRefreshToken(int userId) throws SQLException;
	void deleteRefreshToken(Map<String, Object> map) throws SQLException;
}
