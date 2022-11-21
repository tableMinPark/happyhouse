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
	private int houseId;
	private String houseName;
	private String houseBuildYear;
	private String houseSidoCode;
	private String houseSidoName;
	private String houseGugunCode;
	private String houseGugunName;
	private String houseDongCode;
	private String houseDongName;
	private String houseJibun;
	private String houseLat;
	private String houseLng;
	private String code;
	
	public HouseDto(DealParamDto param) {
		this.houseName = param.getHouseName();
		this.houseBuildYear = param.getHouseBuildYear();
		this.houseSidoCode = param.getHouseSidoCode();
		this.houseSidoName = param.getHouseSidoName();
		this.houseGugunCode = param.getHouseGugunCode();
		this.houseGugunName = param.getHouseGugunName();
		this.houseDongCode = param.getHouseDongCode();
		this.houseDongName = param.getHouseDongName();
		this.houseJibun = param.getHouseJibun();
		this.houseLat = param.getHouseLat();
		this.houseLng = param.getHouseLng();
		this.code = param.getHouseCode();
	}
}
