package com.happyhouse.api.review.dto;

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
public class ReviewResultDto {
	private int reviewId;
	private int userId;
	private String userName;
	private String userProfileImageUrl;
	private LocalDateTime userRegDt;
	
	private int houseId;
	private String houseName;
	private String houseSidoName;
	private String houseGugunName;
	private String houseDongName;
	private String reviewContent;
	private LocalDateTime reviewRegDt;
	private int reviewTraficRating;
	private int reviewSafetyRating;
	private int reviewStoreRating;	
}
