import ServiceBase from "./service.base";

class ThemeService extends ServiceBase {
    constructor() {
        super('noAuth');
    }

    getThemeByDomain(domain) {
        return this.get("/theme", {
            headers: {
                'X-Domain': domain 
            }
        });
    }
}

export default ThemeService;
