import fastify from "fastify";
import { friendsRoutes } from "./routes/friends";
import { Friends } from "./interfaces/Friends";
import { cleanRoute } from "./routes/clean";
import { relationshipRoute } from "./routes/relationship";

const app = fastify();
export let users: Friends[] = []

app.register(friendsRoutes, { prefix: '/person' })
app.register(cleanRoute, { prefix: '/clean' })
app.register(relationshipRoute, { prefix: '/relationship' })

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit();
    }

    console.log(`Server listening at ${address}`)
})