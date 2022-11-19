package com.happyhouse.api.follow.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.user.dto.UserDto;

@Mapper
public interface FollowDao {
	UserDto getPageUserInfo(int userId);
	int followingCheck(Map<String, Integer> param);
	List<UserDto> getFollowUserList(int userId);	
	int register(Map<String, Integer> param);
	int unRegister(Map<String, Integer> param);
}
