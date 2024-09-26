import { Resolver, Query, Mutation, Arg, Field, InputType, Int, ObjectType, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { DeepPartial } from "typeorm";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { MyContext } from "../MyContext";
import { isAuth } from "../middleware/auth";

@InputType()
class UserInteface {
    @Field()
    username!: string;
    @Field()
    password!: string;
    @Field()
    email!: string;
    @Field()
    state!: boolean;
}

@ObjectType()
class LoginResponse {
    @Field()
    accessToken!: string;
}


@InputType()
class UserUpdateInteface {
    @Field(() => String, { nullable: true })
    username?: string;
    @Field(() => String, { nullable: true })
    password?: string;
    @Field(() => String, { nullable: true })
    email?: string;
    @Field(() => Boolean, { nullable: true })
    state?: boolean;
}

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async createUser(
        @Arg("variables", () => UserInteface) variables: UserInteface
    ) {
        console.log(variables);
        const hashedPassword = await bcrypt.hash(variables.password, 12);
        const { password, ...rest } = variables;
        const newUser = User.create({ password: hashedPassword, ...rest } as DeepPartial<User>);
        console.log(newUser);
        return await newUser.save();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateUser(@Arg("id", () => Int) id: number, @Arg("fields", () => UserUpdateInteface) fields: UserUpdateInteface) {
        return User.update({ id }, fields)
        .then((res) => {
            console.log("res update", res);
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteUser(
        @Arg("id", () => Int) id: number
    ) {
        await User.delete(id);
        return true;
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOneBy({ email });
        if (!user) {
            throw new Error("Could not find user");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Bad password");
        }

        const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "15m",
        });

        return {
            accessToken,
        };
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    async me(@Ctx() { payload }: MyContext) {
        return `Your user id is: ${payload!.userId}`;
    }

}