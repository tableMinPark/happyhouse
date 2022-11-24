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
	private BookmarkDao dao;
	
	@Override
	public List<BookmarkDto> getBookmarkList(int userId) {
		return dao.getBookmarkList(userId);
	}

	@Override
	public int registBookmark(BookmarkDto bookmarkDto) {
		return dao.registBookmark(bookmarkDto);
	}

	@Override
	public int deleteBookmark(BookmarkDto bookmarkDto) {
		return dao.deleteBookmark(bookmarkDto);
	}

	@Override
	public int checkBookmark(Map<String, Integer> param) {
		return dao.checkBookmark(param);
	}

}
