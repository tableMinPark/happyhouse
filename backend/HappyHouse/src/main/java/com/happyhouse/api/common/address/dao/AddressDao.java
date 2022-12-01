package com.happyhouse.api.common.address.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.common.address.dto.AddressDto;

@Mapper
public interface AddressDao {

	List<AddressDto> addressList(int code);
}
