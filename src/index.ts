import "reflect-metadata";
import { AppDataSource } from "./config/typeorm";
import { startServer } from "./app";
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    await AppDataSource.initialize()
    const app = await startServer();
    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql");
    });
}

main().catch((err) => {
    console.error(err);
});