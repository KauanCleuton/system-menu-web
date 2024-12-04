import ServiceBase from "./service.base"


class ProductsSv extends ServiceBase {
    constructor() {
        super('user')
    }
    getAllProducts() {
        return this.get("/products/admin")
    }
    getProductsById(id) {
        return this.get(`/product/${id}`)
    }
    getProductsByCategoryName(name) {
        return this.get(`/products/category/${name}`)
    }
    getSearchProductsByCategoryAndName(name, category) {
        return this.get(`/products/category/${name}/${category}`)
    }
    getProductsByName(name) {
        return this.get(`/products/name/${name}`)
    }
    postCreateNewProduct(payload) {
        return this.post("/product", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
    putEditProductById(id, payload) {
        return this.put(`/product/${id}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
    deleteProductById(id) {
        return this.delete(`/product/${id}`)
    }
    editVisibleProductsById(id) {
        return this.patch(`/products/${id}/visibility`)
    }


}

export default ProductsSv