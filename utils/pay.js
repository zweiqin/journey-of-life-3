import { PAY_ORDER } from '../constant';
import { payOrderGoodsApi, payOrderGoodsAPPApi } from '../api/goods';
import store from '../store';

export const payFn = (res, type, order) => {
  uni.removeStorageSync(PAY_ORDER);
  uni.setStorageSync(PAY_ORDER, {
    type: type || 'DEFAULT',
    TF_ORDER_NO: order,
    TL_ORDER_NO: res.orderNo
  });
  const payData = JSON.parse(res.h5PayUrl);
  const form = document.createElement('form');
  form.setAttribute('action', payData.url);
  form.setAttribute('method', 'POST');
  const data = JSON.parse(payData.data);
  let input;
  for (const key in data) {
    input = document.createElement('input');
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const tradeOrderNo = function () {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  String(month).length < 2 ? (month = Number('0' + month)) : month;
  String(day).length < 2 ? (day = Number('0' + day)) : day;
  String(hour).length < 2 ? (hour = Number('0' + hour)) : hour;
  String(minutes).length < 2 ? (minutes = Number('0' + minutes)) : minutes;
  String(seconds).length < 2 ? (seconds = Number('0' + seconds)) : seconds;
  const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
  return yyyyMMddHHmmss + Math.random().toString(36).substr(2, 9);
};

export const payOrderUtil = (orderInfo) => {
  return new Promise(async (resolve, reject) => {
    // if store.state.app.isInMiniProgram || getApp().globalData.isInMiniprogram) {
    if (false) {
      const payAppesult = await payOrderGoodsAPPApi(orderInfo);
      if (payAppesult.errno === 0) {
        let query = '';
        for (const key in payAppesult.data) {
          query += key + '=' + payAppesult.data[key] + '&';
        }
        wx.miniProgram.navigateTo({
          url: '/pages/loading/loading?' + query + 'orderNo=' + lastData.orderSn + '&userId=' + getUserId(),
          fail: () => {
            // uni.redirectTo({
            //   url: '/user/orderForm/order-form?type=1'
            // });
            uni.switchTab({
              url: '/pages/order/order?type=shop&status=1'
            });
          }
        });
      }
    } else {
      // #ifdef H5
      payOrderGoodsApi(orderInfo)
        .then((res) => {
          const payData = JSON.parse(res.data.h5PayUrl);
          const data = JSON.parse(payData.data);
          const form = document.createElement('form');
          form.setAttribute('action', payData.url);
          form.setAttribute('method', 'POST');
          let input;
          for (const key in data) {
            input = document.createElement('input');
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      // #endif

      // #ifdef APP
      //   const payAppesult = await payOrderGoodsAPPApi({
      //     userId: getUserId(),
      //     orderNo: lastData.orderSn,
      //     payType: this.activityId ? 6 : 1,
      //     activityId: this.activityId // 跟活动（爆品）相关的商品
      //   });

      //   if (payAppesult.errno === 0) {
      //     let query = '';
      //     for (const key in payAppesult.data) {
      //       query += key + '=' + payAppesult.data[key] + '&';
      //     }

      //     plus.share.getServices(
      //       function (res) {
      //         let sweixin = null;
      //         for (let i in res) {
      //           if (res[i].id == 'weixin') {
      //             sweixin = res[i];
      //           }
      //         }
      //         console.log(sweixin);
      //         if (sweixin) {
      //           sweixin.launchMiniProgram({
      //             id: 'gh_e64a1a89a0ad',
      //             type: 0,
      //             path: 'pages/orderDetail/orderDetail?' + query
      //           });
      //         }
      //       },
      //       function (e) {
      //         console.log('获取分享服务列表失败：' + e.message);
      //       }
      //     );
      //   }
      // #endif
    }
  });
};
