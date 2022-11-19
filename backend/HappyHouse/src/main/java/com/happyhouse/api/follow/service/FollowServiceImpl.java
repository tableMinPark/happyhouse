package com.happyhouse.api.follow.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.follow.dao.FollowDao;
import com.happyhouse.api.user.dto.UserDto;

@Service
public class FollowServiceImpl implements FollowService {
	
	@Autowired
	FollowDao dao;

	@Override
	public UserDto getPageUserInfo(int userId) {
		return dao.getPageUserInfo(userId);
	}

	@Override
	public boolean followingCheck(Map<String, Integer> param) {
		int ret = dao.followingCheck(param);
		
		if (ret == 0) {
			return false;
		} else {
			return true;
		}
	}
	
	@Override
	public List<UserDto> getFollowUserList(int userId) {
		return dao.getFollowUserList(userId);
	}

	@Override
	public boolean register(Map<String, Integer> param) {
		if (dao.followingCheck(param) == 0) {
			dao.register(param);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean unRegister(Map<String, Integer> param) {
		if (dao.followingCheck(param) != 0) {
			dao.unRegister(param);
			return true;
		} else {
			return false;
		}
	}

}
