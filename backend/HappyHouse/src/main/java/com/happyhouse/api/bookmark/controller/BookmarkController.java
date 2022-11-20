package com.happyhouse.api.bookmark.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.bookmark.dto.BookmarkDto;
import com.happyhouse.api.bookmark.service.BookmarkService;

@RestController
@CrossOrigin(
	origins = "http://localhost:5500",
	allowCredentials = "true", 
	allowedHeaders = "*", 
	methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
)
@RequestMapping("/bookmark")
public class BookmarkController {

	public static final Logger logger = LoggerFactory.getLogger(BookmarkController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private BookmarkService service;

	/* 관심매물 리스트 */
	@GetMapping("/{userId}")
	public ResponseEntity<Map<String, Object>> getBookmarkList(@PathVariable("userId") int userId) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			List<BookmarkDto> bookmarkList = service.getBookmarkList(userId);			
			if (bookmarkList != null) {
				resultMap.put("bookmarkList", bookmarkList);
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
	
	/* 관심매물 등록 */
	@PostMapping("")
	public ResponseEntity<Map<String, Object>> registBookmark(@RequestParam(value="userId") int userId, @RequestParam(value="dealId") int dealId) {
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("userId", userId);
		param.put("dealId", dealId);
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			int ret = service.registBookmark(param);			
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
	
	/* 관심매물 삭제 */
	@DeleteMapping("{bookmarkId}")
	public ResponseEntity<Map<String, Object>> deleteBookmark(@PathVariable(value="bookmarkId") int bookmarkId) {
				
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			int ret = service.deleteBookmark(bookmarkId);
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
