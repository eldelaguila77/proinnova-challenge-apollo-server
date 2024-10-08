import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    console.log("CONTEXT: ", context.req.headers);
    const authorization = context.req.headers["authorization"];
    console.log("AUTHORIZATION: ", authorization);

    if (!authorization) {
        throw new Error("Not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (err) {
        throw new Error("Not authenticated");
    }

    return next();
};