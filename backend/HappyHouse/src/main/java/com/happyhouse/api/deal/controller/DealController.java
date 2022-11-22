package com.happyhouse.api.deal.controller;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
import com.happyhouse.api.deal.dto.HouseDto;
import com.happyhouse.api.deal.service.DealService;

@RestController
@CrossOrigin(
	// localhost:5500 과 127.0.0.1 구분
	origins = "http://localhost:5500", // allowCredentials = "true" 일 경우, orogins="*" 는 X
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)
public class DealController {
	public static final Logger logger = LoggerFactory.getLogger(DealController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	DealService service;
	
	@PostMapping("/deal")
	public ResponseEntity<Map<String, Object>> dealInsert(DealParamDto dealParamDto, MultipartHttpServletRequest request) {
				
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		DealDto dealDto = new DealDto(dealParamDto);
		HouseDto houseDto = new HouseDto(dealParamDto);
				
		try {
			int ret = service.dealInsert(dealDto, houseDto, request);
			
			if( ret == 1 ) {
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);		 
	}
	
	@GetMapping("/deal")
	public ResponseEntity<Map<String, Object>> dealList(DealParamDto dto){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			DealResultDto dealList = service.dealList(dto);
			
			if (dealList != null) {
				resultMap.put("dealList", dealList);
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}		
		}	catch(Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@GetMapping("/deal/{dealId}")
	public ResponseEntity<Map<String, Object>> dealDetail(@PathVariable int dealId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		DealResultDto ret = new DealResultDto();
		
		try {
			DealDto dealDetail = service.dealDetail(dealId);
			HouseDto houseDetail = service.houseDetail(dealId);
			
			if (dealDetail != null) {
				ret.setDealDto(dealDetail);
				ret.setHouseDto(houseDetail);
				
				resultMap.put("dealList", ret);
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}		
		}	catch(Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@GetMapping("/house/{searchWord}")
	public ResponseEntity<Map<String, Object>> houseList(@PathVariable String searchWord){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			DealResultDto houseList = service.houseList(searchWord);
			
			if( houseList != null) {
				resultMap.put("houseList", houseList);
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);				
	}
	
	@GetMapping("/dealImg/{dealId}")
	public ResponseEntity<Map<String, Object>> imgList(@PathVariable int dealId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<String> imgList = service.imgList(dealId);
			
			if( imgList != null) {
				resultMap.put("imgList", imgList);
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);				
	}
	
}
