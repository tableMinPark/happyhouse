package com.happyhouse.api.common.code.dto;

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
public class CodeDto {
	private String code;
	private String codeName;
	private String groupCode;
	private String groupCodeName;	
}
