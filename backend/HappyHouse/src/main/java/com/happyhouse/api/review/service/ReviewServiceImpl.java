package com.happyhouse.api.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.review.dao.ReviewDao;
import com.happyhouse.api.review.dto.ReviewDto;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	ReviewDao dao;
	
	@Override
	public List<ReviewDto> getReviewList(int userId) {
		return dao.getReviewList(userId);
	}

	@Override
	public int registReview(ReviewDto reviewDto) {
		return dao.registReview(reviewDto);
	}

	@Override
	public int deleteReview(int reviewId) {
		return deleteReview(reviewId);
	}
	
	@Override
	public int modifyReview(ReviewDto reviewDto) {
		return modifyReview(reviewDto);
	}

}
