import ServiceBase from "./service.base";

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
    getUserDataById(id) {
        return this.get(`/user/${id}`)
    }
    getSearchUserByName(name) {
        return this.get(`/search/user/${name}`)
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
    putUpdateUserPhoto(payload) {
        return this.put("/user/update-foto", payload)
    }
    putUpdateUserPassword(id) {
        return this.put(`/user/${id}/password`)
    }
    putUpdateUser(payload) {
        return this.put(`/user`, payload)
    }
    putUpdateUserAdmin(id, payload) {
        return this.put(`/admin/${id}`, payload)
    }
    deleteAdminById(id) {
        return this.delete(`/admin/${id}`)
    }
    deleteUserById(id) {
        return this.delete(`/user/${id}`)
    }
}


export default AdminService