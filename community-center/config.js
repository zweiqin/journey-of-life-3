import { getGoodsConfigApi } from "../api/community-center";

export const orderDetail = () => {
  return [
    {
      label: "佛山",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ejf2oiy8556quld6a0t6.png",
      value: 0,
    },
    {
      label: "上门时间",
      icon: require("../static/images/store/time.png"),
      value: 1,
    },
  ];
};

export const getConfirmConfig = () => {
  return [
    {
      label: "佛山",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ejf2oiy8556quld6a0t6.png",
      id: 0,
    },
    {
      label: "上门时间",
      icon: require("../static/images/store/time.png"),
      id: 1,
    },
    {
      label: "备注",
      icon: require("../static/images/store/remarks.png"),
      id: 2,
    },
  ];
};

export const getConfirmOther = () => {
  return [
    {
      label: "优惠",
      icon: require("../static/images/store/youhui.png"),
      id: 0,
      style: {
        background: "#fff",
        borderRadius: "5px",
        padding: "13px 13px",
        margin: "10px 0",
      },
    },
    {
      label: "其他服务明细",
      icon: require("../static/images/store/other.png"),
      id: 1,
      style: {
        background: "#fff",
        borderRadius: "5px",
        padding: "13px 13px",
      },
    },
  ];
};

export const deliveryInfo = [
  {
    label: "提货人姓名",
    field: "deliveryName",
    placeholder: "请输入提货人姓名",
    require: true,
  },
  {
    label: "联系电话",
    field: "deliveryMobile",
    placeholder: "请输入提货人电话",
    require: true,
  },
  {
    label: "提货地址",
    field: "deliveryAddress",
    placeholder: "请输入提货地址",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4l5sqnpkoal0fts1fyay.png",
    require: true,
    width: 8,
    height: 13,
    select: true,
  },
  {
    field: "deliveryAddressDetaile",
    placeholder: "请输入详细地址",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ejf2oiy8556quld6a0t6.png",
    require: true,
    width: 14,
    height: 17,
  },
];

export const consigneeInfo = [
  {
    label: "姓名",
    field: "consigneeName",
    placeholder: "请输入收货人姓名",
    require: true,
  },
  {
    label: "联系电话",
    field: "consigneeMobile",
    placeholder: "请输入收货人电话",
    require: true,
  },
  {
    label: "收获地址",
    field: "consigneeAddress",
    placeholder: "请输入收货地址",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4l5sqnpkoal0fts1fyay.png",
    require: true,
    width: 8,
    height: 13,
    select: true,
  },
  {
    field: "consigneeAddressDetail",
    placeholder: "请输入详细地址",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ejf2oiy8556quld6a0t6.png",
    require: true,
    width: 14,
    height: 17,
  },
  {
    field: "isElevator",
    label: "有无电梯",
    placeholder: "有无电梯",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4l5sqnpkoal0fts1fyay.png",
    width: 8,
    height: 13,
    select: true,
  },
  {
    field: "floor",
    label: "居住楼层",
    placeholder: "请输入居住楼层",
    icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4l5sqnpkoal0fts1fyay.png",
    width: 8,
    height: 13,
  },
];

export const goodsPanelInfo = [
  {
    label: "商品类别",
    field: "goodsType",
    placeholder: "请选择商品类别",
    require: true,
  },
  {
    label: "品名",
    field: "categoryName",
    placeholder: "请输入商品品名",
    require: true,
  },
  {
    label: "套数",
    field: "commodityNumber",
    placeholder: "请输入套数",
  },
  {
    label: "件数",
    field: "quantity",
    placeholder: "请输入件数",
  },
  {
    label: "体积",
    field: "volume",
    placeholder: "请输入体积",
  },
  {
    label: "重量",
    field: "weight",
    placeholder: "请输入重量",
  },
  // {
  // 	label: '规格',
  // 	field: 'specifications',
  // 	placeholder: '请输入规格'
  // },
  {
    label: "商品图片",
    field: "goodsUrl",
    placeholder: "（最多上传三张）",
    select: true,
  },
];

