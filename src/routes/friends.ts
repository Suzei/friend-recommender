import { FastifyInstance } from "fastify";
import FriendsController from "../controllers/FriendsController";


export async function friendsRoutes(app: FastifyInstance) {
    const friendsController = new FriendsController()
    app.post('/', friendsController.createUser)
    app.get('/:cpf', friendsController.findUser)
}