package com.happyhouse.api.notice.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoticeResultDto {
	private int result;
	private NoticeDto dto;
	private List<NoticeDto> list;
	private int count;
}
