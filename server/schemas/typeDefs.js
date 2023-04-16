//Define the necessary Query and Mutation types

//Query type:
        // me: returns a User type

    //Mutation type:
        //login: accepts an email and password as params, returns an Auth type
        //addUser: accepts a username, email, and password as params, returns an Auth type
        //saveBook: Accepts a book author's array, description, title, bookId, image, and link as params, returns a User type
            //(Look into creating what's known as an input type to handle all of these params!)
        //removeBook: Accepts a book's bookId as a param; returns a User type
        
    //User type:
        //_id
        //username
        //email
        //bookCount
        //savedBooks (this will be an array of the Book type)

    //Book type:
        //bookId (not the _id, but the book's id value returned from Google's Book API)
        //authors (an array of strings, as there may be more than one author)
        //description
        //title
        //image
        //link

    //Auth Type:
        //token
        //user (references the User type)


const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
        removeBook(bookId: String!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: String!
        user: User!
    }
`;

module.exports = typeDefs;
    