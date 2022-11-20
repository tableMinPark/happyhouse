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
public class ReviewDto {
	private int reviewId;
	private int userId;
	private int houseId;
	private String reviewContent;
	private LocalDateTime reviewRegDt;
	private int ReviewTraficRating;
	private int ReviewSafefyRating;
	private int ReviewStoreRating;	
}
