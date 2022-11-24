import api from "./index.js";

async function addressList(code, success, fail) {
  await api.get(`/address/${code}`).then(success).catch(fail);
}

async function getCodeByGroupCode(groupCode, success, fail) {
  await api.get(`/code/${groupCode}`).then(success).catch(fail);
}

export { addressList, getCodeByGroupCode };
