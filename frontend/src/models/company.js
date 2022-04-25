export class Company {
    constructor(id, name, detail, contactInfo, shippingRate, fleetSize, imageURL, reviews) {
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.contactInfo = contactInfo;
        this.shippingRate = shippingRate;
        this.fleetSize = fleetSize;
        this.imageURL = imageURL;
        this.reviews = reviews;
    }
}