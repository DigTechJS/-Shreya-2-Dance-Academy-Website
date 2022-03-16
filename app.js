const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser= require('body-parser');
const port =process.env.PORT|| 2000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://shreyaUser:shreyKapassBaba@cluster0.vgxlz.mongodb.net/dance_website?retryWrites=true&w=majority');
}
// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    desc2: String

  });
  const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})
app.post('/contact', (req, res)=>{
    var myData=new contact(req.body)
    myData.save().then(()=>{
        console.log("Done")
        res.status(200).render('contact.pug')
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
})
app.get('/contact', (req, res)=>{
    
    res.status(200).render('contact.pug');
})

app.get('/service', (req, res)=>{
    
    res.status(200).render('services.pug');
})
app.get('/aboutOurClasses', (req, res)=>{
    
    res.status(200).render('aboutOurClasses.pug');
})
app.get('/reachUs', (req, res)=>{
    
    res.status(200).render('reach.pug');
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
