const { Post } = require('../models');

const postData = [
    {
        content: "I saw it! It was brown. I was really worried, because I've always heard that the ones with bright scales are harmless, but it's the boring-looking ones that are deadly.",
        user_id: 3,
        story_id: 1
    },
    {
        content: "You probably stepped on its home. There wasn't a rattle or a hiss, so it was probably a snake just defending its home.",
        user_id: 2,
        story_id: 1
    },
    {
        content: "I asked the park ranger later, he said he wasn't out there at the time.",
        user_id: 1,
        story_id: 2
    },
    {
        content: "We also saw this great exhibit about 12th century Britain. They had this badass knight armour and real swords.",
        user_id: 4,
        story_id: 3
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;