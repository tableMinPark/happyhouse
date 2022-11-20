package com.happyhouse.api.review.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.review.dto.ReviewDto;

@Mapper
public interface ReviewDao {
	List<ReviewDto> getReviewList(int userId);
	int registReview(ReviewDto reviewDto);
	int deleteReview(int reviewId);
	int modifyReview(ReviewDto reviewDto);
}
