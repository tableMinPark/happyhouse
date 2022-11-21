package com.happyhouse.api.common.address.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.common.address.dto.AddressDto;

@Mapper
public interface AddressDao {

	List<AddressDto> getSido();
	List<AddressDto> getGugun(int sidoCode);
	List<AddressDto> getDong(Map<String, Integer> param);
	
}
