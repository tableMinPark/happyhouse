package com.happyhouse.api.bookmark.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.bookmark.dto.BookmarkDto;

@Mapper
public interface BookmarkDao {
	int checkBookmark(Map<String, Integer> param);
	List<BookmarkDto> getBookmarkList(int userId);
	int registBookmark(BookmarkDto bookmarkDto);
	int deleteBookmark(BookmarkDto bookmarkDto);
}
