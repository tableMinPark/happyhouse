package com.happyhouse.api.notice.dto;

import java.time.LocalDateTime;

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
public class NoticeDto {
	private int boardId;
	private int userId;
	private String userName;
	private String boardTitle;
	private String boardContent;
	private LocalDateTime boardRegDt;
	private int readCount;
	private boolean important;
	private boolean sameUser;
}
