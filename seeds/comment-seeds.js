const { Comment } = require('../models');

const commentData = [
    {
        content: "I checked, that's not really true! Some of the deadliest snakes have really bright, beautiful scales.",
        post_id: 1,
        user_id: 4
    },
    {
        content: "That's so scary! Wow!",
        post_id: 3,
        user_id: 4
    },
    {
        content: "Literally got goose bumps...",
        post_id: 3,
        user_id: 3
    },
    {
        content: "Cool!",
        post_id: 4,
        user_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;