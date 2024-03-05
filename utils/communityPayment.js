import {
    createRepairOrderApi,
    getServiceOrderPayApi,
    payOrderForBeeStewadAPPApi
  } from "@/api/community-center";

import store from '@/store'

import { USER_INFO, ENTERPRISE_ORDERS_NO } from '@/constant'

import { getUserId, throttle, isH5InWebview } from '@/utils';


async function createFormSubmission(orderNo) { //! 创建表单前往支付页面
  let res = await getServiceOrderPayApi({
    orderNo: orderNo,
    userId: getUserId(),
  });

  res = JSON.parse(res.data);
  const form = document.createElement("form");
  form.setAttribute("action", res.url);
  form.setAttribute("method", "POST");

  const data1 = JSON.parse(res.data);
  let input;
  for (const key in data1) {
    input = document.createElement("input");
    input.name = key;
    input.value = data1[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}


function spliceQuery(payAppesult) {
    let query = "";
    for (const key in payAppesult.data) {
      query += key + "=" + payAppesult.data[key] + "&";
    }
    return query
}


async function h5WebViewPay(orderNo) {
  wx.miniProgram.navigateTo({
    url:
      "/pages/loading/loading?" +
      query +
      "orderNo=" +
      orderNo +
      "&userId=" +
      getUserId(),
    fail: async () => {
      if (!isH5InWebview()) {
        createFormSubmission(orderNo)
      } else {
        _this.ttoast({
          type: "fail",
          title: error,
        });

        setTimeout(() => {
          uni.switchTab({
            url: "/pages/order/order",
          });
        }, 3000);
      }
    },
  });
}


export async function communityPayment(res) {
  // console.log(1,store);
  const orderNo = res.data;
  uni.setStorageSync(ENTERPRISE_ORDERS_NO, orderNo);
  
  const payAppesult = await payOrderForBeeStewadAPPApi({
    userId: getUserId(),
    orderNo: orderNo,
  });
  let query = "";
  if (payAppesult.statusCode == 20000) {
    query = spliceQuery(payAppesult)
  }else {
    console.error("payOrderForBeeStewadAPPApi请求出错")
    return uni.showToast({
      title: '订单出现错误',
      icon: 'none'
    });
  }

  if(store.state.app.isInMiniProgram || isH5InWebview()) { //! 如果处于移动端的webview
    h5WebViewPay(orderNo)
  }else {
    // #ifdef H5
    createFormSubmission(orderNo)
    // #endif

    // #ifdef APP
      plus.share.getServices(
        function (res) {
          let sweixin = null;
          for (let i in res) {
            if (res[i].id == "weixin") {
              sweixin = res[i];
            }
          }
          console.log(sweixin);
          if (sweixin) {
            sweixin.launchMiniProgram({
              id: "gh_e64a1a89a0ad",
              type: 0,
              path: "pages/orderDetail/orderDetail?" + query,
            });
          }
        },
        function (e) {
          console.log("获取分享服务列表失败：" + e.message);
        }
      );
    // #endif
  }
}