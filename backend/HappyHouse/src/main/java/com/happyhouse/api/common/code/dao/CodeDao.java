package com.happyhouse.api.common.code.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.common.code.dto.CodeDto;

@Mapper
public interface CodeDao {
	
	List<CodeDto> getCodeListByGroupCode(String groupCode);
	
}
