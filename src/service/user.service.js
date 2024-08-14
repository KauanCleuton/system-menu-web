import customAxios from "./middleware";
import ServiceBase from "./service.base";


class UserSv extends ServiceBase {

}

class UserNoAuthSv extends ServiceBase {
    constructor() {
        super("noAuth")
    }
    getAddress(phone) {
        console.log(phone, '11312j3j213j21j')
        return this.get(`/address/${phone}`)
    }
}



export default {
    UserSv,
    UserNoAuthSv
}