import ServiceBase from "./service.base"


class OrderSv extends ServiceBase {
    constructor() {
        super("user")
    }
    getOrder = () => {
        return this.get("/orders")
    }
    getOrderById(id) {
        return this.get(`/order/${id}`)
    }
    putRouterOrder = (id,data) => {
        return this.put(`/order/${id}`, data)
    } 
    deleteOrderById(id) {
        return this.delete(`/order/${id}`)
    }
}

export default OrderSv