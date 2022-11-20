import { apiInstance } from "./index.js";

const api = apiInstance();

async function getReviewList(pageId, success, fail) {
  await api.get(`/review/${pageId}`).then(success).catch(fail);
}
async function deleteReview(reviewId, success, fail) {
  await api.delete(`/review`, reviewId).then(success).catch(fail);
}
async function registReview(reviewInfo, success, fail) {
  await api.post(`/review`, reviewInfo).then(success).catch(fail);
}
async function modifyReview(reviewInfo, success, fail) {
  await api.put(`/review`, reviewInfo).then(success).catch(fail);
}

export { getReviewList, deleteReview, registReview, modifyReview };
