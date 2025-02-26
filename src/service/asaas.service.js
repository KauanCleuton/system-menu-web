import { default as ServiceBase } from "./service.base"



class AsaasService extends ServiceBase {
    constructor() {
        super("user")
    }
    
    getBalance() {
        return this.get("/asaas/saldo")
    }

    getAllBillings() {
        return this.get("/asaas/billing")
    }
}


export default AsaasService