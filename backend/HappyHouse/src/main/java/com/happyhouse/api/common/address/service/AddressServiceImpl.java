package com.happyhouse.api.common.address.service;

import java.net.URI;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.happyhouse.api.common.address.dao.AddressDao;
import com.happyhouse.api.common.address.dto.AddressDto;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressDao dao;
	
	@Override
	public List<AddressDto> addressList(int code) {
		return dao.addressList(code);
	}
	
	public String getCoord(String address) {
		
		String ret = null;
	    ResponseEntity<String> res = null;
		RestTemplate rest = new RestTemplate();
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_JSON);
	    
	    //다음지도 API를 사용할 때에는 header에 Authorization이라는 이름으로 서비스키값 전송
	    String appkey = "KakaoAK c346fa2bd0e8d278f8482ee358a7fb57";
	    headers.set("Authorization", appkey);
	    try {
		    HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
		    String encode = URLEncoder.encode(address, "UTF-8"); 
		    String rawURI = "https://dapi.kakao.com/v2/local/search/address.json?query=" + encode; 
		    URI  uri = new URI(rawURI); 
		    res = rest.exchange(uri, HttpMethod.GET, entity, String.class); 
		    ret = res.getBody();		    
	    } catch(Exception e){
	    	return null;
	    }	    
	    return ret;
	}
}
