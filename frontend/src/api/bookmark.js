import api from "./index.js";

async function getBookmarkList(pageId, success, fail) {
  await api.get(`/bookmark/${pageId}`).then(success).catch(fail);
}
async function deleteBookmark(params, success, fail) {
  console.log(params);
  await api
    .delete(`/bookmark?userId=${params.userId}&dealId=${params.dealId}`)
    .then(success)
    .catch(fail);
}
async function registBookmark(params, success, fail) {
  console.log(params);
  await api.post(`/bookmark`, params).then(success).catch(fail);
}

export { getBookmarkList, deleteBookmark, registBookmark };
