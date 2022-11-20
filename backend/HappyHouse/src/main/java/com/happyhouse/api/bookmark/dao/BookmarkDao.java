package com.happyhouse.api.bookmark.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.happyhouse.api.bookmark.dto.BookmarkDto;

@Mapper
public interface BookmarkDao {
	List<BookmarkDto> getBookmarkList(int userId);
	int registBookmark(Map<String, Integer> param);
	int deleteBookmark(int bookmarkId);
}
