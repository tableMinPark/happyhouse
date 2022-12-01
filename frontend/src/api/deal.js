import api from "./index.js";

async function dealList(param, success, fail) {
  await api.get(`/deal`, { params: param }).then(success).catch(fail);
}
async function dealChange(param, success, fail) {
  await api.get(`/deal/change/${param}`).then(success).catch(fail);
}

async function dealRegist(param, success, fail) {
  await api
    .post(`/deal`, param, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

async function dealDetail(param, success, fail) {
  await api.get(`/deal/${param}`).then(success).catch(fail);
}

async function dealModify(dealId, param, success, fail) {
  await api
    .post(`/deal/${dealId}`, param, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

async function dealDelete(param, success, fail) {
  await api.delete(`/deal/${param}`).then(success).catch(fail);
}

async function convertAddress(address, success, fail) {
  await api.get(`/address/coord/${address}`).then(success).catch(fail);
}

// 키워드 기준 검색
async function searchByKeyword(searchWord, success, fail) {
  await api.get(`/deal/keyword/${searchWord}`).then(success).catch(fail);
}

// 주소 기준 검색
async function searchByAddress(address, success, fail) {
  await api.get(`/deal/address/${address}`).then(success).catch(fail);
}

// 거래완료 목록
async function getOldDealList(houseId, success, fail) {
  await api.get(`/deal/old/${houseId}`).then(success).catch(fail);
}

// 거래중인 목록
async function getNowDealList(houseId, success, fail) {
  await api.get(`/deal/now/${houseId}`).then(success).catch(fail);
}

// 리뷰 리스트
async function getReviewList(houseId, success, fail) {
  await api.get(`/deal/review/${houseId}`).then(success).catch(fail);
}

// 차트 데이터 목록 (전 / 월 / 매)
async function getChartList(param, success, fail) {
  await api
    .get(`/deal/chart?code=${param.code}&houseId=${param.houseId}`)
    .then(success)
    .catch(fail);
}

// 나의 거래 목록
async function getMyDealList(param, success, fail) {
  await api.get(`/deal/my`, { params: param }).then(success).catch(fail);
}

// 이미지 리스트
async function getImgList(dealId, success, fail) {
  await api.get(`/dealImg/${dealId}`).then(success).catch(fail);
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
  getChartList,
  dealChange,
};
