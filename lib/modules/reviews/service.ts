import { ObjectId } from 'mongoose';
import { IReviews } from './model';
import reviews from './schema';

export default class ReviewsService {
    
    public async createReview(reviews_params: IReviews): Promise<IReviews> {
        try {
            const session = new reviews(reviews_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterReview(query: any): Promise<IReviews | null> {
        try {
            return await reviews.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deleteReview(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await reviews.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async getReviewOfUsers(authorID: any): Promise<any>{
        try {
            const reviews_ = reviews.find({ author: authorID });
            return await reviews_;
        }
        catch (error) {
            throw error;
        }
    }
}