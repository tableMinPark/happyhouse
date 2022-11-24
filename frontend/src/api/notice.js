import api from "./index.js";

async function listImportant(success, fail) {
  await api.get(`/inotice`).then(success).catch(fail);
}
async function listArticle(param, success, fail) {
  await api.get(`/notice`, { params: param }).then(success).catch(fail);
}

async function writeArticle(article, success, fail) {
  await api.post(`/notice`, JSON.stringify(article)).then(success).catch(fail);
}

async function getArticle(articleno, success, fail) {
  await api.get(`/notice/${articleno}`).then(success).catch(fail);
}

async function modifyArticle(article, success, fail) {
  await api.post(`/notice/${article.boardId}`, JSON.stringify(article)).then(success).catch(fail);
}

async function deleteArticle(articleno, success, fail) {
  await api.delete(`/notice/${articleno}`).then(success).catch(fail);
}

export { listImportant, listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
