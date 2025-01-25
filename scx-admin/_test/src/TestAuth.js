import {ScxAuth} from "../../scx/index.js";

class TestAuth extends ScxAuth {

    login(username, password) {
        return new Promise(resolve => {
            this.setToken("123");
            resolve();
        });
    }


    logout() {
        return new Promise(resolve => {
            this.removeToken();
            resolve();
        });
    }

    tokenCanUse() {
        return new Promise((resolve, reject) => {
            this.userInfo.fill({user: {isAdmin:true}, perms: {pagePerms: []}});
            this.userInfo.loginStatus = true;
            resolve(this.getToken() === "123");
        });
    }
}

export {TestAuth};
