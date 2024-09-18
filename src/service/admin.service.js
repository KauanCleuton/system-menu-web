import { default as ServiceBase } from "./service.base";

class AdminService extends ServiceBase {
    constructor() {
        super('user');
    }

    createNewAdmin(payload) {
        return this.post("/admin", payload)
    }
    getAllAdmins() {
        return this.get("/admins")
    }
    getAllClients() {
        return this.get("/clients")
    }
    getAllUsers() {
        return this.get("/users")
    }
    getUserData() {
        return this.get("/user")
    }
    getAddressByPhone(phone) {
        return this.get(`/address/${phone}`)
    }
    putBecomeAdminById(id) {
        return this.put(`/user/become-admin/${id}`)
    }
    putBackAdminById(id) {
        return this.put(`/user/back-admin/${id}`)
    }
    putUpdateUserPhoto() {
        return this.put("/user/photo")
    }
    putUpdateUserPassword(id) {
        return this.put(`/user/${id}/password`)
    }
    putUpdateUser(id) {
        return this.put(`/user/${id}`)
    }
    deleteAdminById(id) {
        return this.delete(`/admin/${id}`)
    }
    deleteUserById(id) {
        return this.delete(`/user/${id}`)
    }
}


export default AdminService