import { default as ServiceBase } from "./service.base";


export class NotificationsUser extends ServiceBase {
    constructor() {
        super("noAuth")
    }

    getNotification() {
        return this.get("/notifications")
    }
}
export class NotificationsAdmin extends ServiceBase {
    constructor() {
        super("user")
    }

    createNotification(payload) {
        return this.post("/notifications", payload)
    }
}