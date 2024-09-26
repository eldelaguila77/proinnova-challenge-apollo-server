import express, { Application } from 'express'; // Import the Response type from the express package
import { ApolloServer } from 'apollo-server-express';
import { PingResolver } from './resolvers/ping';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { buildSchema } from 'type-graphql';
import { MyContext } from './MyContext';
import dotenv from 'dotenv';

dotenv.config();

export async function startServer(): Promise<Application> {
    const app: Application = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, UserResolver, PostResolver, CommentResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ req, res }),
    });

    await server.start();

    server.applyMiddleware({ app: app as any, path: '/graphql' });

    return app;
}