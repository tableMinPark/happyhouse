import api from "./index.js";

// 북마크 리스트
async function getBookmarkList(pageId, success, fail) {
  await api.get(`/bookmark/${pageId}`).then(success).catch(fail);
}

// 북마크 삭제
async function deleteBookmark(params, success, fail) {
  await api
    .delete(`/bookmark?userId=${params.userId}&dealId=${params.dealId}`)
    .then(success)
    .catch(fail);
}

// 북마크 등록
async function registBookmark(params, success, fail) {
  await api.post(`/bookmark`, params).then(success).catch(fail);
}

export { getBookmarkList, deleteBookmark, registBookmark };
