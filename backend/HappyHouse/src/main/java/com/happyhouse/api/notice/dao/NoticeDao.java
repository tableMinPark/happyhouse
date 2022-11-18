package com.happyhouse.api.notice.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.notice.dto.NoticeDto;
import com.happyhouse.api.notice.dto.NoticeParamDto;

@Mapper
public interface NoticeDao {

	List<NoticeDto> noticeSelect(NoticeParamDto noticeParamDto);
	int noticeCount();
	
	List<NoticeDto> noticeSelectSearchWord(NoticeParamDto noticeParamDto);
	int noticeCountSearchWord(NoticeParamDto noticeParamDto);
	
	NoticeDto noticeDetail(int noticeId);
	int noticeInsert(NoticeDto noticeDto);
	int noticeUpdate(NoticeDto noticeDto);
	int noticeDelete(int noticeId);
}
