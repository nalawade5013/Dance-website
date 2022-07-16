const express = require("express");
const path = require("path");
const bodyparser=require("body-parser")


const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true })
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    emial: String,
    adress: String,
    desc: String,
  });
  
  const contact= mongoose.model('contact', contactSchema);



app.use('/static', express.static('static'))
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {

    const parmas = {  }
    res.status(200).render('home.pug', parmas)
})

app.get('/contact', (req, res) => {

   
    res.status(200).render('contact.pug')
})
app.get('/About', (req, res) => {

   
    res.status(200).render('About.pug')
})
app.get('/services', (req, res) => {

   
    res.status(200).render('services.pug')
})
app.post('/contact', (req, res) => {
     const mydata=new contact(req.body)
     mydata.save().then(()=>{
      res.send("This items has been saved")
     }).catch(()=>{
        res.status(400).send("your data is not saved")
     })

     //res.status(200).render('contact.pug');

    
})

app.listen(port,()=>{
    console.log(`the application has started succesfully on ${port}`);
});