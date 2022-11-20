package com.happyhouse.api.deal.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dto.CityDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;

public interface DealService {
	List<CityDto> cityList(int code);
	public DealResultDto dealInsert(DealParamDto dto, MultipartHttpServletRequest request);
	public DealResultDto houseList(String searchWord);
}
