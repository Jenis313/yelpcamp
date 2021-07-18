const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
// Connect DB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res, next) => {
    res.render('home');
})

app.get('/makecampground', (req, res, next) => {
    const camp = new Campground({
        title: 'My Backyard',
        description: 'Cheap Camping'
    })
    camp.save()
    res.json(camp);
})
app.listen(PORT, (err, result) => {
    if(err){
        console.log("Err in listen");
    }else{
        console.log("Server Listening at port ", PORT)
    }
})