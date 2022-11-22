import api  from "./index.js";

function listImportant(success, fail) {
  api.get(`/inotice`).then(success).catch(fail)
}
function listArticle(param, success, fail) {
  api.get(`/notice`, { params: param }).then(success).catch(fail)
}

function writeArticle(article, success, fail) {
  api.post(`/notice`, JSON.stringify(article)).then(success).catch(fail)
}

function getArticle(articleno, success, fail) {
  api.get(`/notice/${articleno}`).then(success).catch(fail)
}

function modifyArticle(article, success, fail) {
  api.post(`/notice/${article.boardId}`, JSON.stringify(article)).then(success).catch(fail)
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/notice/${articleno}`).then(success).catch(fail)
}

export { listImportant, listArticle, writeArticle, getArticle, modifyArticle, deleteArticle }
