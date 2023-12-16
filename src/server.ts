import fastify from "fastify";
import { friendsRoutes } from "./routes/friends";

const app = fastify();

app.register(friendsRoutes, { prefix: '/' })

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit();
    }

    console.log(`Server listening at ${address}`)
})