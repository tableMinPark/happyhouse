package com.happyhouse.api.notice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.notice.dao.NoticeDao;
import com.happyhouse.api.notice.dto.NoticeDto;
import com.happyhouse.api.notice.dto.NoticeParamDto;
import com.happyhouse.api.notice.dto.NoticeResultDto;

@Service
public class NoticeServiceImpl implements NoticeService{

	@Autowired
	NoticeDao dao;
	
	@Override
	public NoticeResultDto list(NoticeParamDto noticeParamDto) {
		NoticeResultDto ret = new NoticeResultDto();
		if(noticeParamDto.getSearchWord().equals("")) {
			List<NoticeDto> res = dao.noticeSelect(noticeParamDto);
			int count = dao.noticeCount();
			
			ret.setList(res);
			ret.setCount(count);
		}else {
			List<NoticeDto> res = dao.noticeSelectSearchWord(noticeParamDto);
			int count = dao.noticeCountSearchWord(noticeParamDto);
			
			ret.setList(res);
			ret.setCount(count);
		}
		return ret;
	}

	@Override
	public NoticeResultDto detail(int noticeId) {
		NoticeResultDto ret = new NoticeResultDto();
		NoticeDto res = dao.noticeDetail(noticeId);
		ret.setDto(res);
		return ret;
	}

	@Override
	public NoticeResultDto insert(NoticeDto noticeDto) {
		NoticeResultDto ret = new NoticeResultDto();
		int res = dao.noticeInsert(noticeDto);
		ret.setResult(res);
		return ret;
	}

	@Override
	public NoticeResultDto update(NoticeDto noticeDto) {
		NoticeResultDto ret = new NoticeResultDto();
		int res = dao.noticeUpdate(noticeDto);
		ret.setResult(res);
		return ret;
	}

	@Override
	public NoticeResultDto delete(int noticeId) {
		NoticeResultDto ret = new NoticeResultDto();
		int res = dao.noticeDelete(noticeId);
		ret.setResult(res);
		return ret;
	}
	
}
