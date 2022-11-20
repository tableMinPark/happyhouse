package com.happyhouse.api.review.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.review.dto.ReviewDto;
import com.happyhouse.api.review.service.ReviewService;

@RestController
@CrossOrigin(
	origins = "http://localhost:5500",
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)
@RequestMapping("/review")
public class ReviewController {

	public static final Logger logger = LoggerFactory.getLogger(ReviewController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private ReviewService service;

	/* 리뷰 리스트 */
	@GetMapping("/{userId}")
	public ResponseEntity<Map<String, Object>> getReviewList(@PathVariable("userId") int userId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<ReviewDto> reviewList = service.getReviewList(userId);			
			if (reviewList != null) {
				resultMap.put("reviewList", reviewList);
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
	
	/* 리뷰 등록 */
	@PostMapping("")
	public ResponseEntity<Map<String, Object>> registReview(@RequestBody ReviewDto reviewDto) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			int ret = service.registReview(reviewDto);			
			if (ret == 1) {
				resultMap.put("message", SUCCESS);
			} else {
				resultMap.put("message", FAIL);
			}
		} catch (Exception e) {
			logger.error("관심매물 등록 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/* 리뷰 삭제 */
	@DeleteMapping("/")
	public ResponseEntity<Map<String, Object>> deleteReview(@RequestParam(value="reviewId") int reviewId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			int ret = service.deleteReview(reviewId);			
			if (ret == 1) {
				resultMap.put("message", SUCCESS);
			} else {
				resultMap.put("message", FAIL);
			}
		} catch (Exception e) {
			logger.error("관심매물 삭제 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/* 리뷰 수정 */
	@PutMapping("/")
	public ResponseEntity<Map<String, Object>> modifyReview(@RequestBody ReviewDto reviewDto) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			int ret = service.modifyReview(reviewDto);			
			if (ret == 1) {
				resultMap.put("message", SUCCESS);
			} else {
				resultMap.put("message", FAIL);
			}
		} catch (Exception e) {
			logger.error("관심매물 삭제 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
