import { FastifyInstance } from "fastify";
import RelationshipController from "../controllers/RelationshipController";

export async function relationshipRoute(app: FastifyInstance) {
    const relationshipController = new RelationshipController();
    app.post('/', relationshipController.createRelationship)
}