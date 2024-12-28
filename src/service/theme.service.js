import ServiceBase from "./service.base";

export class ThemeService extends ServiceBase {
    constructor() {
        super('user');
    }

    
    postCreateTheme(data) {
        return this.post('/theme', data)
    }
    putThemeById(id, data) {
        return this.put(`/theme/${id}`, data)
    }
    deleteThemeById(id) {
        return this.delete(`/theme/${id}`)
    }
    patchToggleVisibleThemeById(id) {
        return this.patch(`/theme/visible/${id}`)
    }

}


export class ThemeServiceNoAuth extends ServiceBase {
    constructor() {
        super('noAuth')
    }

    getThemeByDomain(domain) {
        return this.get("/theme", {
            headers: {
                'X-Domain': domain 
            }
        });
    }
    getAllThemes() {
        return this.get("/all-themes")
    }
}



