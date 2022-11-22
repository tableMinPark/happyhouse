import api  from "./index.js";

function addressList(code, success, fail) {
  api.get(`/address/${code}`).then(success).catch(fail);
}

function getCodeByGroupCode(groupCode, success, fail) {
  api.get(`/code/${groupCode}`).then(success).catch(fail);
}

export { addressList, getCodeByGroupCode };
