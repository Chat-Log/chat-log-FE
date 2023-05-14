import { instance, baseURL } from "./apiConfig";

export const api = {
  // 회원가입/로그인 페이지
  postLoginApi: (loginInfo) => instance.post(`users/login/email`, loginInfo),
  postSignUpApi: (signUpInfo) => instance.post(`users/sign-up/email`, signUpInfo),

  // email/pwd 찾기
  getEmailApi: (phoneNum) => instance.get(`users/email`, { params: phoneNum }),
  patchPwdApi: (userInfo) => instance.patch(`users/password/reset`, userInfo),
  patchResetPwdApi: (pwd) => baseURL.patch(`users/password/`, pwd),

  // 메인 페이지
  patchGptKeyApi: (apiKey) => baseURL.patch(`users/gpt-key`, apiKey),
  postCompletionApi: (completion) => baseURL.post(`topics/completion`, completion),
  getTopicApi: (topicId) => baseURL.get(`topics/${topicId}`),
  getModelApi: () => baseURL.get(`models`),

  // 메뉴
  getTopicsApi: (pageInfo) => baseURL.get(`topics/recent`, { params: pageInfo }),

  // 검색 페이지
  getSearchApi: (searchInfo) => baseURL.get(`topics/completions`, { params: searchInfo }),

  // 마이페이지 잔디
  getDailyCompletionCountsApi: (year) => baseURL.get(`completions/counts/${year}`),

  // 태그 페이지
  getTagApi: (tag) => baseURL.get(`topics/tags`),
};
