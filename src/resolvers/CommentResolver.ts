import { Resolver, Query, Mutation, Arg, Field, InputType, Int, UseMiddleware, } from "type-graphql";
import { Comment } from "../entity/Comments";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { DeepPartial } from "typeorm";
import { isAuth } from "../middleware/auth";

@InputType()
class CommentInput {
    @Field()
    content!: string;

    @Field()
    userId!: number;

    @Field()
    postId!: number;
}

@InputType()
class UpdateCommentInput {
    @Field({ nullable: true })
    content?: string;
}

@Resolver()
export class CommentResolver {
    @Mutation(() => Comment)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg("variables", () => CommentInput) variables: CommentInput
    ) {
        const user = await User.findOneBy({ id: variables.userId });
        if (!user) throw new Error("User not found");

        const post = await Post.findOneBy({ id: variables.postId });
        if (!post) throw new Error("Post not found");

        const newComment = Comment.create({ ...variables, user, post } as DeepPartial<Comment>);
        return await newComment.save();
    }

    @Mutation(() => Comment)
    @UseMiddleware(isAuth)
    async updateComment(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UpdateCommentInput) fields: UpdateCommentInput
    ) {
        const comment = await Comment.findOneBy({ id });
        if (!comment) throw new Error("Comment not found");

        Object.assign(comment, fields);
        return await comment.save();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(@Arg("id", () => Int) id: number) {
        await Comment.delete(id);
        return true;
    }

    @Query(() => [Comment])
    @UseMiddleware(isAuth)
    comments() {
        return Comment.find({ relations: ["user", "post"] });
    }

    @Query(() => Comment, { nullable: true })
    @UseMiddleware(isAuth)
    comment(@Arg("id", () => Int) id: number) {
        return Comment.findOne({ where: { id }, relations: ["user", "post"] });
    }
}