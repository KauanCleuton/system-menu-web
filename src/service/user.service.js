import customAxios from "./middleware";
import ServiceBase from "./service.base";


class UserNoAuthSv extends ServiceBase {
    constructor() {
        super("noAuth")
    }
    getAddress(phone) {
        console.log(phone, '11312j3j213j21j')
        return this.get(`/address/${phone}`)
    }
    createPedido(data) {
        return this.post("/create-pedido", data)
    }
    postPixReceiptAnalysis(payload) {
        return this.post("/comprovante", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
}



export default UserNoAuthSv