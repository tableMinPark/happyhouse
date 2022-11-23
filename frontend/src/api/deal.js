import api from "./index.js"

function dealList(param, success, fail) {
  api.get(`/deal`, { params: param }).then(success).catch(fail)
}

function dealRegist(param, success, fail) {
  api
    .post(`/deal`, param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail)
}

function dealDetail(param, success, fail) {
  api.get(`/deal/${param}`).then(success).catch(fail)
}

function dealModify(dealId, param, success, fail) {
  api
    .post(`/deal/${dealId}`, param, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    })
    .then(success)
    .catch(fail)
}

function dealDelete(param, success, fail) {
  api.delete(`/deal/${param}`).then(success).catch(fail)
}

function convertAddress(address, success, fail) {
  api.get(`/address/coord/${address}`).then(success).catch(fail)
}

// 키워드 기준 검색
function searchByKeyword(searchWord, success, fail) {
  api.get(`/deal/keyword/${searchWord}`).then(success).catch(fail)
}

// 주소 기준 검색
function searchByAddress(address, success, fail) {
  api.get(`/deal/address/${address}`).then(success).catch(fail)
}

// 거래완료 목록
function getOldDealList(houseId, success, fail) {
  api.get(`/deal/old/${houseId}`).then(success).catch(fail)
}

// 거래중인 목록
function getNowDealList(houseId, success, fail) {
  api.get(`/deal/now/${houseId}`).then(success).catch(fail)
}

// 나의 거래 목록
function getMyDealList(userId, success, fail) {
  api.get(`/deal/my/${userId}`).then(success).catch(fail)
}

// 리뷰 리스트
function getReviewList(houseId, success, fail) {
  api.get(`/deal/review/${houseId}`).then(success).catch(fail)
}

// 이미지 리스트
function getImgList(dealId, success, fail) {
  api.get(`/dealImg/${dealId}`).then(success).catch(fail)
}

export {
  dealList,
  dealRegist,
  dealDetail,
  dealModify,
  dealDelete,
  searchByKeyword,
  searchByAddress,
  convertAddress,
  getOldDealList,
  getNowDealList,
  getReviewList,
  getImgList,
  getMyDealList,
}
