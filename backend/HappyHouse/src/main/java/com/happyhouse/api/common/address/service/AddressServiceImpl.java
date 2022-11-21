package com.happyhouse.api.common.address.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.common.address.dao.AddressDao;
import com.happyhouse.api.common.address.dto.AddressDto;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressDao dao;
	
	@Override
	public List<AddressDto> getSido() {
		return dao.getSido();
	}

	@Override
	public List<AddressDto> getGugun(int sidoCode) {
		return dao.getGugun(sidoCode);
	}

	@Override
	public List<AddressDto> getDong(Map<String, Integer> param) {
		return dao.getDong(param);
	}

}
