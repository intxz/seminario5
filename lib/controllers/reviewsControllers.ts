import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { IReviews } from '../modules/reviews/model';
import PostService from '../modules/posts/service';
import UserService from '../modules/users/service';
import ReviewsService from '../modules/reviews/service';
import e = require('express');

export class ReviewsController {

    private user_service: UserService = new UserService();
    private review_service: ReviewsService = new ReviewsService();

    public async createReview(req: Request, res: Response) {
        try{
            // this check whether all the fields were send through the request or not
            if (req.body.title && req.body.content && req.body.author && req.body.stars){
                const review_params:IReviews = {
                    title: req.body.title,
                    content: req.body.content,
                    stars: req.body.stars,
                    author: req.body.author
                };
                const review_data = await this.review_service.createReview(review_params);
                 // Now, you may want to add the created post's ID to the user's array of posts
                await this.user_service.addReviewToUser(req.body.author, review_data._id); //
                return res.status(201).json({ message: 'Review created successfully', review: review_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getReview(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReview(review_filter);
                // Send success response
                return res.status(200).json({ data: review_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteReviews(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete post
                const delete_details = await this.review_service.deleteReview(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Review not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getReviewOfUsers(req: Request, res: Response){
        try {
            if(req.params.author) {
                const review_author = await this.review_service.getReviewOfUsers(req.params.author);
                return res.status(200).json({ data: review_author, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing author'});
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error'});
        }
    }
}