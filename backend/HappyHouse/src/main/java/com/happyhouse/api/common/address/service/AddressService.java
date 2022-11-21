package com.happyhouse.api.common.address.service;

import java.util.List;

import com.happyhouse.api.common.address.dto.AddressDto;


public interface AddressService {
	
	List<AddressDto> addressList(int code);
	String getCoord(String address);
	
}
