import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    content!: string;

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    updatedAt!: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.comments)
    user!: User;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.comments)
    post!: Post;
}