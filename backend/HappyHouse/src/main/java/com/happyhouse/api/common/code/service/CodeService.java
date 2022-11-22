package com.happyhouse.api.common.code.service;

import java.util.List;

import com.happyhouse.api.common.code.dto.CodeDto;

public interface CodeService {
	
	List<CodeDto> getCodeListByGroupCode(String groupCode);	
	
}
