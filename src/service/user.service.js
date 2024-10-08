import customAxios from "./middleware";
import ServiceBase from "./service.base";


class UserNoAuthSv extends ServiceBase {
    constructor() {
        super("user")
    }
    getAddress(phone) {
        console.log(phone, '11312j3j213j21j')
        return this.get(`/address/${phone}`)
    }
    createPedido(data) {
        return this.post("/create-pedido", data)
    }
}



export default UserNoAuthSv