package com.happyhouse.api.deal.dto;

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
public class HouseDto {
	private String houseName;
	private String houseBuildYear;
	private String houseDongCode;
	private String houseDongName;
	private String houseJibun;
	private String houseLat;
	private String houseLng;
	private String houseGugunCode;
	private String houseGugunName;
	private String code;
}
