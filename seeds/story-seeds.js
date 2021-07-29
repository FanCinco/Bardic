const sequelize = require('../config/connection');
const { Story } = require('../models');

const storyData = [
    {
        title: 'Got bitten by a snake and I was too sweaty to care.',
        startingText: "We were setting up the tent, and I didn't notice that there was a snake in the grass next to me. It was so. Frigging. Hot out. I couldn't see it through all the sweat. I must have stepped right next to it, and it bit me real fast. I didn't even see it. Not poisonous, though!",
        trip_id: 1,
        place_id: 1,
        user_id: 1,
        created_at: new Date('March 20th, 2020 16:12:03')
    },
    {
        title: 'Park Ranger, or Park Ghost?',
        startingText: "We were eating dinner and I saw someone walking. A man in a hat. I couldn't see him because of the trees, but he definitely had a hat. I thought nothing of it, assumed he was a park ranger. But George says that the park rangers don't check on campers at night! I think I saw a ghost.",
        trip_id: 1,
        place_id: 1,
        user_id: 2,
        created_at: new Date('March 20th, 2020 16:12:03')
    },
    {
        title: 'Rocked out at the concert!',
        startingText: 'It was awesome! There was this band I never heard of that opened for them, they were pretty good. So much energy in the crowd! Love concerts!',
        trip_id: 2,
        place_id: 2,
        user_id: 3,
        created_at: new Date('March 20th, 2020 16:12:03')
    },
    {
        title: 'Saw mummies for the first time.',
        startingText: "I've always been a little scared of mummies, I never saw one before. It was gross, but kind of cool. I was expecting bugs to crawl out of it the whole time.",
        trip_id: 3,
        place_id: 3,
        user_id: 4,
        created_at: new Date('March 20th, 2020 16:12:03')
    }
];

const seedStorys = () => Story.bulkCreate(storyData);

module.exports = seedStorys;