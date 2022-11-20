package com.happyhouse.api.bookmark.dto;

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
public class BookmarkDto {
	private int bookmarkId;
	private int dealId;
	private int houseId;
	private String dealArea;
	private int dealPrice;
	private String houseName;
	private String houseGugunName;
	private String houseDongName;
}