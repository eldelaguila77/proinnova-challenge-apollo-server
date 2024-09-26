import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comments";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

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
    @ManyToOne(() => User, user => user.posts)
    user!: User;

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.post)
    comments!: Comment[];
}