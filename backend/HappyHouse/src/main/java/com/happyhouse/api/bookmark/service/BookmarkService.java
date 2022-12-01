package com.happyhouse.api.bookmark.service;

import java.util.List;
import java.util.Map;

import com.happyhouse.api.bookmark.dto.BookmarkDto;

public interface BookmarkService {
	int checkBookmark(Map<String, Integer> param);
	List<BookmarkDto> getBookmarkList(int userId);
	int registBookmark(BookmarkDto bookmarkDto);
	int deleteBookmark(BookmarkDto bookmarkDto);
}
