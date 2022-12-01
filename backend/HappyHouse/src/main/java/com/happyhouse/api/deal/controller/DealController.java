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
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.happyhouse.api.review.dto.ReviewResultDto;

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
	
	@GetMapping("/deal/change/{dealId}")
	public ResponseEntity<Map<String, Object>> dealChange(@PathVariable int dealId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println(dealId);
				
		try {
			int ret = service.dealChange(dealId);
			
			if( ret == 1 ) {
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);		 
	}
	
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
	
	@PostMapping("/deal/{dealId}")
	public ResponseEntity<Map<String, Object>> dealUpdate(DealParamDto dealParamDto, MultipartHttpServletRequest request) {
		System.out.println(dealParamDto);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		DealDto dealDto = new DealDto(dealParamDto);
		HouseDto houseDto = new HouseDto(dealParamDto);
				
		try {
			int ret = service.dealUpdate(dealParamDto.getDealId(),dealDto, houseDto, request);
			
			if( ret == 1 ) {
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			e.printStackTrace();
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
				
				System.out.println(ret);
				
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
	
	// 주소검색
	@GetMapping("/deal/address/{dongCode}")
	public ResponseEntity<Map<String, Object>> searchByAddress(@PathVariable String dongCode){

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<HouseDto> dealList = service.searchByAddress(dongCode);
			
			if (dealList != null) {
				resultMap.put("houseList", dealList);
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
	
	// 키워드 검색
	@GetMapping("/deal/keyword/{keyword}")	
	public ResponseEntity<Map<String, Object>> searchByKeyword(@PathVariable("keyword") String keyword){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<HouseDto> dealList = service.searchByKeyword(keyword);
			
			if (dealList != null) {
				resultMap.put("houseList", dealList);
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

	// 거래완료 내역
	@GetMapping("/deal/old/{houseId}")	
	public ResponseEntity<Map<String, Object>> getOldDealList(@PathVariable("houseId") int houseId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<DealDto> dealList = service.getOldDealList(houseId);
			
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
	// 거래중인 내역
	@GetMapping("/deal/now/{houseId}")	
	public ResponseEntity<Map<String, Object>> getNowDealList(@PathVariable("houseId") int houseId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<DealDto> dealList = service.getNowDealList(houseId);
			
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
	// 건물에 대한 리뷰
	@GetMapping("/deal/review/{houseId}")	
	public ResponseEntity<Map<String, Object>> getReviewList(@PathVariable("houseId") int houseId){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			List<ReviewResultDto> reviewList = service.getReviewList(houseId);
			
			System.out.println(reviewList);
			
			if (reviewList != null) {
				resultMap.put("reviewList", reviewList);
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
	@GetMapping("/deal/my")	
	public ResponseEntity<Map<String, Object>> getMyList(DealParamDto dealParamDto){
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			DealResultDto myList = service.getMyList(dealParamDto);
			System.out.println(myList);
			if (myList != null) {
				resultMap.put("myList", myList);
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}		
		}	catch(Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	
	
	
	
	
	@GetMapping("/deal/chart")
    public ResponseEntity<Map<String, Object>> getChartList(int houseId){
        
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
                        
        try {
        	Map<String, Object> ret = service.getChartList(houseId);
        	
        	if (ret != null) {        	
                resultMap.put("charterData", ret.get("charterData"));
                resultMap.put("rentData", ret.get("rentData"));
                resultMap.put("dealingData", ret.get("dealingData"));
                resultMap.put("labels", ret.get("labels"));
                resultMap.put("message", SUCCESS);    
            } else {
                resultMap.put("message", FAIL);
            }        
        }    catch(Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
	
	@DeleteMapping("/deal/{dealId}")
	public ResponseEntity<Map<String, Object>> dealDelete(@PathVariable int dealId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println(dealId);
				
		try {
			int ret = service.dealDelete(dealId);
			
			if( ret == 1 ) {
				resultMap.put("message", SUCCESS);	
			} else {
				resultMap.put("message", FAIL);
			}			
			
		}catch(Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);		 
	}

}
