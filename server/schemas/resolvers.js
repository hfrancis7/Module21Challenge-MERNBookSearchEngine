//Define the query and mutation functionality to work with the Mongoose models

//Hint: Use the functionality in the user-controller.js as a guide

const { Book, User } = require("../models");

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
    },
    Mutation: {
        login: async(parent, args) => {
            
        },
        addUser: async(parent, args) => {

        },
        saveBook: async(parent, args) => {

        },
        removeBook: async(parent, args) => {

        },
    },
};

module.exports = resolvers;