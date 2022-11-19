package com.happyhouse.api.follow.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.follow.service.FollowService;
import com.happyhouse.api.user.dto.UserDto;

@RestController
@CrossOrigin(
	origins = "http://localhost:5500",
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)
@RequestMapping("/follow")
public class FollowController {

	public static final Logger logger = LoggerFactory.getLogger(FollowController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private FollowService service;

	/* 계정 정보 */
	@GetMapping("/{userId}")
	public ResponseEntity<Map<String, Object>> getPageUserInfo(@PathVariable("userId") int userId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			UserDto pageUserInfo = service.getPageUserInfo(userId);			
			if (pageUserInfo != null) {
				resultMap.put("pageUserInfo", pageUserInfo);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;	
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}
		} catch (Exception e) {
			logger.error("정보조회 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 팔로우 여부 */
	@PostMapping("/check")
	public ResponseEntity<Map<String, Object>> followingCheck(@RequestParam(value="userId") int userId, @RequestParam(value="pageId") int pageId) {
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("userId", userId);
		param.put("pageId", pageId);
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			boolean isFollowing = service.followingCheck(param);
			resultMap.put("isFollowing", isFollowing);
			resultMap.put("message", SUCCESS);
		} catch (Exception e) {
			logger.error("정보조회 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/* 팔로우 계정 리스트 정보 */
	@GetMapping("/list/{userId}")
	public ResponseEntity<Map<String, Object>> getFollowUserList(@PathVariable("userId") int userId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<UserDto> followList = service.getFollowUserList(userId);			
			if (followList != null) {
				resultMap.put("followList", followList);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;	
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}
		} catch (Exception e) {
			logger.error("정보조회 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	
	/* 팔로우 */
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@RequestParam(value="userId") int userId, @RequestParam(value="pageId") int pageId) {
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("userId", userId);
		param.put("pageId", pageId);
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			boolean ret = service.register(param);			
			if (ret) resultMap.put("message", SUCCESS);
			else resultMap.put("message", FAIL);
		} catch (Exception e) {
			logger.error("팔로우 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/* 언팔로우 */
	@PostMapping("/unRegister")
	public ResponseEntity<Map<String, Object>> unRegister(@RequestParam(value="userId") int userId, @RequestParam(value="pageId") int pageId) {
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("userId", userId);
		param.put("pageId", pageId);
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			boolean ret = service.unRegister(param);			
			if (ret) resultMap.put("message", SUCCESS);
			else resultMap.put("message", FAIL);
		} catch (Exception e) {
			logger.error("언팔로우 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
