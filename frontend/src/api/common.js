import { apiInstance } from "./index.js";

const api = apiInstance();

function addressList(code, success, fail) {
  api.get(`/address/${code}`).then(success).catch(fail);
}

export { addressList };
