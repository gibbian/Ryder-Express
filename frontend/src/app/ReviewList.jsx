import React from "react";
import { StarRating } from "./StarRating.jsx";

export const ReviewList = (props) => <>
    <div className="product-reviews">
        <h2>Company Reviews <span className="num-reviews">({props.reviews.length})</span></h2>
        {
            !props.reviews.length && <div className="reviews-empty">Be the first to add a review!</div>
        }
        {
            props.reviews.map((x, i) => <div className="review-card" key={ i }>
                <div className="review-header">
                    <StarRating value={x.rating} />
                </div>
                <div className="review-body">
                    <div className="review-body-info">
                        <p>{x.userName}</p>
                        <p>{x.date}</p>
                    </div>
                    {x.comment}
                </div>
            </div>)
        }
    </div>
</>