// export const getGoodItem = () => {
// 	return ({
// 		consigneeName: "",
// 		consigneeMobile: "",
// 		consigneeAddress: "",
// 		consigneeAddressDetaile: "",
// 		isElevator: "有",
// 		floor: "",
// 	})
// }

export const getGoodItem = () => {
  return {
    goodsHostType: "家具",
    goodsType: "",
    categoryName: "",
    commodityNumber: 1,
    quantity: 1,
    volume: 0,
    weight: 0,
    // specifications: '',
    goodsUrl: [],
  };
};

export const deliveryTypeList = ["送货到楼下", "送货到家", "送货安装"];

export const mapDeliveryTypeFilter = (type) => {
  type = type + "";
  return {
    0: "送货到楼下",
    1: "送货到家",
    2: "送货安装",
  }[type];
};

// TODO 检查一下作用
export const mapBackRoute = (tag) => {
  const routes = {
    CONSIGNEE_: "/community-center/delivery-install",
    REPAIR_: "/community-center/repair",
  };

  return routes[tag];
};

export const orderStatusList = () => {
  return [
    {
      label: "全部",
      value: undefined,
    },
    {
      label: "待报价",
      value: 2,
    },
    {
      label: "待支付",
      value: 0,
    },
    {
      label: "待接单",
      value: 1,
    },
    {
      label: "待分配",
      value: 3,
    },
    {
      label: "已分配",
      value: 4,
    },
    {
      label: "配送中",
      value: 5,
    },
    {
      label: "已完成",
      value: 6,
    },
    {
      label: "已取消",
      value: 7,
    },
    {
      label: "其他(异常)",
      value: 8,
    },
  ];
};

export const mapStatus = (status) => {
  const orderStatus = orderStatusList();
  const item = orderStatus.find((item) => {
    return item.value === status;
  });
  return item.label;
};

export const receiveBase64Source =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAA5CAYAAACfz8NxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTEwLTEwVDEwOjIxOjUwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTEwLTEwVDEwOjIxOjUwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0xMC0xMFQxMDoyMTo1MCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmMGU0YWZkYy0wMDUzLTBiNDctYjY2MS1kYjVhMTE5ZWNhZDciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5YjhmMmFjMi1iOGYwLTM2NGItOGI5MS05MjY3YTc3YmIwMjkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNjU1Njc2Yi0yNzU1LTU0NGMtODI0Ny01YzNmMzAzYTBkMTgiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE2NTU2NzZiLTI3NTUtNTQ0Yy04MjQ3LTVjM2YzMDNhMGQxOCIgc3RFdnQ6d2hlbj0iMjAyMC0xMC0xMFQxMDoyMTo1MCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmMGU0YWZkYy0wMDUzLTBiNDctYjY2MS1kYjVhMTE5ZWNhZDciIHN0RXZ0OndoZW49IjIwMjAtMTAtMTBUMTA6MjE6NTArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz450VkyAAAHrklEQVRogc2ae1BU1x3HPyy4MAhoxSqI6GQVfIH4AKUIZqLiAyKgSBCscYh2xEYyyYBJGpKRapNoUh+tiZqYkrY+UEdbHoZWCxFbqAwajEAFibkYRQEhNQHEIOr2j+PKax937+6afmfunHPv/b2+e86553d/e+20Wi1WwY1zw7jytyZu10FbA7Q3QnsDdLbCwGHg4gkuHuDqCR4BiwhM/rt1HIOdRSRqsqdwOS+Kr/IX0X5rGKCRqSkB4DG5Ap/Iz5i07BgeU75T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";

/**
 * 获取订单设置
 */
export async function getOrderSetting(key) {
  let data = uni.getStorageSync("OrderClaimSetting");
  if (!data) {
    data = await getGoodsConfigApi({ accountType: "企业" });
    if (data.statusCode === 20000) {
      uni.setStorageSync("OrderClaimSetting", data.data);
    } else {
      uni.showToast({
        title: "获取商品类型失败",
        duration: 2000,
      });
    }
  }
  return data[key];
}
