import React from "react";
import { Company } from '../models/company'
import ReviewForm from "./ReviewForm";
import { ReviewList } from "./ReviewList";

class CompanyDetails extends React.Component {

    company = new Company(
        "1",
        "DHL",
        "Details: DHL is the global leader in the logistics industry...",
        "Contact Info: 999-9999-9999",
        5.99,
        20,
        "https://express-resources.dhl.com/rs/078-ERT-522/images/dhl_main_logo.png",
        []
    );

    constructor(props) {
        super(props);
        this.state = {
            name: this.company.name,
            detail: this.company.detail,
            contactInfo: this.company.contactInfo,
            shippingRate: this.company.shippingRate,
            fleetSize: this.company.fleetSize,
            imageURL: this.product.imageURL,
            reviews: this.product.reviews,
        };
    }

    onReviewAdded(review) {
        var reviews = this.state.reviews;
        reviews.push(review);
        this.setState({ reviews });
    }

    render() {
        return (
            <div className="product-details-wrapper">
                <div className="breadcrumbs">
                    <p><span className="breadcrumb-highlight"> Companies</span> / {this.state.name}</p>
                </div>
                <div className="product-card">
                    <img alt="Product Shot" src={this.state.imageURL} className="product-img"></img>
                    <div className="product-info">
                        <h1 className="product-name">{this.state.name}</h1>
                        <p className="product-text">{this.state.detail}</p>
                        <p className="product-contact">{this.state.contactInfo}</p>
                        <p className="product-price">${this.state.shippingRate}</p>
                        <p className="product-size">{this.state.fleetSize}</p>
                    </div>
                </div>
                <ReviewList reviews={this.state.reviews} />
                <ReviewForm onReviewAdded={review => this.onReviewAdded(review)} />
            </div>
        )
    }
}

export default CompanyDetails;