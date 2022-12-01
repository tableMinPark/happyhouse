package com.happyhouse.api.common.code.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.common.code.dao.CodeDao;
import com.happyhouse.api.common.code.dto.CodeDto;

@Service
public class CodeServiceImpl implements CodeService {

	@Autowired
	CodeDao dao;
	
	@Override
	public List<CodeDto> getCodeListByGroupCode(String groupCode) {
		return dao.getCodeListByGroupCode(groupCode);
	}

}
