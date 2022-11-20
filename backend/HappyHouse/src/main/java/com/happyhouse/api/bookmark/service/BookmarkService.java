package com.happyhouse.api.bookmark.service;

import java.util.List;
import java.util.Map;

import com.happyhouse.api.bookmark.dto.BookmarkDto;

public interface BookmarkService {
	List<BookmarkDto> getBookmarkList(int userId);
	int registBookmark(Map<String, Integer> param);
	int deleteBookmark(int bookmarkId);
}
