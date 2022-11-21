package com.happyhouse.api.deal.controller;

import java.net.URI;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dto.CityDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
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

	@Autowired
	DealService service;
	
	/*도시 목록 */
	@GetMapping("/city/{code}")
	public ResponseEntity<List<CityDto>> cityList(@PathVariable int code){
		List<CityDto> res = null;
		try {
			res = service.cityList(code);
			System.out.println(res);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<CityDto>>(res,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<CityDto>>(res,HttpStatus.OK);
	}
	
	@GetMapping("/coord/{city}")
	public ResponseEntity<String> getCoord(@PathVariable String city) {
	    String lat = "";
	    String lng = "";
	    ResponseEntity<String> res = null;
	    RestTemplate rest = new RestTemplate();
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_JSON);
	    
	    //다음지도 API를 사용할 때에는 header에 Authorization이라는 이름으로 서비스키값 전송
	    String appkey = "KakaoAK c346fa2bd0e8d278f8482ee358a7fb57";
	    headers.set("Authorization", appkey);
	    try {
		    HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);
		    String encode = URLEncoder.encode(city, "UTF-8"); 
		    String rawURI = "https://dapi.kakao.com/v2/local/search/address.json?query=" + encode; 
		    URI  uri = new URI(rawURI); 
		    res = rest.exchange(uri, HttpMethod.GET, entity, String.class); 
		    System.out.println(res);
	    }catch(Exception e){
	    	e.printStackTrace();
	    }
	    return res;
	}
	
	@PostMapping(value="/deal")
	public ResponseEntity<DealResultDto> dealInsert(
			DealParamDto dealDto, 
			MultipartHttpServletRequest request) {
		
		System.out.println(dealDto);
		
		DealResultDto boardResultDto = service.dealInsert(dealDto, request);
		
		if( boardResultDto.getResult() == 1 ) {
			return new ResponseEntity<DealResultDto>(boardResultDto, HttpStatus.OK);
		}else {
			return new ResponseEntity<DealResultDto>(boardResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}		 
	}
	
	@GetMapping("/house/{searchWord}")
	public ResponseEntity<DealResultDto> houseList(@PathVariable String searchWord){
		DealResultDto ret = new DealResultDto();
		try {
			ret = service.houseList(searchWord);
			
			return new ResponseEntity<DealResultDto>(ret,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<DealResultDto>(ret,HttpStatus.INTERNAL_SERVER_ERROR);
					
		}
		
	}
}
