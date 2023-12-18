import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../server";
import { z } from "zod";

export default class RecommendationController {
    public async getRecommendations(request: FastifyRequest, reply: FastifyReply) {

        const recommendationSchema = z.object({
            cpf: z.string().min(11).max(11)
        });

        const { cpf } = recommendationSchema.parse(request.params);

        const cpfExists = users.some(item => item.cpf === cpf);

        if (!cpfExists) {
            reply.status(404).send("CPF doesn't exist on database")
        }

        const userOnParams = users
            .filter(user => user.cpf === cpf)
            .flatMap(item => item.friendsRelated)

        const suggestedUsers =
            users.filter(user =>
                user.friendsRelated?.includes(cpf))
                .flatMap(item => item.friendsRelated);

        const orderedList = suggestedUsers.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});

        const recommendationList =
            [...new Set(suggestedUsers)]
                .filter(item => item !== cpf && !userOnParams.includes(item));

        console.log(userOnParams)
        reply.send(orderedList)

    }
}