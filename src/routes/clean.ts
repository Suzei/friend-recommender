import { FastifyInstance } from "fastify";
import { users } from "../server";


export async function cleanRoute(app: FastifyInstance) {
    app.delete('/', () => {
        users.splice(0)
    })
}
