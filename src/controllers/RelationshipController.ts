import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../server";
import { z } from "zod";

export default class RelationshipController {
    public async createRelationship(request: FastifyRequest, reply: FastifyReply) {
        const relationshipSchema = z.object({
            cpf1: z.string()
                .max(11, "First CPF has an invalid length")
                .min(11, "First CPF has length above than usual"),
            cpf2: z.string()
                .max(11, "Second CPF has an invalid length")
                .min(11, "Second CPF has length above than usual"),
        })

        const relationshipParse = relationshipSchema.parse(request.body);
        const { cpf1, cpf2 } = relationshipParse;

        const indexOfCPF1 = users?.findIndex(item => item.cpf === cpf1);
        const indexOfCPF2 = users?.findIndex(item => item.cpf === cpf2);


        if (indexOfCPF1 === -1 || indexOfCPF2 === -1) {
            reply.status(404)
            throw new Error("CPF doesn't exist on database.")
        }

        if (users[indexOfCPF1].friendsRelated?.includes(cpf2) || users[indexOfCPF2].friendsRelated?.includes(cpf1)) {
            reply.status(400).send("You already have this friend on your friend list.")
            throw new Error("You already have this friend on your friend list.")
        }

        users[indexOfCPF1].friendsRelated?.push(cpf2)
        users[indexOfCPF2].friendsRelated?.push(cpf1)

        reply.status(200).send({ message: "Friend request accepted!" })
    }
}