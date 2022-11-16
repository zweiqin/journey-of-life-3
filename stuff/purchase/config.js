export const purrchaseType = [
    {
        value: 0,
        label: "求购材料"
    }, {
        value: 1,
        label: "同城急送"
    }, {
        value: 2,
        label: "紧急求购"
    }, {
        value: 3,
        label: "材料定制"
    },
]

export const purrchaseInput = [
    {
        value: 0,
        lable: "材料名称",
        field: "stuffName",
        type: "input",
        state: "text"

    }, {
        value: 1,
        lable: "采购数量",
        field: "stuffNumber",
        type: "input",
        state: "Number"

    }, {
        value: 2,
        lable: "参考价格",
        field: "stuffMoney",
        type: "input",
        state: "Number"

    }, {
        value: 3,
        lable: "材料规格",
        field: "stuffSku",
        type: "input",
        state: "text"

    }, {
        value: 4,
        lable: "颜色备注",
        field: "stuffColor",
        type: "input",
        state: "text"

    }, {
        value: 5,
        lable: "交货日期",
        field: "stuffTime",
        type: "choseTime"

    }, {
        value: 6,
        lable: "求购备注",
        field: "stuffRemake",
        type: "textArea"

    },]

export const upLoadImgVlog = [
    {
        value: 0,
        lable: "上传图片",
        field: "upLoad",
        type: "upLoad"
    }, {
        value: 1,
        lable: "上传视频",
        field: "upLoad",
        type: "upLoad"
    },

]

export const linkMan = [{
    value: 0,
    lable: "联系人姓名",
    field: "linkManName",
    type: "input",
    state: "text"

}, {
    value: 1,
    lable: "联系人电话",
    field: "linkManPhone",
    type: "input",
    state: "number"

}, {
    value: 2,
    lable: "收货地址",
    field: "linkManAddress",
    type: "input",
    state: "text"

},]