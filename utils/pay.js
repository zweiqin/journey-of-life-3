import { PAY_ORDER } from "../constant";
export const payFn = (res, type, order) => {
    uni.removeStorageSync(PAY_ORDER)
    uni.setStorageSync(PAY_ORDER, {
        type: type || "DEFAULT",
        TF_ORDER_NO: order,
        TL_ORDER_NO: res.orderNo,

    });
    const payData = JSON.parse(res.h5PayUrl);
    const form = document.createElement("form");
    form.setAttribute("action", payData.url);
    form.setAttribute("method", "POST");
    const data = JSON.parse(payData.data);
    let input;
    for (const key in data) {
        input = document.createElement("input");
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}


export const tradeOrderNo = function () {
    const now = new Date()
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    String(month).length < 2 ? (month = Number("0" + month)) : month;
    String(day).length < 2 ? (day = Number("0" + day)) : day;
    String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
    String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
    String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
    const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
    return yyyyMMddHHmmss + Math.random().toString(36).substr(2, 9);
};

export const payOrder = () => {
    // #ifdef H5
    
    // #endif

    // #ifdef APP
    
    // #endif
}