import { gql } from 'apollo-server'

export const mutation = gql`
  type Mutation {
    signupUser(email: String!, password: String!): AuthPayload!
    updateUserSettings(theme: String): UserSetting!
    addSourceToFeed(feedId: Int!, sourceId: Int!): addSourceFeedRelation!
    #    updateUser(data: UserUpdateInput!, userId: String!): User!
    #    loginUser(email: String!, password: String!): AuthPayload!
    #    forgetPassword(email: String!): Boolean!
    #    resetPassword(password: String!, resetPasswordToken: String!): AuthPayload!
    #    deleteUser(userId: String!): User!
  }
`
