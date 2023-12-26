export const registerRules = [
    {
        name: "mobile",
        rule: ["required", "isMobile"],
        msg: ["请输入手机号", "请输入正确的手机号"]
    },
    {
        name: "code",
        rule: ["required"],
        msg: ["请输入验证码"]
    },
    {
        name: "password",
        rule: ["required", "isEnAndNo"],
        msg: ["请输入密码", "密码为8~20位英文和数字组合"]
    },
    {
        name: "confirmPassword",
        rule: ["required", "isSame:password"],
        msg: ["请再次确认密码", "两次密码不一致"]
    }
]

export const msgLoginRules = [
    {
        name: "phone",
        rule: ["required", "isMobile"],
        msg: ["请输入手机号", "请输入正确的手机号"]
    },
    {
        name: "code",
        rule: ["required"],
        msg: ["请输入验证码"]
    }
]

export const pwdLoginRules = [
    {
        name: "username",
        rule: ["required", "isMobile"],
        msg: ["请输入手机号", "请输入正确的手机号"]
    },
    {
        name: "password",
        rule: ["required", "isEnAndNo"],
        msg: ["请输入密码", "密码为8~20位英文和数字组合"]
    },
]