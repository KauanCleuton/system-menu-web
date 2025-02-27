import ServiceBase from "./service.base";


class PedidosMesasService extends ServiceBase {
    constructor() {
        super('user')
    }

    create(){
        return this.create("/pedidosMesas")
    }

    getAllOrders() {
        return this.get("/pedidosMesas")
    }

    getOrderById(id) {
        return this.get(`/pedidosMesas/${id}`)
    }
    putOrderById(id) {
        return this.put(`/pedidosMesas/${id}`)
    }
    deleteOrderById(id) {
        return this.delete(`/pedidosMesas/${id}`)
    }
    
}


export default PedidosMesasService