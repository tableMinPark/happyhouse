package com.happyhouse.api.deal.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.happyhouse.api.deal.dto.DealDto;
import com.happyhouse.api.deal.dto.DealParamDto;
import com.happyhouse.api.deal.dto.DealResultDto;
import com.happyhouse.api.deal.dto.HouseDto;

public interface DealService {
	public int dealInsert(DealDto dealDto, HouseDto houseDto, MultipartHttpServletRequest request);
	public DealResultDto houseList(String searchWord);
	public DealResultDto dealList(DealParamDto dto);
}
