package com.happyhouse.api.deal.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// for boardList, boardDetail
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DealParamDto {
	
	private int userId;
	
	private int dealPrice;
	private LocalDateTime dealDate;
	private int dealFloor;
	private String dealArea;
	private int dealComplete;
	private String houseName;
	private String houseBuildYear;
	private String houseDongCode;
	private String houseDongName;
	private String houseJibun;
	private String houseLat;
	private String houseLng;
	private String houseGugunCode;
	private String houseGugunName;
	private String houseSidoCode;
	private String houseSidoName;
	private String code;
	private String fileUrl;
	
	private int houseId;
	private int dealId;
	
	
	private int limit;
	private int offset;
	private String searchType;
	private String searchWord;
	
}
