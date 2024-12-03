import ServiceBase from "./service.base";


class OrdersService extends ServiceBase {
    constructor() {
        super('user')
    }


    getAllOrders() {
        return this.get("/orders")
    }

    getOrderById(id) {
        return this.get(`/orders/${id}`)
    }
    putOrderById(id) {
        return this.put(`/orders/${id}`)
    }
    deleteOrderById(id) {
        return this.delete(`/orders/${id}`)
    }
    
}


export default OrdersService