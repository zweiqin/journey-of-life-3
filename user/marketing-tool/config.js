export const applyStoreOne = [
  {
    label: "登录账号：",
    field: "username",
    type: "input",
    placeholder: "请填写登录账号（至少为6位）用于登录",
  },
  {
    label: "登录密码：",
    field: "password",
    type: "input",
    placeholder: "请填写登录密码（至少为6位）用于登录",
  },
  {
    label: "联系电话：",
    type: "input",
    field: "mobile",
    placeholder: "请填写手机号码",
    warnText: "（注：账号/密码用于您登陆PC端管理后台，请务必牢记）",
  },
];

export const applyStoreTow = [
  {
    label: "门店名称：",
    field: "storename",
    type: "input",
    placeholder: "请填写门店名称",
  },
  {
    label: "所属类型：",
    field: "type",
    type: "select",
    placeholder: "请选择门店类型",
    dict: [
      {
        label: "饭店",
        value: 0,
      },
      {
        label: "家具厂",
        value: 1,
      },
    ],
  },
  {
    label: "所在城市：",
    type: "select",
    field: "local",
    placeholder: "省份、城市、区县",
  },
  {
    label: "详细地址（门牌号）",
    type: "textarea",
    field: "address",
    placeholder: "请填写详细地址",
  },
  {
    label: "门店介绍",
    type: "textarea",
    field: "introduce",
    placeholder: "请填写门店简介",
  },
];
