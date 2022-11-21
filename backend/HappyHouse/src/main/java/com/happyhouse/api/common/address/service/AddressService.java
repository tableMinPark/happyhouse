package com.happyhouse.api.common.address.service;

import java.util.List;
import java.util.Map;

import com.happyhouse.api.common.address.dto.AddressDto;

public interface AddressService {
	
	List<AddressDto> getSido();
	List<AddressDto> getGugun(int sidoCode);
	List<AddressDto> getDong(Map<String, Integer> param);
	
}
