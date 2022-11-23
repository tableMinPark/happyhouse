package com.happyhouse.api.deal.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.deal.dto.DealChartDto;
import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.FileDto;
import com.happyhouse.api.deal.dto.HouseDto;
import com.happyhouse.api.review.dto.ReviewResultDto;

@Mapper
public interface DealDao {
	int dealInsert(DealDto dealDto);
	int houseInsert(HouseDto houseDto);
	int fileInsert(FileDto fileDto);
	
	List<HouseDto> houseList(String searchWord);
	List<DealParamDto> dealList(DealParamDto dto);
	int dealListCount(DealParamDto dto);
	
	List<String> imgList(int dealId);
	
	DealDto dealDetail(int dealId);
	HouseDto houseDetail(int dealId);
	
	// 실거래
	List<HouseDto> searchByAddress(String dongCode);
	List<HouseDto> searchByKeyword(String keyword);

	// 거래내역
	List<DealDto> getOldDealList(int houseId);
	List<DealDto> getNowDealList(int houseId);
	List<ReviewResultDto> getReviewList(int houseId);
	
	// 내 거래 리스트
	List<DealParamDto> getMyList(DealParamDto dealParamDto);
	
	//거래 수정 관련
	int houseUpdate(HouseDto houseDto);
	int dealUpdate(DealDto dealDto);
	int dealDelete(int dealId);
	List<String> getDeleteFileList(int dealId);
	int deleteFile(int dealId);
	
	
	
	 // 차트 데이터 read
    List<DealChartDto> getChartList(DealDto dealDto);
}
