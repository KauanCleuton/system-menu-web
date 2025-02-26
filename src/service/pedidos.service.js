import ServiceBase from "./service.base";


class OrdersService extends ServiceBase {
    constructor() {
        super('user')
    }


    getAllOrders() {
        return this.get("/orders")
    }

    getOrderById(id) {
        return this.get(`/order/${id}`)
    }
    putOrderById(id) {
        return this.put(`/order/${id}`)
    }
    deleteOrderById(id) {
        return this.delete(`/order/${id}`)
    }
    
}


export default OrdersService