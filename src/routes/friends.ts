import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Friends } from "../interfaces/Friends";
// import users from '../assets/data.json'


export async function friendsRoutes(app: FastifyInstance) {

    const users: Friends[] = []

    app.post('/person', (request: FastifyRequest, reply: FastifyReply) => {
        const personSchema = z.object({
            cpf: z.string()
                .max(11, { message: "CPF length is not valid" })
                .min(11, { message: "CPF length is smaller than usual." }),
            name: z.string()
        })


        const { cpf, name } = personSchema.parse(request.body)
        const cpfAlreadyExists = users.some((user: Friends) => user.cpf === cpf)

        if (cpfAlreadyExists) {
            reply.status(400).send({ message: "CPF already exists." })
            throw new Error("CPF already exists")
        }

        users.push({ cpf, name })
        reply.status(200).send({ message: "User has been sucessfuly created." })
        console.log(users)


    })
}