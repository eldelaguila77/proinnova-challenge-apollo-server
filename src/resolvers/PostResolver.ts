import { Resolver, Query, Mutation, Arg, Field, InputType, Int, UseMiddleware } from "type-graphql";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { DeepPartial } from "typeorm";
import { isAuth } from "../middleware/auth";

@InputType()
class PostInput {
    @Field()
    title!: string;

    @Field()
    content!: string;

    @Field()
    userId!: number;
}

@InputType()
class UpdatePostInput {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    content?: string;
}

@Resolver()
export class PostResolver {
    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("variables", () => PostInput) variables: PostInput
    ) {
        const user = await User.findOneBy({ id: variables.userId });
        if (!user) throw new Error("User not found");

        const newPost = Post.create({ ...variables, user } as DeepPartial<Post>);
        return await newPost.save();
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UpdatePostInput) fields: UpdatePostInput
    ) {
        const post = await Post.findOneBy({ id });
        if (!post) throw new Error("Post not found");

        Object.assign(post, fields);
        return await post.save();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(@Arg("id", () => Int) id: number) {
        await Post.delete(id);
        return true;
    }

    @Query(() => [Post])
    @UseMiddleware(isAuth)
    posts() {
        return Post.find({ relations: ["user"] });
    }

    @Query(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    post(@Arg("id", () => Int) id: number) {
        return Post.findOne({ where: { id }, relations: ["user"] });
    }
}