package com.happyhouse.api.common.address.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.common.address.dto.AddressDto;
import com.happyhouse.api.common.address.service.AddressService;

@RestController
@CrossOrigin(
	origins = "http://localhost:5500",
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)

@RequestMapping("/address")
public class AddressController {
	public static final Logger logger = LoggerFactory.getLogger(AddressController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private AddressService service;
	
	/* 시도  */
	@GetMapping("/sido")
	public ResponseEntity<Map<String, Object>> getSido() {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<AddressDto> sidoList = service.getSido();			
			if (sidoList != null) {
				resultMap.put("sidoList", sidoList);
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
	
	/* 구군  */
	@GetMapping("/gugun")
	public ResponseEntity<Map<String, Object>> getGugun(@RequestParam("sidoCode") int sidoCode) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<AddressDto> gugunList = service.getGugun(sidoCode);			
			if (gugunList != null) {
				resultMap.put("gugunList", gugunList);
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
	

	/* 동  */
	@GetMapping("/dong")
	public ResponseEntity<Map<String, Object>> getDong(@RequestParam("sidoCode") int sidoCode, @RequestParam("gugunCode") int gugunCode) {
		
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("sidoCode", sidoCode);
		param.put("gugunCode", gugunCode);
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<AddressDto> dongList = service.getDong(param);			
			if (dongList != null) {
				resultMap.put("dongList", dongList);
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

}
	