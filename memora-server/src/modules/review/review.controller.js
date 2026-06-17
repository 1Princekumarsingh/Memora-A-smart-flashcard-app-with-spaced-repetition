import * as reviewService from "./review.service.js";

export const submitReview = async(req, res) => {
    const review = await reviewService.submitReview(req.body);

    res.status(201).json({
        success:true,
        data: review
    })
}