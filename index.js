const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  #graphQL schema
  type Query {
    books: String! #always start  writing string in capital latter i.e String
    user(name:String):String
  }
  type user{
    id: ID!
    name: String! # !=> can't returns null value
  }
  type Error {
    field: String!
    message: String!
  }
  type UserResponse {
    Error: [Error] 
    user: user
  }
  input UserInfo {
    username: String!
    password: String!
  }

  type Mutation {
    resister(userInfo:UserInfo): UserResponse
    login(userInfo:UserInfo!):String!
  }
`;

const resolvers = {
  Query: {
    books: () => "hello world welcome to apollo with yogi" ,
     user:(parent, {name}) => {
     return `hey ${name}` 
    }
  },
  Mutation: {
    login :(parent,{userInfo: { username } }, context,info) =>{
      return username ;
    },
    resister: () => ({
      Error: [{
          field: "this is the your field",
          message: "bad code"
        },
        {
          field: "this is the my field",
          message: "good code"
        }],
      user: {
        id :10,
        name: 'yogesh mishra'
      }
    }),
    
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});