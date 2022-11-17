package com.happyhouse.api.notice.service;

import com.happyhouse.api.notice.dto.NoticeDto;
import com.happyhouse.api.notice.dto.NoticeParamDto;
import com.happyhouse.api.notice.dto.NoticeResultDto;

public interface NoticeService {
	NoticeResultDto list(NoticeParamDto noticeParamDto);
	NoticeResultDto detail(int noticeId);
	NoticeResultDto insert(NoticeDto noticeDto);
	NoticeResultDto update(int noticeId,NoticeDto noticeDto);
	NoticeResultDto delete(int noticeId);
}
