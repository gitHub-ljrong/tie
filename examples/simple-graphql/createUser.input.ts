import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @Field(() => Int, { nullable: true })
  age: number
}
