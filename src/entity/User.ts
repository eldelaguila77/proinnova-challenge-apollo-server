import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { Comment } from "./Comments";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    @Field()
    @Column()
    username!: string;
    @Field()
    @Column()
    password!: string;
    @Field()
    @Column()
    email!: string;
    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;
    @Field()
    @CreateDateColumn({ type: "timestamp" })
    updatedAt!: string;
    @Field()
    @Column()
    state!: boolean;
    @Field(() => [Post])
    @OneToMany(() => Post, post => post.user)
    posts!: Post[];
    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];
}