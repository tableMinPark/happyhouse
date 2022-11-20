import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(userInfo, success, fail) {
  await api.post(`/user/login`, userInfo).then(success).catch(fail);
}

async function userRegister(user, success, fail) {
  await api.post(`/user/register`, user).then(success).catch(fail);
}

async function userModify(user, success, fail) {
  await api.post(`/user/modify`, user).then(success).catch(fail);
}

async function emailCheck(userEmail, success, fail) {
  await api.get(`/user/email/${userEmail}`).then(success).catch(fail);
}

async function getUserInfo(userId, success, fail) {
  // 헤더에 access token 실어보냄
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/${userId}`).then(success).catch(fail);
}

async function getPageUserInfo(userId, success, fail) {
  await api.get(`/follow/${userId}`).then(success).catch(fail);
}

async function getFollowUserList(userId, success, fail) {
  await api.get(`/follow/list/${userId}`).then(success).catch(fail);
}

async function followingCheck(params, success, fail) {
  await api.post(`/follow/check`, null, { params } ).then(success).catch(fail);
}

async function follow(params, success, fail) {
  await api.post(`/follow/register`, null, { params } ).then(success).catch(fail);
}

async function unFollow(params, success, fail) {
  await api.post(`/follow/unRegister`, null, { params } ).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  // 헤더에 refresh token 실어보냄
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function forgetPassword(user, success, fail) {
  await api.post(`/user/forgetPassword`, user).then(success).catch(fail);
}

async function emailAUth(authCode, success, fail) {
  await api.get(`/user/email_auth/${authCode}`).then(success).catch(fail);
}


export { login, userRegister, emailAUth, userModify, emailCheck, getUserInfo, getPageUserInfo, getFollowUserList, 
  followingCheck, follow, unFollow, tokenRegeneration, logout, forgetPassword };
