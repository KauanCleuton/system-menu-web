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

    getContacts() {
        return this.get("/whatsapp/contacts")
    }
}

export default ThemeService;
