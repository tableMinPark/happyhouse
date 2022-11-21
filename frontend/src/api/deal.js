import { apiInstance } from "./index.js";

const api = apiInstance();

function cityList(code, success, fail) {
  api.get(`/city/${code}`).then(success).catch(fail);
}

function dealList(param, success, fail) {
  api.get(`/deal`, { params: param }).then(success).catch(fail);
}

function houseList(searchWord, success, fail) {
  api.get(`/house/${searchWord}`).then(success).catch(fail);
}

function dealRegist(param, success, fail) {
  api
    .post(`/deal`, param, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function dealDetail(param, success, fail) {
  api.get(`/deal/${param}`).then(success).catch(fail);
}

function dealModify(param, success, fail) {
  api
    .post(`/deal/${param.dealId}`, param, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function dealDelete(param, success, fail) {
  api.delete(`/deal/${param}`).then(success).catch(fail);
}

function convertAddress(city, success, fail) {
  api.get(`/coord/${city}`).then(success).catch(fail);
}

export {
  cityList,
  dealList,
  dealRegist,
  dealDetail,
  dealModify,
  dealDelete,
  houseList,
  convertAddress,
};
