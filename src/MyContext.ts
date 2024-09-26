import { Request, Response } from "express";

export interface MyContext {
    req: Request|any;
    res: Response|any;
    payload?: { userId: string };
}