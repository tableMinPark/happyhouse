import api from "./index.js";

// 주소 (시군동)
async function addressList(code, success, fail) {
  await api.get(`/address/${code}`).then(success).catch(fail);
}

// 그룹코드로 공통코드이름
async function getCodeByGroupCode(groupCode, success, fail) {
  await api.get(`/code/${groupCode}`).then(success).catch(fail);
}

export { addressList, getCodeByGroupCode };
