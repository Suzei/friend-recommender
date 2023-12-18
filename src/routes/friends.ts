import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Friends } from "../interfaces/Friends";
import { users } from "../server";
import FriendsController from "../controllers/FriendsController";


export async function friendsRoutes(app: FastifyInstance) {
    const friendsController = new FriendsController()
    app.post('/', friendsController.createUser)
    app.get('/:cpf', friendsController.findUser)
}