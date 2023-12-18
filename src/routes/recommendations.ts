import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { users } from "../server";
import RecommendationController from "../controllers/RecommendationController";

export async function recommendationsRoute(app: FastifyInstance) {
    const recommendationController = new RecommendationController()
    app.get('/:cpf', recommendationController.getRecommendations)
}