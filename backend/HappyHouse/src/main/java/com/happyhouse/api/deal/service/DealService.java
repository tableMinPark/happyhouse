package com.happyhouse.api.deal.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
import com.happyhouse.api.deal.dto.HouseDto;
import com.happyhouse.api.review.dto.ReviewResultDto;

public interface DealService {
	public int dealInsert(DealDto dealDto, HouseDto houseDto, MultipartHttpServletRequest request);
	public DealResultDto houseList(String searchWord);
	public DealResultDto dealList(DealParamDto dto);
	public List<String> imgList(int dealId);
	
	public DealDto dealDetail(int dealId);
	public HouseDto houseDetail(int dealId);
	

	// 실거래
	List<HouseDto> searchByAddress(String dongCode);
	List<HouseDto> searchByKeyword(String keyword);
	
	// 거래내역
	List<DealDto> getOldDealList(int houseId);
	List<DealDto> getNowDealList(int houseId);
	List<ReviewResultDto> getReviewList(int houseId);
	
	DealResultDto getMyList(int userId);
}
