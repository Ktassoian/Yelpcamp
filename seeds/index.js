const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61256e98cd3c8d28923082ee',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae enim corporis iste voluptatibus, dolorem illum libero fuga incidunt nobis, quia quaerat mollitia animi recusandae atque nostrum vitae! Quae, officiis vel.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfvybojqu/image/upload/v1630023144/Yelpcamp/j7sf7h1hxeaxaatqxpsn.jpg',
                    filename: 'Yelpcamp/j7sf7h1hxeaxaatqxpsn'
                },
                {
                    url: 'https://res.cloudinary.com/dfvybojqu/image/upload/v1630023149/Yelpcamp/mhwxwhcjvgncq97ytftt.jpg',
                    filename: 'Yelpcamp/mhwxwhcjvgncq97ytftt'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})