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
    },{
        value: 4,
        label: "最新需求"
    }, {
        value: 5,
        label: "紧急需求"
    }, {
        value: 6,
        label: "长期需求"
    },
]

export const purrchaseInput = [
    {
        value: 0,
        lable: "名称",
        field: "stuffName",
        type: "input",
        state: "text"

    }, {
        value: 1,
        lable: "数量",
        field: "stuffNumber",
        type: "input",
        state: "Number"

    }, {
        value: 2,
        lable: "价格",
        field: "stuffMoney",
        type: "input",
        state: "Number"

    }, {
        value: 3,
        lable: "规格",
        field: "stuffSku",
        type: "input",
        state: "text"

    }, {
        value: 4,
        lable: "颜色",
        field: "stuffColor",
        type: "input",
        state: "text"

    }, {
        value: 5,
        lable: "日期",
        field: "stuffTime",
        type: "choseTime"

    }, {
        value: 6,
        lable: "备注",
        field: "stuffRemake",
        type: "textArea"

    },]

export const upLoadImgVlog = [
    {
        value: 0,
        lable: "图片",
        field: "img",
        type: "upLoad"
    }, {
        value: 1,
        lable: "视频",
        field: "vlog",
        type: "upLoad"
    },

]

export const linkMan = [{
    value: 0,
    lable: "姓名",
    field: "linkManName",
    type: "input",
    state: "text"

}, {
    value: 1,
    lable: "电话",
    field: "linkManPhone",
    type: "input",
    state: "number"

}, {
    value: 2,
    lable: "地址",
    field: "linkManAddress",
    type: "input",
    state: "text"

},]