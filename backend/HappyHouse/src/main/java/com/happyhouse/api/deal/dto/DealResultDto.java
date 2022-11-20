package com.happyhouse.api.deal.dto;

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
public class DealResultDto {
	private int result;
	private DealDto dealDto;
	private HouseDto houseDto;
	private List<DealDto> list;
	private int count;

}
