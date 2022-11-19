package com.happyhouse.api.follow.service;

import java.util.List;
import java.util.Map;

import com.happyhouse.api.user.dto.UserDto;

public interface FollowService {
	UserDto getPageUserInfo(int userId);
	boolean followingCheck(Map<String, Integer> param);
	List<UserDto> getFollowUserList(int userId);
	boolean register(Map<String, Integer> param);
	boolean unRegister(Map<String, Integer> param);
}
