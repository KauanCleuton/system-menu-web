import { default as ServiceBase } from "./service.base";

class BannerService extends ServiceBase {
    constructor() {
        super("noAuth");
    }

    addBanner(data) {
        return this.post("/banner", data);
    }

    getAllBanners() {
        return this.get("/banner");
    }

    getBannerById(id) {
        return this.get(`/banner/${id}`);
    }

    updateBanner(id, data) {
        return this.put(`/banner/${id}`, data);
    }

    deleteBanner(id) {
        return this.delete(`/banner/${id}`);
    }

    getBannersByStatus(status) {
        return this.get(`/bannerStatus/${status}`);
    }

    getBannersByCategory(category) {
        return this.get(`/bannerCategory/${category}`);
    }

    deleteAllBanners() {
        return this.delete("/bannerdeleteAll");
    }

    toggleBannerStatus(id) {
        return this.patch(`/banner/toggle/${id}`);
    }
}

export default BannerService;
