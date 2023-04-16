//Define the query and mutation functionality to work with the Mongoose models

//Hint: Use the functionality in the user-controller.js as a guide

const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        //The "me" appears to be the "getSingleUser" replacement?
        //gets the current user 
        me: async(parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id }).populate('books')
            }
            
        },
    },
    Mutation: {
        login: async(parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('No user was found with this email and password!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return {token, user};
        },
        addUser: async(parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        saveBook: async(parent, {authors, description, title, bookId, image, link}, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: {authors, description, title, bookId, image, link}}},
                    {new: true, runValidators: true},
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async(parent, {bookId}, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBook: { bookId: bookId} } },
                    {new: true},
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;