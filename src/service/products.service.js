import customAxios from "./middleware";

class Products {
    getProducts() {
        return customAxios.get("/products")
    }

    getUser(accessToken) {
        return customAxios.get("/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    addUserByAdmin(data, accessToken) {
        return customAxios.post("/user", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    updateUser(data, accessToken) {
        return customAxios.put("/user", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    updateUserByAdmin(userId, data, accessToken) {
        return customAxios.put(`/user/${userId}/update`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    changeUserPassword(data, accessToken) {
        return customAxios.put("/user/change-password", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    disableUser(userId, accessToken) {
        return customAxios.get(`/user/${userId}/disable`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    enableUser(userId, accessToken) {
        return customAxios.get(`/user/${userId}/enable`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    setAdmin(userId, accessToken) {
        return customAxios.get(`/user/${userId}/set-admin`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    unsetAdmin(userId, accessToken) {
        return customAxios.get(`/user/${userId}/unset-admin`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    getUserById(userId, accessToken) {  
        return customAxios.get(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    deleteUser(userId, accessToken) {
        return customAxios.delete(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}

export default new Products();
