import api  from "./index.js";

async function getBookmarkList(pageId, success, fail) {
  await api.get(`/bookmark/${pageId}`).then(success).catch(fail);
}
async function deleteBookmark(bookmarkId, success, fail) {
  await api.delete(`/bookmark/${bookmarkId}`).then(success).catch(fail);
}
async function registBookmark(params, success, fail) {
  await api.post(`/bookmark`, null, { params }).then(success).catch(fail);
}

export { getBookmarkList, deleteBookmark, registBookmark };
