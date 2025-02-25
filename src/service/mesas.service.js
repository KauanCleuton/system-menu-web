import ServiceBase from "./service.base"


class MesasService extends ServiceBase {
    constructor() {
        super("user")
    }
    postCreateMesas(payload) {
        return this.post('/mesas', payload)
    }
    getAllMesas() {
        return this.get('/mesas')
    }
    getMesaById(id) {
        return this.get(`/mesas/${id}`)
    }
    putMesaById(id, payload) {
        return this.put(`/mesas/${id}`, payload)
    }
    patchStatus(id) {
        return this.get(`/mesas/${id}/status`)
    }
    deleteMesasById(id) {
        return this.delete(`/mesas/${id}`)
    }


}

export default MesasService