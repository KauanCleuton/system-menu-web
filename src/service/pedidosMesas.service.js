import ServiceBase from "./service.base";


class PedidosMesasService extends ServiceBase {
    constructor() {
        super('user')
    }

    create(payload){
        return this.post("/pedidosMesas", payload)
    }

    getAllOrders() {
        return this.get("/pedidosMesas")
    }

    getOrderById(id) {
        return this.get(`/pedidosMesas/${id}`)
    }
    putOrderById(id,payload) {
        return this.put(`/pedidosMesas/${id}`,payload)
    }
    deleteOrderById(id) {
        return this.delete(`/pedidosMesas/${id}`)
    }
    
}


export default PedidosMesasService