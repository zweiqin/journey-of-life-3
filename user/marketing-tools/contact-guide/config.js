export const getRestColor = (color) => {
  return [
    "#FA5151",
    "#FF8F1F",
    "#FFC300",
    "#00B578",
    "#07B9B9",
    "#3662EC",
    "#8A38F5",
    "#EB2F96",
    "#183869",
    "#183869",
  ].filter((item) => item !== color);
};

export const baseInfoFields = [
  {
    label: "姓名",
    errorMsg: "请输入姓名",
    required: true,
    field: "name",
  },
  {
    label: "电话",
    errorMsg: "请输入电话",
    required: true,
    field: "phone",
  },
  {
    label: "职位",
    required: true,
    errorMsg: "请输入职位",
    field: "position",
  },
  {
    label: "公司",
    required: true,
    errorMsg: "请输入公司",
    field: "company",
  },
  {
    label: "行业",
    field: "business",
  },
];

export const connects = [
  {
    label: "微信",
    field: "wechat",
  },
  {
    label: "地址",
    field: "address",
  },
]
