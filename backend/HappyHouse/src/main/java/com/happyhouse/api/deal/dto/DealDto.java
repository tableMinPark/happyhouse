package com.happyhouse.api.deal.dto;

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
public class DealDto {
	private int dealId;
	private int houseId;
	private int dealPrice;
	private int dealDeposit;
	private LocalDateTime dealDate;
	private int dealFloor;
	private String dealArea;
	private String code;
	private boolean dealComplete;
	private String dealContent;
	private int userId;
	
	public DealDto(DealParamDto param) {
		this.houseId = param.getHouseId();
		this.dealPrice = param.getDealPrice();
		this.dealDeposit = param.getDealDeposit();
		this.dealFloor = param.getDealFloor();
		this.dealArea = param.getDealArea();
		this.code = param.getCode();
		this.dealContent = param.getDealContent();
		this.userId = param.getUserId();
	}
}

