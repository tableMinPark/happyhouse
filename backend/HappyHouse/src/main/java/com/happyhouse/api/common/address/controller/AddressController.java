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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	
	/*도시 목록 */
	@GetMapping("/{code}")
	public ResponseEntity<Map<String, Object>> cityList(@PathVariable int code){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<AddressDto> addressList = service.addressList(code);
			
			if (addressList != null) {
				resultMap.put("addressList", addressList);
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
	
	@GetMapping("/coord/{address}")
	public ResponseEntity<Map<String, Object>> getCoord(@PathVariable String address) {
				
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			String addressInfo = service.getCoord(address);
			
			if (addressInfo != null) {
				resultMap.put("addressInfo", addressInfo);
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
	