import { gql } from 'apollo-server';

export const mutation = gql`
    type Mutation {
        signupUser(email: String!, password: String!): AuthPayload!
        # id is just for now. In future need get id from session
        updateUserSettings(userId: Int!, theme: String): UserSetting!
        addSourceToFeed(feedId: Int!, sourceId: Int!): addSourceFeedRelation!
        #    updateUser(data: UserUpdateInput!, userId: String!): User!
        #    loginUser(email: String!, password: String!): AuthPayload!
        #    forgetPassword(email: String!): Boolean!
        #    resetPassword(password: String!, resetPasswordToken: String!): AuthPayload!
        #    deleteUser(userId: String!): User!
        # TODO: Please write the implementation of this endpoint. It takes an
        # optional argument, which you may or may not use. Think about the different
        # use cases: the front end may want to refresh a specific feed when a user
        # visits it.
        #
        # (real documentation of this endpoint below)
        # Triggers a refresh to process a 
        # The return value of this endpoint is unused. 
        #
        # https://stackoverflow.com/questions/44737043/is-it-possible-to-not-return-any-data-when-using-a-graphql-mutation
        refreshFeeds: Boolean
    }
`;
