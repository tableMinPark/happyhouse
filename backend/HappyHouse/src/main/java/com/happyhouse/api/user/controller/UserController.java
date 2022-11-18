package com.happyhouse.api.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.common.jwt.service.JwtServiceImpl;
import com.happyhouse.api.user.dto.UserDto;
import com.happyhouse.api.user.service.UserService;

@RestController
@CrossOrigin(
	origins = "http://localhost:5500",
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)

@RequestMapping("/user")
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private JwtServiceImpl jwtService;
	
	@Autowired
	UserService service;

	/* 로그인 */
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(UserDto userDto){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {			
			userDto = service.login(userDto);
			
			System.out.println(userDto);
			
			if (userDto != null) {
				String accessToken = jwtService.createAccessToken("userid", userDto.getUserId());// key, data
				String refreshToken = jwtService.createRefreshToken("userid", userDto.getUserId());// key, data
				service.saveRefreshToken(userDto.getUserId(), refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("message", SUCCESS);
				resultMap.put("userInfo", userDto);
				status = HttpStatus.ACCEPTED;
				
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/* 로그아웃 */
	@PostMapping("/logout/{userId}")
	public ResponseEntity<Map<String, Object>> logout(@PathVariable("userId") int userId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {			
			service.deleteRefreshToken(userId);			
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
			
		} catch (Exception e) {
			logger.error("로그아웃 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 토큰확인  */
	@GetMapping("{userId}")
	public ResponseEntity<Map<String, Object>> getUserInfo(@PathVariable("userId") int userId, HttpServletRequest request) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
				
		if (jwtService.checkToken(request.getHeader("access-token"))) {
			try {
				if(service.getRefreshToken(userId) != null) {
					logger.info("사용 가능한 토큰!!!");
					UserDto userDto = service.getUserInfo(userId);
					resultMap.put("userInfo", userDto);
					resultMap.put("message", SUCCESS);
					status = HttpStatus.ACCEPTED;
				}
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 토큰갱신  */
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(UserDto userDto, HttpServletRequest request) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		String token = request.getHeader("refresh-token");
		
		logger.debug("token : {}, memberDto : {}", token, userDto);
		
		if (jwtService.checkToken(token)) {
			
			System.out.println(service.getRefreshToken(userDto.getUserId()));
			
			if (token.equals(service.getRefreshToken(userDto.getUserId()))) {
				String accessToken = jwtService.createAccessToken("userid", userDto.getUserId());
				logger.debug("token : {}", accessToken);
				logger.debug("정상적으로 액세스토큰 재발급!!!");
				resultMap.put("access-token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} else {
			logger.debug("리프레쉬토큰도 사용불!!!!!!!");
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 회원가입  */
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(UserDto userDto){

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {
			int ret = service.register(userDto);
			
			if (ret == 1) {
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;				
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}
		} catch (Exception e) {
			logger.error("회원가입 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 비밀번호찾기  */
	@PostMapping("/forget_password")
	public ResponseEntity<Map<String, Object>> forgetPassword (UserDto userDto){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {
			
			int ret = service.forgetPassword(userDto);
			
			if (ret == 1) {
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;				
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}			
			
		} catch (Exception e) {
			logger.error("비밀번호변경 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/* 이메일인증  */
	@GetMapping("/email_auth/{authCode}")
	public ResponseEntity<Map<String, Object>> emailAuth (@PathVariable String authCode){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {	
			int ret = service.emailAuth(authCode);

			if (ret == 1) {
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;				
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;				
			}
		} catch (Exception e) {
			logger.error("이메일인증 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
