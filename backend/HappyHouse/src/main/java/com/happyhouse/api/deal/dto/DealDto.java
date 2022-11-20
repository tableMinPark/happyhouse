package com.happyhouse.api.deal.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
public class DealDto {
	private int userId;
	private int houseId;
	private int dealPrice;
	private LocalDateTime dealDate;
	private int dealFloor;
	private String dealArea;
	private String code;
	private int dealComplete;
}

