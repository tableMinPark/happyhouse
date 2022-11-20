package com.happyhouse.api.deal.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.deal.dto.CityDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.FileDto;

@Mapper
public interface DealDao {
	List<CityDto> cityList(int code);
	int dealInsert(DealParamDto dto);
	int houseInsert(DealParamDto dto);
	int fileInsert(FileDto fileDto);
}
