package com.happyhouse.api.deal.dto;

import java.time.LocalDateTime;
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
public class FileDto {
	private int fileId;
	private int dealId;
	private String fileName;
	private long fileSize;
	private String fileContentType;
	private String fileUrl;
	private LocalDateTime fileRegDt;
}