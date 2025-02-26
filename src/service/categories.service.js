import ServiceBase from "./service.base"


class CategoryService extends ServiceBase {
    constructor() {
        super("user")
    }
    postCreateCategory(payload) {
        return this.post('/categoria', payload)
    }
    getAllCategories() {
        return this.get('/categories/admin')
    } 
    putCategoryById(id, payload) {
        return this.put(`/categoria/${id}`, payload)
    }
    getCategoryByName(name) {
        return this.get(`/categoria/${name}`)
    }
    deleteCategoryById(id) {
        return this.delete(`/categoria/${id}`)
    }


}

export default CategoryService