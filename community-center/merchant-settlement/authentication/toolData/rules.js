// import form from "@/components/common/tui-validation/tui-validation.js"

function checkCardNo(value) {
    if (/^[1-9]\d{9,29}$/.test(value)) {
        return true
    }else {
        return false
    }
}

function checkSpace(value) {
    if (value.indexOf(" ") == -1) {
        return true
    } else {
        return false
    }
}

export const BasicInformationRules = [
    {
        name: 'account',
        rule: ["required",'isSpecial','isEmoji'],
        msg: ["请输入账号",'请以数字或字母组合为账号,推荐为电话号码'],
        validator: [{
            msg: "账号密码等信息中不允许带有空格",
            method: checkSpace
        }]
    },
    {
        name: "password",
        rule: ["required","isEnAndNo",'isSpecial','isEmoji'],
        msg: ["请输入密码", "密码为8~20位数字和字母组合"],
    },
    {
        name: "confirmPwd",
        rule: ["required", "isSame:password"],
        msg: ["请输入确认密码", "两次输入的密码不一致"],
    },
    {
        name: "contacts",
        rule: ["required",'isChinese'],
        msg: ["请输入账户名",'请输入正确的中文名字'],
    },
    {
        name: "contactsTel",
        rule: ["required", "isMobile"],
        msg: ["请输入手机号", "请输入正确的手机号"],
    },
    {
        name: "ident",
        rule: ["required", "isIdCard"],
        msg: ["请输入身份证号码", "请输入正确的身份证号码"],
    },
    {
        name: "region",
        rule: ["required"],
        msg: ["请选择地址"],
    },
    {
        name: "addresText",
        rule: ["required"],
        msg: ["请输入详细地址"],
    },
    {
        name: "cardNo",
        rule: ["required"],
        msg: ["请输入银行卡号",],
        validator: [{
            msg: "请输入正确的银行卡号",
            method: checkCardNo
        }]
    },
    {
        name: 'bankName',
        rule: ["required"],
        msg: ["请输入银行名称"]
    },
    {
        name: 'userUrl',
        rule: ["required"],
        msg: ["请上传实名头像"]
    },
    {
        name: 'certImg1',
        rule: ["required"],
        msg: ["请上传身份证图片地址（正面）"]
    },
    {
        name: 'certImg2',
        rule: ["required"],
        msg: ["请上传身份证图片地址（反面）"]
    },
    {
        name: 'bankCardFront',
        rule: ["required"],
        msg: ["请上传银行卡正面图片"]
    }
];
