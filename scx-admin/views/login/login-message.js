class LoginMessage {
    mapping = {
        "Network Error": "网络错误 !!!",
        "Request failed with status code 404": "Api 路径错误 !!!",
        "Request failed with status code 500": "服务器端发生错误 !!!",
        "unknown-user": "用户未找到 !!!",
        "wrong-password": "密码错误 !!!",
        usernameOrPasswordError: "用户名或密码错误 !!!",
        userLocked: "用户已被锁定 !!!",
        logonFailure: "登陆错误 !!!",
        tooManyErrors: "登陆错误次数过多",
        licenseError: "系统错误 !!!",
        noPermission: "您没有权限进行该操作 !!!",
        "Failed to fetch": "网络错误 !!!",
        "username-already-exists": "用户名已被占用 !!!",
    };

    t(m) {
        const message = this.mapping[m];
        return message ? message : m;
    }
}

const loginMessage = new LoginMessage();

export {
    loginMessage,
};
