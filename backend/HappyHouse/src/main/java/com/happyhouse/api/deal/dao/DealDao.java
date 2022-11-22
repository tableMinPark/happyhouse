package com.happyhouse.api.deal.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.FileDto;
import com.happyhouse.api.deal.dto.HouseDto;

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
}
