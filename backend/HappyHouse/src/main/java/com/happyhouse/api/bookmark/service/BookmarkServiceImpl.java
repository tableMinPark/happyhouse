package com.happyhouse.api.bookmark.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyhouse.api.bookmark.dao.BookmarkDao;
import com.happyhouse.api.bookmark.dto.BookmarkDto;

@Service
public class BookmarkServiceImpl implements BookmarkService {

	@Autowired
	BookmarkDao dao;
	
	@Override
	public List<BookmarkDto> getBookmarkList(int userId) {
		return dao.getBookmarkList(userId);
	}

	@Override
	public int registBookmark(Map<String, Integer> param) {
		return dao.registBookmark(param);
	}

	@Override
	public int deleteBookmark(int bookmarkId) {
		return deleteBookmark(bookmarkId);
	}

}
