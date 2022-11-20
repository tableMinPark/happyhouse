package com.happyhouse.api.review.service;

import java.util.List;

import com.happyhouse.api.review.dto.ReviewDto;

public interface ReviewService {
	List<ReviewDto> getReviewList(int userId);
	int registReview (ReviewDto reviewDto);
	int deleteReview (int reviewId);
	int modifyReview (ReviewDto reviewDto);
}
