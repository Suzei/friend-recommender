import { FastifyInstance } from "fastify";
import RecommendationController from "../controllers/RecommendationController";

export async function recommendationsRoute(app: FastifyInstance) {
    const recommendationController = new RecommendationController()
    app.get('/:cpf', recommendationController.getRecommendations)
}