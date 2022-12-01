package com.happyhouse.api.common.code.controller;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.common.code.dto.CodeDto;
import com.happyhouse.api.common.code.service.CodeService;

@RestController
@CrossOrigin(
	// localhost:5500 과 127.0.0.1 구분
	origins = "http://localhost:5500", // allowCredentials = "true" 일 경우, orogins="*" 는 X
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)
public class CodeController {
	public static final Logger logger = LoggerFactory.getLogger(CodeController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	CodeService service;
	
	@GetMapping("/code/{groupCode}")
	public ResponseEntity<Map<String, Object>> getCodeListByGroupCode(@PathVariable("groupCode") String groupCode){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
						
		try {
			List<CodeDto> codeList = service.getCodeListByGroupCode(groupCode);
			
			if( codeList != null ) {
				resultMap.put("codeList", codeList);
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
