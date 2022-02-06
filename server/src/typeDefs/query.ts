import { gql } from 'apollo-server'

export const query = gql`
  type Query {
    user: User!
    getUser(userId: Int): User!
    getUserSettings: UserSetting!

    #    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
    #    user(userId: String!): User!
    #
    #    me: User!
  }
`
