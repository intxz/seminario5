import { Application, Request, Response } from 'express';
import { ReviewsController } from '../controllers/reviewsControllers';

export class ReviewsRoutes {

    private review_controller: ReviewsController = new ReviewsController();

    public route(app: Application) {
        
        app.post('/review', (req: Request, res: Response) => {
            this.review_controller.createReview(req, res);
        });

        app.get('/review/:id', (req: Request, res: Response) => {
            this.review_controller.getReview(req, res);
        });

        app.delete('/review/:id', (req: Request, res: Response) => {
            this.review_controller.deleteReviews(req, res);
        });

        app.get('/review/:author', (req: Request, res: Response) =>{
            this.review_controller.getReviewOfUsers(req, res);
        })

    }
}