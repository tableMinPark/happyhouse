import { apiInstance } from "./index.js";

const api = apiInstance();

async function getBookmarkList(pageId, success, fail) {
  await api.get(`/bookmark/${pageId}`).then(success).catch(fail);
}
async function deleteBookmark(userInfo, success, fail) {
  await api.delete(`/bookmark`, userInfo).then(success).catch(fail);
}
async function registBookmark(userInfo, success, fail) {
  await api.post(`/bookmark`, userInfo).then(success).catch(fail);
}

export { getBookmarkList, deleteBookmark, registBookmark };
