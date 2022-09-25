import { BASE_URL, RUAN_URL, LANG_FEE_URL } from "../config";

const request = (base_url) => {
  return function (url, data = {}, method = "post", cb) {
    return new Promise((resolve, reject) => [
      uni.request({
        url: base_url + url,
        data,
        method,
        success: (res) => {
          resolve(res.data);
        },
        fail: (error) => {
          reject(error);
        },

        complete: () => {
          cb && typeof cb === "function" && cb();
        },
      }),
    ]);
  };
};

export const GyRequest = request(BASE_URL);
export const RuanRequest = request(RUAN_URL);
export const LTRequest = request(LANG_FEE_URL)
