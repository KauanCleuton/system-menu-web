import ServiceBase from "./service.base"


class OrderSv extends ServiceBase {
    constructor() {
        super("noAuth")
    }
    getOrder = () => {
        return this.get("/orders")
    }
    putRouterOrder = (id,data) => {
        return this.put(`/order/${id}`, data)
    } 
}

export default OrderSv