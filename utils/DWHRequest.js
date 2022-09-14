import { BASE_URL, RUAN_URL } from "../config";

export function GyRequest(url, data = {}, method = "post", cb) {
  return new Promise((resolve, reject) => [
    uni.request({
      url: RUAN_URL + url,
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
}
