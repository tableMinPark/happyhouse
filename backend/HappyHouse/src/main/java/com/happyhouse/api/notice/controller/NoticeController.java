package com.happyhouse.api.notice.controller;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.happyhouse.api.notice.dto.NoticeDto;
import com.happyhouse.api.notice.dto.NoticeParamDto;
import com.happyhouse.api.notice.dto.NoticeResultDto;
import com.happyhouse.api.notice.service.NoticeService;

@RestController
@CrossOrigin(
		// localhost:5500 과 127.0.0.1 구분
		origins = "http://localhost:5500", // allowCredentials = "true" 일 경우, orogins="*" 는 X
		allowCredentials = "true", 
		allowedHeaders = "*", 
		methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.HEAD,RequestMethod.OPTIONS}
	)
public class NoticeController {
	
	@Autowired
	NoticeService service;
	
	/*중요 목록*/
	@GetMapping("/inotice")
	public ResponseEntity<NoticeResultDto> noticeListImportant(){
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		try {
			noticeResultDto = service.listImportant();
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
	
	/*목록*/
	@GetMapping("/notice")
	public ResponseEntity<NoticeResultDto> noticeList(NoticeParamDto noticeParamDto){
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		System.out.println(noticeParamDto);
		try {
			noticeResultDto = service.list(noticeParamDto);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
	
	/*상세*/
	@GetMapping("/notice/{noticeId}")
	public ResponseEntity<NoticeResultDto> noticeDetail(@PathVariable int noticeId){
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		System.out.println(noticeId);
		try {
			noticeResultDto = service.detail(noticeId);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
	
	/*등록*/
	@PostMapping("/notice")
	public ResponseEntity<NoticeResultDto> noticeInsert(@RequestBody NoticeDto noticeDto){
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		System.out.println(noticeDto);
		try {
			noticeResultDto = service.insert(noticeDto);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
	
	/*수정*/
	@PostMapping("/notice/{noticeId}")
	public ResponseEntity<NoticeResultDto> noticeUpdate(@PathVariable int noticeId,@RequestBody NoticeDto noticeDto){
		System.out.println("call notice update : " + noticeDto); 
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		try {
			noticeResultDto = service.update(noticeDto);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
	
	/*삭제*/
	@DeleteMapping("/notice/{noticeId}")
	public ResponseEntity<NoticeResultDto> noticeDelete(@PathVariable int noticeId){
		NoticeResultDto noticeResultDto = new NoticeResultDto();
		try {
			noticeResultDto = service.delete(noticeId);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<NoticeResultDto>(noticeResultDto, HttpStatus.OK);
	}
}
