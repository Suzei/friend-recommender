import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Friends } from "../interfaces/Friends";
import { users } from "../server";


export async function friendsRoutes(app: FastifyInstance) {
    app.post('/', (request: FastifyRequest, reply: FastifyReply) => {

        const personSchema = z.object({
            cpf: z.string()
                .max(11, { message: "CPF length is not valid" })
                .min(11, { message: "CPF length is smaller than usual." }),
            name: z.string(),
        })


        const { cpf, name } = personSchema.parse(request.body)
        const cpfAlreadyExists = users.some((user) => user.cpf === cpf)

        if (cpfAlreadyExists) {
            reply.status(400).send({ message: "CPF already exists." })
            throw new Error("CPF already exists")
        }

        users.push({ cpf, name, friendsRelated: [] })
        reply.status(200).send({ message: "User has been sucessfuly created." })

    })

    app.get('/:cpf', async (request: FastifyRequest, reply: FastifyReply) => {

        const cpfSchema = z.object({
            cpf: z.string()
                .max(11, { message: "CPF length is not valid" })
                .min(11, { message: "CPF length is smaller than usual." }),
        })
        const { cpf } = cpfSchema.parse(request.params);

        const userData = users.filter(user => user.cpf === cpf);
        const userCpfExists = userData.some(item => item.cpf === cpf)

        if (!userCpfExists) {
            reply.status(404)
            throw new Error("CPF doesn't exist on database.")
        }

        reply.send(...userData).status(200)

        return userData
    })
}